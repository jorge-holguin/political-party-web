import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { secret, path, tag } = body;

    // Validate secret token
    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json(
        { error: "Invalid secret token" },
        { status: 401 }
      );
    }

    // Revalidate by tag (using path with layout type for tag-like behavior)
    if (tag) {
      revalidatePath("/", "layout");
      return NextResponse.json({
        revalidated: true,
        type: "tag",
        tag,
        timestamp: Date.now(),
      });
    }

    // Revalidate by path if provided
    if (path) {
      revalidatePath(path, "page");
      return NextResponse.json({
        revalidated: true,
        type: "path",
        path,
        timestamp: Date.now(),
      });
    }

    // Default: revalidate all main pages
    const paths = ["/", "/inicio", "/prensa", "/comites", "/contacto", "/afiliados", "/representantes"];
    paths.forEach((p) => revalidatePath(p, "page"));

    return NextResponse.json({
      revalidated: true,
      type: "all",
      paths,
      timestamp: Date.now(),
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Error during revalidation";
    console.error("Revalidation error:", error);
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const secret = searchParams.get("secret");
  const path = searchParams.get("path");
  const tag = searchParams.get("tag");

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json(
      { error: "Invalid secret token" },
      { status: 401 }
    );
  }

  try {
    if (tag) {
      revalidatePath("/", "layout");
      return NextResponse.json({
        revalidated: true,
        type: "tag",
        tag,
        timestamp: Date.now(),
      });
    }

    if (path) {
      revalidatePath(path, "page");
      return NextResponse.json({
        revalidated: true,
        type: "path",
        path,
        timestamp: Date.now(),
      });
    }

    // Default: revalidate all
    const paths = ["/", "/inicio", "/prensa", "/comites", "/contacto"];
    paths.forEach((p) => revalidatePath(p, "page"));

    return NextResponse.json({
      revalidated: true,
      type: "all",
      paths,
      timestamp: Date.now(),
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Error during revalidation";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
