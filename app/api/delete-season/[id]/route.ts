import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    // Évad nem létezik ell.:
    const data = await prisma.season.findUnique({
      where: { id: Number(id) },
    });
    if (!data) {
      return NextResponse.json({ message: "Az évad nem létezik!" }, { status: 404 });
    }

    // Évad nem törölhető ell.:
    const episode = await prisma.episode.findFirst({
      where: { seasonId: Number(id) },
    });
    if (episode) {
      return NextResponse.json({ message: "A évad nem tötlhető!" }, { status: 403 });
    }

    // Az évad tölése:
    await prisma.season.delete({
      where: { id: Number(id) },
    });

    // NO CONTENT - 204 visszatérés:
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Ismeretlen Hiba!" },
      { status: 500 },
    );
    // if (error instanceof Error) {
    //   return NextResponse.json({ message: error.message }, { status: 500 });
    // } else return NextResponse.json({ message: "Ismeretlen hiba!" }, { status: 500 });
  }
}
