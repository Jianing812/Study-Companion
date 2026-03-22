import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { notes, mode } = body;

    if (!notes || !mode) {
      return NextResponse.json(
        { error: "Missing notes or mode." },
        { status: 400 }
      );
    }

    let prompt = "";

    if (mode === "listen") {
      prompt = `Turn the following study notes into an audio-friendly exam recap. Use clear spoken language, keep it concise, and preserve academic accuracy.\n\nNotes:\n${notes}`;
    } else if (mode === "focus") {
      prompt = `Turn the following study notes into a 5-minute focus study session with short steps, mini challenges, and one quick recall question.\n\nNotes:\n${notes}`;
    } else if (mode === "clarity") {
      prompt = `Rewrite the following study notes in simpler academic English without losing technical accuracy. Keep important terms, but explain them more clearly.\n\nNotes:\n${notes}`;
    } else {
      return NextResponse.json({ error: "Invalid mode." }, { status: 400 });
    }

    const completion = await client.responses.create({
      model: "gpt-5-mini",
      input: prompt,
    });

    const result = completion.output_text;

    return NextResponse.json({ result });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to generate study content." },
      { status: 500 }
    );
  }
}