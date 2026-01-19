import { NextResponse } from "next/server";

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const DATABASE_ID = process.env.NOTION_CONTENIDO_DATABASE_ID;

export const revalidate = 3600; // Cache por 1 hora

export async function GET() {
  if (!NOTION_TOKEN || !DATABASE_ID) {
    return NextResponse.json({ error: "Faltan credenciales en .env" }, { status: 500 });
  }

  try {
    const response = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${NOTION_TOKEN}`,
        "Notion-Version": "2022-06-28",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("❌ Error al obtener metadata de Contenido:", data);
      return NextResponse.json({ error: data.message }, { status: response.status });
    }

    // Extraer opciones de Tipo y Categoria
    const tipoProperty = data.properties["Tipo"];
    const categoriaProperty = data.properties["Categoria"];

    const tipos = tipoProperty?.select?.options || [];
    const categorias = categoriaProperty?.multi_select?.options || categoriaProperty?.select?.options || [];

    const metadata = {
      tipos: tipos.map((option: any) => ({
        id: option.id,
        name: option.name,
        color: option.color,
      })),
      categorias: categorias.map((option: any) => ({
        id: option.id,
        name: option.name,
        color: option.color,
      })),
    };

    return NextResponse.json(metadata);
  } catch (error: any) {
    console.error("❌ Error crítico en metadata Contenido:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
