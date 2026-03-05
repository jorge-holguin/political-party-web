import { NextResponse } from "next/server";

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET;

interface NotionFile {
  type: "file" | "external";
  file?: { url: string; expiry_time?: string };
  external?: { url: string };
}

interface NotionPage {
  id: string;
  properties: Record<string, unknown>;
}

async function uploadToCloudinary(imageUrl: string, publicId: string): Promise<string | null> {
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    console.error("Missing Cloudinary credentials");
    return null;
  }

  try {
    const timestamp = Math.floor(Date.now() / 1000);
    const crypto = await import("node:crypto");
    
    const signatureString = `public_id=${publicId}&timestamp=${timestamp}${CLOUDINARY_API_SECRET}`;
    const signature = crypto.createHash("sha1").update(signatureString).digest("hex");

    const formData = new FormData();
    formData.append("file", imageUrl);
    formData.append("public_id", publicId);
    formData.append("timestamp", timestamp.toString());
    formData.append("api_key", CLOUDINARY_API_KEY);
    formData.append("signature", signature);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Cloudinary upload error:", errorData);
      return null;
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    return null;
  }
}

async function updateNotionPage(pageId: string, propertyName: string, cloudinaryUrl: string): Promise<boolean> {
  if (!NOTION_TOKEN) return false;

  try {
    const response = await fetch(`https://api.notion.com/v1/pages/${pageId}`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${NOTION_TOKEN}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        properties: {
          [propertyName]: {
            files: [
              {
                type: "external",
                name: "image",
                external: { url: cloudinaryUrl },
              },
            ],
          },
        },
      }),
    });

    return response.ok;
  } catch (error) {
    console.error("Error updating Notion page:", error);
    return false;
  }
}

async function fetchNotionDatabase(databaseId: string): Promise<NotionPage[]> {
  if (!NOTION_TOKEN) return [];

  try {
    const response = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${NOTION_TOKEN}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    if (!response.ok) return [];
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Error fetching Notion database:", error);
    return [];
  }
}

function isTemporaryNotionUrl(url: string): boolean {
  return url.includes("secure.notion-static.com") || 
         url.includes("s3.us-west-2.amazonaws.com") ||
         url.includes("prod-files-secure");
}

function generatePublicId(pageId: string, propertyName: string): string {
  const cleanPageId = pageId.replace(/-/g, "").slice(0, 12);
  const cleanPropertyName = propertyName.toLowerCase().replace(/\s+/g, "_");
  return `notion/${cleanPropertyName}_${cleanPageId}_${Date.now()}`;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");

  if (secret !== REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  const databaseIds = [
    process.env.NOTION_PRENSA_DATABASE_ID,
    process.env.NOTION_CONTENIDO_DATABASE_ID,
  ].filter(Boolean) as string[];

  const imageProperties = ["Featured Image", "Gallery", "Imagen"];
  
  let migratedCount = 0;
  let errorCount = 0;
  const logs: string[] = [];

  for (const dbId of databaseIds) {
    logs.push(`Processing database: ${dbId}`);
    const pages = await fetchNotionDatabase(dbId);
    
    for (const page of pages) {
      for (const propName of imageProperties) {
        const prop = page.properties[propName] as { files?: NotionFile[] } | undefined;
        if (!prop?.files) continue;

        for (const file of prop.files) {
          const imageUrl = file.type === "file" ? file.file?.url : file.external?.url;
          
          if (!imageUrl) continue;
          
          // Only migrate temporary Notion URLs
          if (!isTemporaryNotionUrl(imageUrl)) {
            continue;
          }

          logs.push(`Migrating image from page ${page.id}: ${imageUrl.slice(0, 50)}...`);
          
          const publicId = generatePublicId(page.id, propName);
          const cloudinaryUrl = await uploadToCloudinary(imageUrl, publicId);
          
          if (cloudinaryUrl) {
            const updated = await updateNotionPage(page.id, propName, cloudinaryUrl);
            if (updated) {
              migratedCount++;
              logs.push(`✓ Migrated to: ${cloudinaryUrl}`);
            } else {
              errorCount++;
              logs.push(`✗ Failed to update Notion page`);
            }
          } else {
            errorCount++;
            logs.push(`✗ Failed to upload to Cloudinary`);
          }
        }
      }
    }
  }

  return NextResponse.json({
    success: true,
    message: `Migration complete. Migrated: ${migratedCount}, Errors: ${errorCount}`,
    migratedCount,
    errorCount,
    logs,
  });
}
