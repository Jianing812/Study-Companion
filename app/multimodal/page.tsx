"use client";

import { useState } from "react";
import Link from "next/link";

export default function MultimodalPage() {
  const [notes, setNotes] = useState(
    "Photosynthesis is the process by which plants convert light energy into chemical energy. It mainly occurs in the chloroplasts and uses carbon dioxide, water, and sunlight to produce glucose and oxygen."
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTranscript, setShowTranscript] = useState(true);

  return (
    <main className="min-h-screen bg-sky-50 px-6 py-16 text-slate-900">
      <section className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="inline-block rounded-full bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-slate-100"
        >
          ← Back to Home
        </Link>

        <div className="mt-8 max-w-4xl">
          <h1 className="text-5xl font-bold leading-tight">
            Multi-Modal Learner
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            A study experience designed for students who absorb material better
            by listening, replaying, and reviewing content in multiple formats.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold">Input Study Material</h2>
            <p className="mt-3 text-slate-600">
              Paste class notes or textbook content below.
            </p>

            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="mt-6 min-h-[260px] w-full rounded-2xl border border-slate-200 p-4 text-sm leading-7 outline-none focus:border-sky-400"
            />

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="rounded-2xl bg-slate-900 px-5 py-3 font-medium text-white transition hover:bg-slate-800"
              >
                {isPlaying ? "Pause Audio" : "Play Audio Summary"}
              </button>

              <button
                onClick={() => setShowTranscript(!showTranscript)}
                className="rounded-2xl bg-slate-100 px-5 py-3 font-medium text-slate-700 transition hover:bg-slate-200"
              >
                {showTranscript ? "Hide Transcript" : "Show Transcript"}
              </button>
            </div>
          </div>

          <div className="space-y-8">
            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-semibold">Audio Player</h2>
              <div className="mt-6 rounded-2xl bg-sky-100 p-5">
                <p className="font-medium">
                  {isPlaying ? "🔊 Now Playing" : "⏸ Audio Paused"}
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-700">
                  Photosynthesis is how plants use sunlight, water, and carbon
                  dioxide to create glucose and oxygen. Think of it as the
                  plant’s way of making food from light energy.
                </p>

                <div className="mt-5 h-3 w-full rounded-full bg-white">
                  <div
                    className={`h-3 rounded-full bg-slate-900 transition-all duration-700 ${
                      isPlaying ? "w-2/3" : "w-1/4"
                    }`}
                  />
                </div>
              </div>
            </div>

            {showTranscript && (
              <div className="rounded-3xl bg-white p-8 shadow-sm">
                <h2 className="text-2xl font-semibold">Transcript</h2>
                <p className="mt-4 leading-7 text-slate-700">
                  Photosynthesis is the process plants use to turn sunlight into
                  usable energy. The key inputs are water, carbon dioxide, and
                  sunlight. The main outputs are glucose and oxygen.
                </p>
              </div>
            )}

            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-semibold">Replay Sections</h2>
              <div className="mt-6 flex flex-col gap-3">
                <button className="rounded-2xl bg-slate-100 px-4 py-3 text-left hover:bg-slate-200">
                  Replay definition
                </button>
                <button className="rounded-2xl bg-slate-100 px-4 py-3 text-left hover:bg-slate-200">
                  Replay key inputs and outputs
                </button>
                <button className="rounded-2xl bg-slate-100 px-4 py-3 text-left hover:bg-slate-200">
                  Replay quick recap
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}