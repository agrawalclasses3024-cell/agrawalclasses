import { cookies } from "next/headers";
import { prisma } from "./prisma";

export async function getStudentSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("student_session")?.value;
  if (!token) return null;
  try {
    const [idStr, secret] = token.split(":");
    if (secret !== process.env.NEXTAUTH_SECRET) return null;
    const student = await prisma.student.findUnique({
      where: { id: parseInt(idStr) },
      select: { id: true, name: true, email: true, phone: true },
    });
    return student;
  } catch {
    return null;
  }
}
