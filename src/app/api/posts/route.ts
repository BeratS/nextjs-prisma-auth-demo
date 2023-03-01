import { NextRequest, NextResponse } from "next/server";
import prisma from "prisma/client";

export async function GET(request: NextRequest) {
  const posts = await prisma?.post?.findMany();

  return NextResponse.json(posts);
}

export async function DELETE(request: NextRequest) {
  const body = await request.json();
  console.log('this is my body', body.id);
  
  const posts = await prisma?.post?.delete({
    where: {
      id: body.id,
    }
  });

  return NextResponse.json(posts);
}
