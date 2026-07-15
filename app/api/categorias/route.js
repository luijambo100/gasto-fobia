import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "../../../lib/prisma";

function getUsuarioId(req) {
  const token = req.cookies.get("token")?.value;
  if (!token) return null;
  try {
    return jwt.verify(token, process.env.JWT_SECRET).id;
  } catch {
    return null;
  }
}

export async function GET(req) {
  const usuarioId = getUsuarioId(req);
  if (!usuarioId)
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const data = await prisma.categoria.findMany({ where: { usuarioId } });
  return NextResponse.json(data);
}

export async function POST(req) {
  const usuarioId = getUsuarioId(req);
  if (!usuarioId)
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const { nombre, icono, color } = await req.json();
  const nueva = await prisma.categoria.create({
    data: { nombre, icono, color, usuarioId },
  });
  return NextResponse.json(nueva, { status: 201 });
}
