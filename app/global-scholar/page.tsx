"use client";

import { useMemo, useState } from "react";
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

const termMappings: Record<string, string> = {
  "cognitive load theory":
    "a theory about how much information your brain can handle at one time",
  "working memory":
    "the part of your brain that temporarily holds information",
  "intrinsic load": "difficulty caused by the topic itself",
  "extraneous load":
    "difficulty caused by confusing explanations or presentation",
  "academic accuracy":
    "keeping the correct meaning while making the language easier",
};

const focusTasks = [
  "Read the simplified explanation",
  "Click one difficult term and review its meaning",
  "Answer one quick concept check question",
  "Summarize the main idea in one sentence",
];

export default function GlobalScholarPage() {
  const [originalText, setOriginalText] = useState(
    "Cognitive load theory explains how the limits of working memory affect learning. Intrinsic load comes from the difficulty of the content itself, while extraneous load comes from the way information is presented."
  );

  const [selectedLanguage, setSelectedLanguage] =
    useState<Language>("english");
  const [showSimplified, setShowSimplified] = useState(false);
  const [activeTerm, setActiveTerm] = useState<string | null>(null);

  const [supports, setSupports] = useState({
    audio: false,
    focus: false,
    language: true,
  });

  const currentSupport = supportContent[selectedLanguage];

  function toggleSupport(type: "audio" | "focus" | "language") {
    setSupports((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  }

  const interactiveSegments = useMemo(() => {
    const lower = originalText.toLowerCase();
    const matches: { start: number; end: number; term: string }[] = [];

    Object.keys(termMappings).forEach((term) => {
      const termLower = term.toLowerCase();
      let startIndex = 0;

      while (true) {
        const found = lower.indexOf(termLower, startIndex);
        if (found === -1) break;
        matches.push({
          start: found,
          end: found + termLower.length,
          term,
        });
        startIndex = found + termLower.length;
      }
    });

    matches.sort((a, b) => a.start - b.start);

    const filtered: typeof matches = [];
    let lastEnd = -1;

    for (const match of matches) {
      if (match.start >= lastEnd) {
        filtered.push(match);
        lastEnd = match.end;
      }
    }

    const segments: Array<
      | { type: "text"; content: string }
      | { type: "term"; content: string; term: string }
    > = [];

    let cursor = 0;
    for (const match of filtered) {
      if (cursor < match.start) {
        segments.push({
          type: "text",
          content: originalText.slice(cursor, match.start),
        });
      }

      segments.push({
        type: "term",
        content: originalText.slice(match.start, match.end),
        term: match.term,
      });

      cursor = match.end;
    }

    if (cursor < originalText.length) {
      segments.push({
        type: "text",
        content: originalText.slice(cursor),
      });
    }

    return segments;
  }, [originalText]);

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
          <h1 className="text-5xl font-bold leading-tight">Study Workspace</h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            A modular study space where students can combine language support,
            audio support, and focus support based on overlapping learning
            needs.
          </p>
        </div>

        <div className="mt-8 rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold">Choose Your Support Tools</h2>
          <p className="mt-3 text-slate-600">
            Turn support layers on or off depending on what you need for this
            study session.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => toggleSupport("audio")}
              className={`rounded-2xl px-5 py-3 font-medium transition ${
                supports.audio
                  ? "bg-sky-600 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              🎧 Audio Support
            </button>

            <button
              onClick={() => toggleSupport("focus")}
              className={`rounded-2xl px-5 py-3 font-medium transition ${
                supports.focus
                  ? "bg-amber-500 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              🐱 Focus Support
            </button>

            <button
              onClick={() => toggleSupport("language")}
              className={`rounded-2xl px-5 py-3 font-medium transition ${
                supports.language
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              🌍 Language Support
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8">
            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-semibold">Original Academic Content</h2>
              <p className="mt-3 text-slate-600">
                Paste difficult notes, textbook language, or lecture content
                below.
              </p>

              <textarea
                value={originalText}
                onChange={(e) => setOriginalText(e.target.value)}
                className="mt-6 min-h-[240px] w-full rounded-2xl border border-slate-200 p-4 text-sm leading-7 outline-none focus:border-emerald-400"
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

            {supports.language && (
              <>
                <div className="rounded-3xl bg-white p-8 shadow-sm">
                  <h2 className="text-2xl font-semibold">Interactive Term Mapping</h2>
                  <p className="mt-3 text-slate-600">
                    Click difficult terms in the text to see their simpler meaning.
                  </p>

                  <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 leading-8 text-slate-800">
                    {interactiveSegments.map((segment, index) =>
                      segment.type === "text" ? (
                        <span key={index}>{segment.content}</span>
                      ) : (
                        <button
                          key={index}
                          onClick={() => setActiveTerm(segment.term)}
                          className="mx-1 rounded-lg bg-emerald-100 px-2 py-1 font-medium text-emerald-900 hover:bg-emerald-200"
                        >
                          {segment.content}
                        </button>
                      )
                    )}
                  </div>

                  {activeTerm && (
                    <div className="mt-4 rounded-2xl bg-emerald-100 p-5">
                      <p className="font-semibold capitalize">{activeTerm}</p>
                      <p className="mt-2 text-sm leading-6 text-slate-700">
                        {termMappings[activeTerm]}
                      </p>
                      <button
                        onClick={() => setActiveTerm(null)}
                        className="mt-3 text-sm font-medium underline"
                      >
                        Close
                      </button>
                    </div>
                  )}
                </div>

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
              </>
            )}

            {supports.audio && (
              <div className="rounded-3xl bg-white p-8 shadow-sm">
                <h2 className="text-2xl font-semibold">Audio Support</h2>
                <p className="mt-3 text-slate-600">
                  Convert this study material into a listenable recap for replay
                  and review.
                </p>

                <div className="mt-6 rounded-2xl bg-sky-100 p-5">
                  <p className="font-medium">Audio Summary Preview</p>
                  <p className="mt-3 text-sm leading-7 text-slate-700">
                    This section gives the student a spoken-style recap of the
                    material, so they can review key ideas by listening instead of
                    only rereading.
                  </p>

                  <div className="mt-5 h-3 w-full rounded-full bg-white">
                    <div className="h-3 w-2/3 rounded-full bg-slate-900" />
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <button className="rounded-2xl bg-white px-4 py-2 text-sm font-medium hover:bg-slate-100">
                      Play
                    </button>
                    <button className="rounded-2xl bg-white px-4 py-2 text-sm font-medium hover:bg-slate-100">
                      Replay Section
                    </button>
                    <button className="rounded-2xl bg-white px-4 py-2 text-sm font-medium hover:bg-slate-100">
                      1.25x Speed
                    </button>
                  </div>
                </div>
              </div>
            )}

            {supports.focus && (
              <div className="rounded-3xl bg-white p-8 shadow-sm">
                <h2 className="text-2xl font-semibold">Focus Support</h2>
                <p className="mt-3 text-slate-600">
                  Break complex material into smaller actions and checkpoints.
                </p>

                <div className="mt-6 space-y-4">
                  {focusTasks.map((task, index) => (
                    <div
                      key={task}
                      className="rounded-2xl border border-slate-200 p-4"
                    >
                      <p className="font-medium">{task}</p>
                      <p className="mt-1 text-sm text-slate-500">
                        Step {index + 1}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-8">
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

            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-semibold">Active Supports</h2>
              <div className="mt-6 flex flex-wrap gap-3">
                {supports.audio && (
                  <span className="rounded-full bg-sky-100 px-4 py-2 text-sm font-medium text-sky-800">
                    🎧 Audio
                  </span>
                )}
                {supports.focus && (
                  <span className="rounded-full bg-amber-100 px-4 py-2 text-sm font-medium text-amber-800">
                    🐱 Focus
                  </span>
                )}
                {supports.language && (
                  <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-800">
                    🌍 Language
                  </span>
                )}
              </div>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-semibold">Workspace Summary</h2>
              <p className="mt-4 text-slate-600">
                A modular workflow that supports reading, listening, and
                understanding complex academic content.
              </p>

              <div className="mt-6 rounded-2xl bg-slate-100 p-5">
                <p className="font-medium">Current setup</p>
                <p className="mt-2 text-sm leading-6 text-slate-700">
                  This workspace can combine multilingual explanation, difficult
                  term simplification, audio recap, and focus scaffolding in the
                  same study flow.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}