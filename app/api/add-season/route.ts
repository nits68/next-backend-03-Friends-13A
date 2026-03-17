import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newOne = await prisma.season.create({ data: body });
    return NextResponse.json({ id: newOne.id }, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes("is missing")) {
        return NextResponse.json({ message: "Hiányos adatok!" }, { status: 400 });
      }

      if (error.message.includes("Unique constraint failed on the constraint: `_id_`")) {
        return NextResponse.json({ message: "Egyediség megsértése az id mezőnél!" }, { status: 400 });
      }

      if (error.message.includes("Unique constraint failed on the constraint: `seasons_season_key`")) {
        return NextResponse.json({ message: "Egyediség megsértése a season mezőnél!" }, { status: 400 });
      }

      return NextResponse.json({ message: error.message }, { status: 500 });
    } else return NextResponse.json({ message: "Ismeretlen hiba!" }, { status: 500 });
  }
}
