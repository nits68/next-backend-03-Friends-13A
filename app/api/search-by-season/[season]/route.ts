import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ season: string }> },
) {
  const { season } = await params;
  const data = await prisma.season.findFirst({
    where: {
      season: season,
    },
    select: {
      episodes: {
        omit: { image_medium: true, url: true, summary: true },
      },
    },
  });
  if (!data) {
    return NextResponse.json({ message: "Hibás évad!" }, { status: 404 });
  }
  return NextResponse.json(data?.episodes);
}
