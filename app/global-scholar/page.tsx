"use client";

import { useState } from "react";
import Link from "next/link";

export default function GlobalScholarPage() {
  const [originalText, setOriginalText] = useState(
    "Cognitive load theory explains how the limits of working memory affect learning. Intrinsic load comes from the difficulty of the content itself, while extraneous load comes from the way information is presented."
  );

  const [showSimplified, setShowSimplified] = useState(false);

  return (
    <main className="min-h-screen bg-emerald-50 px-6 py-16 text-slate-900">
      <section className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="inline-block rounded-full bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-slate-100"
        >
          ← Back to Home
        </Link>

        <div className="mt-8 max-w-4xl">
          <h1 className="text-5xl font-bold leading-tight">Global Scholar</h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            A study experience designed for students who want simpler academic
            language without losing technical accuracy.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold">Original Academic Content</h2>
            <p className="mt-3 text-slate-600">
              Paste difficult notes, textbook language, or lecture content
              below.
            </p>

            <textarea
              value={originalText}
              onChange={(e) => setOriginalText(e.target.value)}
              className="mt-6 min-h-[260px] w-full rounded-2xl border border-slate-200 p-4 text-sm leading-7 outline-none focus:border-emerald-400"
            />

            <button
              onClick={() => setShowSimplified(true)}
              className="mt-6 rounded-2xl bg-slate-900 px-6 py-3 font-medium text-white transition hover:bg-slate-800"
            >
              Simplify Content
            </button>
          </div>

          <div className="space-y-8">
            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-semibold">Simplified Explanation</h2>
              <p className="mt-3 text-slate-600">
                Clearer academic language while keeping the key meaning.
              </p>

              <div className="mt-6 rounded-2xl bg-emerald-100 p-5">
                {showSimplified ? (
                  <p className="leading-7 text-slate-800">
                    Cognitive load theory means that your brain can only handle
                    a limited amount of information at one time. Some material
                    is difficult because the topic itself is hard. This is
                    called <span className="font-semibold">intrinsic load</span>.
                    Other times, the topic feels harder because it is presented
                    in a confusing way. This is called{" "}
                    <span className="font-semibold">extraneous load</span>.
                  </p>
                ) : (
                  <p className="leading-7 text-slate-500">
                    Your simplified explanation will appear here.
                  </p>
                )}
              </div>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-semibold">Key Glossary</h2>
              <div className="mt-6 space-y-4">
                <div className="rounded-2xl border border-slate-200 p-4">
                  <p className="font-semibold">Intrinsic Load</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    The mental effort caused by the actual difficulty of the
                    topic itself.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 p-4">
                  <p className="font-semibold">Extraneous Load</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Extra mental effort caused by poor explanations or confusing
                    presentation.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-semibold">Quick Concept Check</h2>
              <p className="mt-4 text-slate-600">
                Which one is caused by confusing presentation?
              </p>

              <div className="mt-4 flex flex-col gap-3">
                <button className="rounded-2xl bg-slate-100 px-4 py-3 text-left hover:bg-slate-200">
                  Intrinsic Load
                </button>
                <button className="rounded-2xl bg-slate-100 px-4 py-3 text-left hover:bg-slate-200">
                  Extraneous Load
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}