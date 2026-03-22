"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const defaultTasks = [
  "Read the short concept summary",
  "Answer one quick recall question",
  "Complete the mini challenge",
  "Review the key takeaway",
];

const catMessages = [
  "🐱 Stay with me — just one more small step.",
  "🐱 Nice progress. Ready for the next checkpoint?",
  "🐱 You’re doing great. Let’s finish this task.",
  "🐱 Small steps still count. Keep going.",
];

export default function FocusPage() {
  const [notes, setNotes] = useState(
    "Cognitive load theory explains how the limits of working memory affect learning. Intrinsic load comes from the difficulty of the content itself, while extraneous load comes from the way information is presented."
  );

  const [sessionStarted, setSessionStarted] = useState(false);
  const [completedTasks, setCompletedTasks] = useState<boolean[]>(
    new Array(defaultTasks.length).fill(false)
  );
  const [showCat, setShowCat] = useState(false);
  const [catMessage, setCatMessage] = useState(catMessages[0]);
  const [feedbackMessage, setFeedbackMessage] = useState(
    "Start a session to begin your focus workflow."
  );

  const completedCount = completedTasks.filter(Boolean).length;
  const progress = (completedCount / defaultTasks.length) * 100;

  const sessionStatus = useMemo(() => {
    if (!sessionStarted) return "Not started";
    if (completedCount === defaultTasks.length) return "Session complete";
    return "In progress";
  }, [sessionStarted, completedCount]);

  function startSession() {
    setSessionStarted(true);
    setCompletedTasks(new Array(defaultTasks.length).fill(false));
    setFeedbackMessage("Session started. Focus on one small task at a time.");
    setCatMessage("🐱 Session started! Let’s do one small step.");
    setShowCat(true);

    setTimeout(() => {
      setShowCat(false);
    }, 4000);
  }

  function toggleTask(index: number) {
    if (!sessionStarted) return;

    const updated = [...completedTasks];
    updated[index] = !updated[index];
    setCompletedTasks(updated);

    const newCompletedCount = updated.filter(Boolean).length;

    if (updated[index]) {
      setFeedbackMessage(
        `Nice work — ${newCompletedCount} of ${defaultTasks.length} tasks completed.`
      );
    } else {
      setFeedbackMessage(
        `Task unchecked — ${newCompletedCount} of ${defaultTasks.length} tasks completed.`
      );
    }
  }

  useEffect(() => {
    if (!sessionStarted) return;

    const interval = setInterval(() => {
      const randomMessage =
        catMessages[Math.floor(Math.random() * catMessages.length)];
      setCatMessage(randomMessage);
      setShowCat(true);

      setTimeout(() => {
        setShowCat(false);
      }, 4000);
    }, 5000);

    return () => clearInterval(interval);
  }, [sessionStarted]);

  return (
    <main className="min-h-screen bg-amber-50 text-slate-900">
      <section className="mx-auto max-w-6xl px-6 py-16">
        <Link
          href="/"
          className="inline-block rounded-full bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-slate-100"
        >
          ← Back to Home
        </Link>

        <div className="mt-8 max-w-4xl">
          <h1 className="text-5xl font-bold leading-tight">Focus Mode</h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            A study experience designed for students who need short tasks,
            visible progress, and gentle attention prompts to stay engaged.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8">
            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-semibold">Input Study Material</h2>
              <p className="mt-3 text-slate-600">
                Paste notes or a chapter excerpt below, then start your session.
              </p>

              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="mt-6 min-h-[220px] w-full rounded-2xl border border-slate-200 p-4 text-sm leading-7 outline-none focus:border-amber-400"
              />

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={startSession}
                  className="rounded-2xl bg-slate-900 px-6 py-3 font-medium text-white transition hover:bg-slate-800"
                >
                  Start Session
                </button>

                <div className="rounded-2xl bg-amber-100 px-5 py-3 text-sm font-medium text-slate-700">
                  Status: {sessionStatus}
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-semibold">Today’s Study Session</h2>
              <p className="mt-3 text-slate-600">
                Complete one task at a time. The goal is progress, not perfection.
              </p>

              <div className="mt-8">
                <div className="mb-2 flex items-center justify-between text-sm font-medium">
                  <span>Progress</span>
                  <span>
                    {completedCount} / {defaultTasks.length} completed
                  </span>
                </div>

                <div className="h-4 w-full rounded-full bg-slate-200">
                  <div
                    className="h-4 rounded-full bg-slate-900 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <div className="mt-8 space-y-4">
                {defaultTasks.map((task, index) => (
                  <div
                    key={task}
                    className="flex items-center justify-between rounded-2xl border border-slate-200 p-4"
                  >
                    <div>
                      <p className="font-medium">{task}</p>
                      <p className="mt-1 text-sm text-slate-500">
                        Step {index + 1}
                      </p>
                    </div>

                    <button
                      onClick={() => toggleTask(index)}
                      className={`rounded-2xl px-4 py-2 text-sm font-medium transition ${
                        completedTasks[index]
                          ? "bg-green-100 text-green-800"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      } ${!sessionStarted ? "cursor-not-allowed opacity-60" : ""}`}
                    >
                      {completedTasks[index] ? "Completed" : "Mark Complete"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-semibold">Mini Challenge</h2>
              <p className="mt-4 leading-7 text-slate-600">
                Read a short concept summary, then explain it in your own words
                in one sentence. This reduces passive rereading and supports
                active recall.
              </p>

              <div className="mt-6 rounded-2xl bg-amber-100 p-5">
                <p className="font-medium">2-minute mission</p>
                <p className="mt-2 text-sm leading-6 text-slate-700">
                  Based on your material, define the main idea in one sentence,
                  then identify one part that still feels confusing.
                </p>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-semibold">Session Feedback</h2>
              <div className="mt-6 rounded-2xl border border-slate-200 p-5">
                <p className="leading-7 text-slate-700">{feedbackMessage}</p>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-semibold">Session Streak</h2>
              <p className="mt-4 text-slate-600">
                Keep small wins visible to make studying feel manageable.
              </p>

              <div className="mt-6 flex gap-3">
                <div className="rounded-2xl bg-slate-900 px-5 py-4 text-white">
                  Day 1
                </div>
                <div className="rounded-2xl bg-slate-200 px-5 py-4 text-slate-700">
                  Day 2
                </div>
                <div className="rounded-2xl bg-slate-200 px-5 py-4 text-slate-700">
                  Day 3
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-semibold">Session Summary</h2>
              <p className="mt-4 text-slate-600">
                A focus-friendly workflow that breaks studying into manageable
                checkpoints.
              </p>

              <div className="mt-6 rounded-2xl bg-slate-100 p-5">
                <p className="font-medium">Current session</p>
                <p className="mt-2 text-sm leading-6 text-slate-700">
                  {completedCount === defaultTasks.length && sessionStarted
                    ? "You completed the full focus session. Great job."
                    : sessionStarted
                    ? `You have completed ${completedCount} of ${defaultTasks.length} tasks so far.`
                    : "Start a session to begin tracking progress."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {showCat && (
          <div className="fixed bottom-6 right-6 max-w-sm rounded-3xl bg-white p-5 shadow-xl">
            <p className="text-lg font-semibold">Attention Buddy</p>
            <p className="mt-2 text-slate-600">{catMessage}</p>
          </div>
        )}
      </section>
    </main>
  );
}