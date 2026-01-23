import { NextResponse } from "next/server";

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const DATABASE_ID = process.env.NOTION_PRENSA_DATABASE_ID;

export async function GET() {
  console.log("--- 🚀 Conexión vía REST API (Fetch) ---");

  if (!NOTION_TOKEN || !DATABASE_ID) {
    return NextResponse.json({ error: "Faltan credenciales en .env" }, { status: 500 });
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
        sorts: [{ property: "Date", direction: "descending" }],
      }),
      next: { revalidate: 60 } // Cache de Next.js
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("❌ Error de Notion:", data);
      return NextResponse.json({ error: data.message }, { status: response.status });
    }

    const noticias = data.results.map((page: any) => {
      const props = page.properties;
      const imgObj = props["Featured Image"]?.files?.[0];
      
      // Función interna para texto
      const getText = (prop: any) => prop?.rich_text?.map((t: any) => t.plain_text).join("") || 
                                    prop?.title?.map((t: any) => t.plain_text).join("") || "";

      // Extraer categorías de multi_select
      const categorias = props["Categoria"]?.multi_select?.map((cat: any) => cat.name) || [];

      return {
        id: page.id,
        titulo: getText(props["Título"]),
        resumen: getText(props["Excerpt"]),
        contenido: getText(props["Content"]),
        imagen: imgObj?.type === "external" ? imgObj.external.url : (imgObj?.file?.url || "/images/placeholder.png"),
        fecha: props["Date"]?.date?.start || "",
        slug: getText(props["Slug"]),
        autor: getText(props["Autor"]),
        categorias: categorias,
        categoria: categorias[0] || "General", // Para compatibilidad con el frontend actual
      };
    });

    console.log(`✅ Éxito: ${noticias.length} noticias obtenidas.`);
    return NextResponse.json(noticias);

  } catch (error: any) {
    console.error("❌ Error Crítico:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}   