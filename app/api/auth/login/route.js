import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../../../../lib/prisma";

export async function POST(req) {
  const { email, password } = await req.json();

  const usuario = await prisma.usuario.findUnique({ where: { email } });
  if (!usuario)
    return NextResponse.json(
      { error: "Credenciales inválidas" },
      { status: 401 },
    );

  const valido = await bcrypt.compare(password, usuario.password);
  if (!valido)
    return NextResponse.json(
      { error: "Credenciales inválidas" },
      { status: 401 },
    );

  const token = jwt.sign(
    { id: usuario.id, email: usuario.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );

  const res = NextResponse.json({
    id: usuario.id,
    nombre: usuario.nombre,
    email: usuario.email,
  });

  res.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 días
    path: "/",
  });

  return res;
}
