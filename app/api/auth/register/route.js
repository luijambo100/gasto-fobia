import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "../../../../lib/prisma";

export async function POST(req) {
  const { nombre, email, password } = await req.json();

  if (!nombre || !email || !password)
    return NextResponse.json({ error: "Faltan campos" }, { status: 400 });

  const existe = await prisma.usuario.findUnique({ where: { email } });
  if (existe)
    return NextResponse.json({ error: "Email ya registrado" }, { status: 409 });

  const hash = await bcrypt.hash(password, 10);

  const usuario = await prisma.usuario.create({
    data: { nombre, email, password: hash },
  });

  return NextResponse.json(
    { id: usuario.id, nombre: usuario.nombre, email: usuario.email },
    { status: 201 },
  );
}
