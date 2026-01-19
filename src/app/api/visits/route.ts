import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";

const VISITS_FILE = path.join(process.cwd(), "visits.json");

interface VisitsData {
  total: number;
  unique: number;
  visitors: string[];
}

function getVisitsData(): VisitsData {
  try {
    if (fs.existsSync(VISITS_FILE)) {
      const data = fs.readFileSync(VISITS_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Error reading visits file:", error);
  }
  return { total: 0, unique: 0, visitors: [] };
}

function saveVisitsData(data: VisitsData): void {
  try {
    fs.writeFileSync(VISITS_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error saving visits file:", error);
  }
}

function generateVisitorId(): string {
  return `visitor_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
}

export async function GET() {
  const data = getVisitsData();
  return NextResponse.json({ 
    total: data.total, 
    unique: data.unique 
  });
}

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    let visitorId = cookieStore.get("visitor_id")?.value;
    
    const data = getVisitsData();
    data.total += 1;
    
    const isNewVisitor = !visitorId || !data.visitors.includes(visitorId);
    
    if (isNewVisitor) {
      visitorId = generateVisitorId();
      data.unique += 1;
      data.visitors.push(visitorId);
      
      // Limitar el array de visitantes para no crecer indefinidamente
      if (data.visitors.length > 100000) {
        data.visitors = data.visitors.slice(-50000);
      }
    }
    
    saveVisitsData(data);
    
    const response = NextResponse.json({ 
      total: data.total, 
      unique: data.unique,
      isNewVisitor 
    });
    
    if (isNewVisitor && visitorId) {
      response.cookies.set("visitor_id", visitorId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 365, // 1 año
      });
    }
    
    return response;
  } catch (error) {
    console.error("Error tracking visit:", error);
    return NextResponse.json(
      { error: "Error tracking visit" },
      { status: 500 }
    );
  }
}
