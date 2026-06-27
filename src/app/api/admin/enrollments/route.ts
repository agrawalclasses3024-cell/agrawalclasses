import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function checkAuth() {
  const cookieStore = await cookies();
  return cookieStore.get("admin_session")?.value === process.env.NEXTAUTH_SECRET;
}

export async function GET() {
  if (!(await checkAuth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const enrollments = await prisma.enrollment.findMany({
    orderBy: { createdAt: "desc" },
    include: { student: { select: { id: true, name: true, email: true, phone: true } } },
  });

  return NextResponse.json(enrollments);
}
