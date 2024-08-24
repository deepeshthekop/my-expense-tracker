import { RegistrationSchema } from "@/app/validations";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

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

  const newUser = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      password: body.password,
    },
  });

  return NextResponse.json(newUser, { status: 201 });
}
