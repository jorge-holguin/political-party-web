import { NextResponse } from "next/server";

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const DATABASE_ID = process.env.NOTION_REPRESENTANTES_DATABASE_ID;

export interface Directivo {
  id: string;
  nombreCompleto: string;
  cargo: string;
  afiliado: boolean;
  inicioCargo: string | null;
  numeroRegistro: number | null;
}

export async function GET() {
  console.log("--- 🚀 Conexión Representantes vía REST API ---");

  if (!NOTION_TOKEN || !DATABASE_ID) {
    console.error("❌ Error: Faltan credenciales de Representantes en .env");
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
        sorts: [
          { property: "N° Registro", direction: "ascending" },
        ],
      }),
      next: { revalidate: 300 }
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("❌ Error de Notion:", data);
      return NextResponse.json({ error: data.message }, { status: response.status });
    }

    const directivos: Directivo[] = data.results.map((page: any) => {
      const props = page.properties;

      const nombreCompleto =
        props["Nombre Completo"]?.title?.[0]?.plain_text || "";
      const cargo =
        props["Cargo"]?.select?.name ||
        props["Cargo"]?.multi_select?.[0]?.name ||
        "";
      const afiliado = props["Afiliado"]?.checkbox || false;
      const inicioCargo = props["Inicio de Cargo"]?.date?.start || null;
      const numeroRegistro = props["N° Registro"]?.number || null;

      return {
        id: page.id,
        nombreCompleto,
        cargo,
        afiliado,
        inicioCargo,
        numeroRegistro,
      };
    });

    console.log(`✅ Éxito: ${directivos.length} directivos obtenidos.`);
    return NextResponse.json(directivos);

  } catch (error: any) {
    console.error("❌ Error Crítico:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
