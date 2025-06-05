// app/api/auth/login/route.ts

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json(
      { error: "Usuário não encontrado" },
      { status: 401 }
    );
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return NextResponse.json({ error: "Senha incorreta" }, { status: 401 });
  }

  // Aqui você pode gerar token ou criar sessão
  return NextResponse.json({
    user: { id: user.id, email: user.email, name: user.name },
  });
}
