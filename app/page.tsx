"use client";

import { useState } from "react";

const outputs = {
  listen: {
    title: "Listen Mode Output",
    content:
      "Audio-friendly summary: Cognitive load theory explains that working memory has limits. For exam review, remember that intrinsic load comes from the difficulty of the material itself, while extraneous load comes from how the material is presented. To study efficiently, reduce distractions and focus on the key ideas first.",
  },
  focus: {
    title: "Focus Mode Output",
    content:
      "5-minute challenge: Step 1 — Define cognitive load in one sentence. Step 2 — Identify the difference between intrinsic and extraneous load. Step 3 — Complete one quick recall question: Why does simplifying presentation help learning? Reward: checkpoint complete.",
  },
  clarity: {
    title: "Clarity Mode Output",
    content:
      "Simplified explanation: Cognitive load means how much mental effort your brain is using. Some topics are naturally difficult, so they need more effort. Other times, the topic feels harder because it is explained in a confusing way. Good studying reduces unnecessary confusion so you can focus on the actual concept.",
  },
};

export default function Home() {
  const [selectedMode, setSelectedMode] =
    useState<keyof typeof outputs>("listen");
  const [notes, setNotes] = useState(
    "Cognitive load theory explains how the limits of working memory affect learning. Intrinsic load comes from the difficulty of the content itself, while extraneous load comes from the way information is presented."
  );

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="max-w-3xl">
          <p className="mb-4 inline-block rounded-full bg-slate-200 px-4 py-1 text-sm font-medium">
            Build With AI Case Competition
          </p>

          <h1 className="text-5xl font-bold leading-tight md:text-6xl">
            Study Companion
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            An adaptive AI study tool that transforms notes, audio, and images
            into personalized exam preparation formats based on different
            learning needs.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold">Input Study Material</h2>
            <p className="mt-3 text-slate-600">
              Paste class notes, textbook content, or lecture summaries below.
            </p>

            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="mt-6 min-h-[220px] w-full rounded-2xl border border-slate-200 p-4 text-sm outline-none focus:border-slate-400"
            />

            <div className="mt-6">
              <h3 className="text-lg font-semibold">Choose a study mode</h3>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={() => setSelectedMode("listen")}
                  className={`rounded-2xl px-5 py-3 font-medium transition ${
                    selectedMode === "listen"
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  Listen Mode
                </button>

                <button
                  onClick={() => setSelectedMode("focus")}
                  className={`rounded-2xl px-5 py-3 font-medium transition ${
                    selectedMode === "focus"
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  Focus Mode
                </button>

                <button
                  onClick={() => setSelectedMode("clarity")}
                  className={`rounded-2xl px-5 py-3 font-medium transition ${
                    selectedMode === "clarity"
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  Clarity Mode
                </button>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold">Generated Output</h2>
            <p className="mt-3 text-slate-600">
              The same study material can be transformed into different learning
              formats.
            </p>

            <div className="mt-6 rounded-2xl bg-slate-100 p-5">
              <h3 className="text-lg font-semibold">
                {outputs[selectedMode].title}
              </h3>
              <p className="mt-3 leading-7 text-slate-700">
                {outputs[selectedMode].content}
              </p>
            </div>

            <div className="mt-6 rounded-2xl border border-slate-200 p-5">
              <h3 className="font-semibold">Why this matters</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Instead of forcing every student to study the same way, Study
                Companion adapts the format itself based on different learning
                needs.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold">How it works</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-slate-100 p-5">
              <h3 className="font-semibold">1. Upload</h3>
              <p className="mt-2 text-sm text-slate-600">
                Add notes, lecture audio, slides, or screenshots.
              </p>
            </div>
            <div className="rounded-2xl bg-slate-100 p-5">
              <h3 className="font-semibold">2. Adapt</h3>
              <p className="mt-2 text-sm text-slate-600">
                Choose a study mode based on your learning needs.
              </p>
            </div>
            <div className="rounded-2xl bg-slate-100 p-5">
              <h3 className="font-semibold">3. Study</h3>
              <p className="mt-2 text-sm text-slate-600">
                Receive a personalized, exam-focused learning output.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}