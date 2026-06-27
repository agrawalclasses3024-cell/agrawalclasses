import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function checkAuth() {
  const cookieStore = await cookies();
  return cookieStore.get("admin_session")?.value === process.env.NEXTAUTH_SECRET;
}

export async function GET() {
  if (!(await checkAuth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const applications = await prisma.application.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      student: { select: { name: true, email: true, phone: true } },
      enrollment: true,
    },
  });

  return NextResponse.json(applications);
}

export async function PATCH(req: NextRequest) {
  if (!(await checkAuth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id, status, adminNote } = await req.json();
  const updated = await prisma.application.update({
    where: { id },
    data: { status, adminNote: adminNote || null },
  });
  return NextResponse.json(updated);
}
