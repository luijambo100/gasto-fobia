import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "../../../../lib/prisma";

export async function GET(req) {
  const token = req.cookies.get("token")?.value;
  if (!token)
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const usuario = await prisma.usuario.findUnique({
      where: { id: payload.id },
      select: { id: true, nombre: true, email: true },
    });
    return NextResponse.json(usuario);
  } catch {
    return NextResponse.json({ error: "Token inválido" }, { status: 401 });
  }
}
