import { NextRequest, NextResponse } from "next/server";

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const DATABASE_ID = process.env.NOTION_COMITES_DATABASE_ID;

export interface Comite {
  id: string;
  provincia: string;
  region: string;
  capital: string;
  direccion: string | null;
}

export async function GET(request: NextRequest) {
  console.log("--- 🚀 Conexión Comités vía REST API ---");

  if (!NOTION_TOKEN || !DATABASE_ID) {
    console.error("❌ Error: Faltan credenciales de Comités en .env");
    return NextResponse.json({ error: "Faltan credenciales" }, { status: 500 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const regionFilter = searchParams.get("region");

    const queryBody: any = {
      page_size: 100,
      sorts: [
        { property: "Región", direction: "ascending" },
        { property: "Provincia", direction: "ascending" },
      ],
    };

    if (regionFilter) {
      queryBody.filter = {
        property: "Región",
        select: { equals: regionFilter },
      };
    }

    let allResults: any[] = [];
    let cursor: string | null = null;

    do {
      if (cursor) {
        queryBody.start_cursor = cursor;
      }

      const response = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}/query`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${NOTION_TOKEN}`,
          "Notion-Version": "2022-06-28",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(queryBody),
        next: { revalidate: 300 }
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("❌ Error de Notion:", data);
        return NextResponse.json({ error: data.message }, { status: response.status });
      }

      allResults = allResults.concat(data.results);
      cursor = data.has_more ? data.next_cursor : null;

    } while (cursor);

    const comites: Comite[] = allResults.map((page: any) => {
      const props = page.properties;

      const provincia = props["Provincia"]?.title?.[0]?.plain_text || "";
      const region = props["Región"]?.select?.name || "";
      const capital = props["Capital"]?.rich_text?.[0]?.plain_text || "";
      const direccion = props["Dirección"]?.rich_text?.[0]?.plain_text || null;

      return {
        id: page.id,
        provincia,
        region,
        capital,
        direccion,
      };
    });

    console.log(`✅ Éxito: ${comites.length} comités obtenidos.`);
    return NextResponse.json(comites);

  } catch (error: any) {
    console.error("❌ Error Crítico:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
