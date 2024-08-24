import { RegistrationSchema } from "@/app/validations";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcrypt";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validate = RegistrationSchema.safeParse(body);
  if (!validate.success)
    return NextResponse.json(validate.error.flatten(), { status: 400 });

  const exists = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (exists)
    return NextResponse.json({ error: "User already exists" }, { status: 409 });

  const hashedPassword = await hash(body.password, 10);

  const newUser = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      password: hashedPassword,
      image: `https://api.dicebear.com/9.x/dylan/svg?seed=${body.name}`,
    },
  });

  return NextResponse.json(newUser, { status: 201 });
}
