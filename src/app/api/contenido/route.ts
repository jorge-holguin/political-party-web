import { NextResponse } from "next/server";

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const DATABASE_ID = process.env.NOTION_CONTENIDO_DATABASE_ID;

export const revalidate = 60;

// --- Funciones de Utilidad ---
function getTextContent(property: any): string {
  if (!property) return "";
  if (property.type === "title") return property.title?.map((t: any) => t.plain_text).join("") || "";
  if (property.type === "rich_text") return property.rich_text?.map((t: any) => t.plain_text).join("") || "";
  return "";
}

function getYouTubeVideoId(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

function optimizeCloudinaryUrl(url: string): string {
  if (url && url.includes("cloudinary.com")) {
    return url.replace("/upload/", "/upload/f_auto,q_auto,w_800/");
  }
  return url;
}

export async function GET() {
  console.log("--- 🚀 Conexión Contenido vía REST API ---");

  if (!NOTION_TOKEN || !DATABASE_ID) {
    console.error("❌ Error: Faltan credenciales de Contenido en .env");
    return NextResponse.json({ error: "Faltan credenciales" }, { status: 500 });
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
          property: "Publicado",
          checkbox: { equals: true },
        },
        sorts: [{ property: "Date", direction: "descending" }], // Verifica si es 'Date' o 'Fecha'
      }),
      next: { revalidate: 60 }
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("❌ Error de Notion en Contenido:", data);
      return NextResponse.json({ error: data.message }, { status: response.status });
    }

    const contenido = data.results.map((page: any) => {
      const props = page.properties;
      const tipo = props["Tipo"]?.select?.name || "Foto";
      const urlMedia = props["URL"]?.url || "";
      
      let processedUrl = urlMedia;
      let thumbnailUrl = "";
      
      if (tipo === "Video") {
        const videoId = getYouTubeVideoId(urlMedia);
        if (videoId) {
          thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
          processedUrl = `https://www.youtube.com/embed/${videoId}`;
        }
      } else {
        processedUrl = optimizeCloudinaryUrl(urlMedia);
      }
      
      // Extraer categorías de multi_select
      const categorias = props["Categoria"]?.multi_select?.map((cat: any) => cat.name) || [];
      
      return {
        id: page.id,
        titulo: getTextContent(props["Título"]),
        leyenda: getTextContent(props["Leyenda"]),
        tipo: tipo,
        urlMedia: processedUrl,
        thumbnailUrl: thumbnailUrl,
        categorias: categorias,
        categoria: categorias[0] || "General", // Para compatibilidad con el frontend actual
        fecha: props["Date"]?.date?.start || new Date().toISOString(),
      };
    });

    console.log(`✅ Éxito: ${contenido.length} elementos de contenido obtenidos.`);
    return NextResponse.json(contenido);

  } catch (error: any) {
    console.error("❌ Error Crítico en Contenido:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}