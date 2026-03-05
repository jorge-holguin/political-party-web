import { NextResponse } from "next/server";

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const DATABASE_ID = process.env.NOTION_PRENSA_DATABASE_ID;

interface MultimediaItem {
  id: string;
  titulo: string;
  descripcion: string;
  tipo: "foto" | "video";
  url: string;
  thumbnail: string;
  fecha: string;
  categoria: string;
}

function getVideoType(url: string): "youtube" | "tiktok" | "facebook" | "other" {
  if (url.includes("youtube.com") || url.includes("youtu.be")) return "youtube";
  if (url.includes("tiktok.com")) return "tiktok";
  if (url.includes("facebook.com") || url.includes("fb.watch")) return "facebook";
  return "other";
}

function getYouTubeThumbnail(url: string): string {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = regExp.exec(url);
  if (match && match[2].length === 11) {
    return `https://img.youtube.com/vi/${match[2]}/hqdefault.jpg`;
  }
  return "";
}

export async function GET() {
  if (!NOTION_TOKEN || !DATABASE_ID) {
    return NextResponse.json({ error: "Missing credentials" }, { status: 500 });
  }

  try {
    const response = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}/query`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${NOTION_TOKEN}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filter: {
          and: [
            {
              property: "Publicado",
              checkbox: { equals: true },
            },
            {
              or: [
                {
                  property: "Categoria",
                  multi_select: { contains: "Multimedia" },
                },
                {
                  property: "Categoria",
                  multi_select: { contains: "Fotos" },
                },
                {
                  property: "Categoria",
                  multi_select: { contains: "Videos" },
                },
              ],
            },
          ],
        },
        sorts: [{ property: "Date", direction: "descending" }],
      }),
      next: { revalidate: 60 },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Notion API error:", data);
      return NextResponse.json({ error: data.message }, { status: response.status });
    }

    const multimedia: MultimediaItem[] = [];

    for (const page of data.results) {
      const props = page.properties;
      
      const getText = (prop: any) => 
        prop?.rich_text?.map((t: any) => t.plain_text).join("") || 
        prop?.title?.map((t: any) => t.plain_text).join("") || "";

      const categorias = props["Categoria"]?.multi_select?.map((cat: any) => cat.name) || [];
      const titulo = getText(props["Título"]);
      const descripcion = getText(props["Excerpt"]) || getText(props["Content"]);
      const fecha = props["Date"]?.date?.start || "";

      // Check for video URL
      const videoUrl = getText(props["Video URL"]) || getText(props["VideoURL"]) || "";
      
      if (videoUrl) {
        const videoType = getVideoType(videoUrl);
        let thumbnail = "";
        
        if (videoType === "youtube") {
          thumbnail = getYouTubeThumbnail(videoUrl);
        }
        
        // Try to get thumbnail from Featured Image
        const imgObj = props["Featured Image"]?.files?.[0];
        if (imgObj && !thumbnail) {
          thumbnail = imgObj?.type === "external" 
            ? imgObj.external.url 
            : (imgObj?.file?.url || "");
        }

        multimedia.push({
          id: page.id,
          titulo,
          descripcion,
          tipo: "video",
          url: videoUrl,
          thumbnail: thumbnail || "/images/contenido-no-disponible.jpg",
          fecha,
          categoria: categorias[0] || "Video",
        });
      }

      // Check for images
      const imgObj = props["Featured Image"]?.files?.[0];
      if (imgObj && !videoUrl) {
        const imageUrl = imgObj?.type === "external" 
          ? imgObj.external.url 
          : (imgObj?.file?.url || "");

        if (imageUrl) {
          multimedia.push({
            id: page.id,
            titulo,
            descripcion,
            tipo: "foto",
            url: imageUrl,
            thumbnail: imageUrl,
            fecha,
            categoria: categorias[0] || "Foto",
          });
        }
      }

      // Check for gallery images (if there's a Gallery property)
      const galleryImages = props["Gallery"]?.files || [];
      galleryImages.forEach((img: any, index: number) => {
        const imageUrl = img?.type === "external" 
          ? img.external.url 
          : (img?.file?.url || "");
        
        if (imageUrl) {
          multimedia.push({
            id: `${page.id}-gallery-${index}`,
            titulo: `${titulo} (${index + 1})`,
            descripcion,
            tipo: "foto",
            url: imageUrl,
            thumbnail: imageUrl,
            fecha,
            categoria: categorias[0] || "Foto",
          });
        }
      });
    }

    return NextResponse.json(multimedia);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Multimedia API error:", errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
