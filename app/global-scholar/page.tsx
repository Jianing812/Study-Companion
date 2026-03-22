"use client";

import { useState } from "react";
import Link from "next/link";

type Language = "english" | "chinese" | "spanish" | "korean" | "french";

const supportContent = {
  english: {
    label: "English",
    title: "English Support Note",
    text: "This concept means that learning becomes harder when either the topic itself is difficult or the explanation is unclear. Good study support reduces unnecessary confusion so you can focus on the real concept.",
    glossary: {
      intrinsic: "Intrinsic Load",
      extraneous: "Extraneous Load",
      workingMemory: "Working Memory",
    },
  },
  chinese: {
    label: "中文",
    title: "中文辅助解释",
    text: "这个概念的意思是：学习之所以会变难，有两种可能。第一种是内容本身就很难，这叫做 intrinsic load。第二种是内容本来没有那么难，但表达方式很复杂、很混乱，这叫做 extraneous load。好的学习材料应该减少这种不必要的理解负担。",
    glossary: {
      intrinsic: "Intrinsic Load — 内在负荷",
      extraneous: "Extraneous Load — 外在负荷",
      workingMemory: "Working Memory — 工作记忆",
    },
  },
  spanish: {
    label: "Español",
    title: "Explicación de apoyo en español",
    text: "Este concepto significa que aprender se vuelve más difícil cuando el tema en sí es complejo o cuando la explicación es confusa. Un buen apoyo de estudio reduce la confusión innecesaria para que puedas enfocarte en la idea principal.",
    glossary: {
      intrinsic: "Intrinsic Load — Carga intrínseca",
      extraneous: "Extraneous Load — Carga extrínseca",
      workingMemory: "Working Memory — Memoria de trabajo",
    },
  },
  korean: {
    label: "한국어",
    title: "한국어 보조 설명",
    text: "이 개념은 학습이 어려워지는 이유가 두 가지일 수 있다는 뜻입니다. 하나는 내용 자체가 어려운 경우이고, 다른 하나는 설명 방식이 혼란스러운 경우입니다. 좋은 학습 지원은 불필요한 혼란을 줄여 핵심 개념에 집중할 수 있게 합니다.",
    glossary: {
      intrinsic: "Intrinsic Load — 내재적 부하",
      extraneous: "Extraneous Load — 외재적 부하",
      workingMemory: "Working Memory — 작업 기억",
    },
  },
  french: {
    label: "Français",
    title: "Explication d’appui en français",
    text: "Ce concept signifie que l’apprentissage devient plus difficile soit parce que le sujet lui-même est complexe, soit parce que l’explication est confuse. Un bon soutien d’étude réduit la confusion inutile pour vous aider à vous concentrer sur l’idée principale.",
    glossary: {
      intrinsic: "Intrinsic Load — Charge intrinsèque",
      extraneous: "Extraneous Load — Charge extrinsèque",
      workingMemory: "Working Memory — Mémoire de travail",
    },
  },
};

export default function GlobalScholarPage() {
  const [originalText, setOriginalText] = useState(
    "Cognitive load theory explains how the limits of working memory affect learning. Intrinsic load comes from the difficulty of the content itself, while extraneous load comes from the way information is presented."
  );

  const [selectedLanguage, setSelectedLanguage] =
    useState<Language>("english");
  const [showSimplified, setShowSimplified] = useState(false);

  const currentSupport = supportContent[selectedLanguage];

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
            language and multilingual support without losing technical accuracy.
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

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => setShowSimplified(true)}
                className="rounded-2xl bg-slate-900 px-6 py-3 font-medium text-white transition hover:bg-slate-800"
              >
                Simplify Content
              </button>

              <select
                value={selectedLanguage}
                onChange={(e) =>
                  setSelectedLanguage(e.target.value as Language)
                }
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium outline-none focus:border-emerald-400"
              >
                <option value="english">English</option>
                <option value="chinese">中文</option>
                <option value="spanish">Español</option>
                <option value="korean">한국어</option>
                <option value="french">Français</option>
              </select>
            </div>
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
              <h2 className="text-2xl font-semibold">Language Support</h2>
              <p className="mt-3 text-slate-600">
                Additional support to make academic ideas easier to understand.
              </p>

              <div className="mt-6 rounded-2xl border border-slate-200 p-5">
                <p className="font-semibold">{currentSupport.title}</p>
                <p className="mt-3 leading-7 text-slate-700">
                  {currentSupport.text}
                </p>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-semibold">Bilingual Glossary</h2>
              <div className="mt-6 space-y-4">
                <div className="rounded-2xl border border-slate-200 p-4">
                  <p className="font-semibold">
                    {currentSupport.glossary.intrinsic}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    The mental effort caused by the actual difficulty of the
                    topic itself.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 p-4">
                  <p className="font-semibold">
                    {currentSupport.glossary.extraneous}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Extra mental effort caused by poor explanations or confusing
                    presentation.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 p-4">
                  <p className="font-semibold">
                    {currentSupport.glossary.workingMemory}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    The part of the mind that temporarily holds and processes
                    information.
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