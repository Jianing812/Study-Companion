"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const focusTasks = [
  "Read the short concept summary",
  "Answer one quick recall question",
  "Complete the mini challenge",
  "Review the key takeaway",
];

const catMessages = [
  "Stay with me — just one more small step.",
  "Nice progress. Ready for the next checkpoint?",
  "You’re doing great. Let’s finish this task.",
  "Small steps still count. Keep going.",
];

export default function FocusPage() {
  const [notes, setNotes] = useState(
    "Cognitive load theory explains how the limits of working memory affect learning. Intrinsic load comes from the difficulty of the content itself, while extraneous load comes from the way information is presented."
  );

  const [sessionStarted, setSessionStarted] = useState(false);
  const [completedTasks, setCompletedTasks] = useState<boolean[]>(
    new Array(focusTasks.length).fill(false)
  );

  const [supports, setSupports] = useState({
    audio: false,
    focus: true,
    language: false,
  });

  const [showCat, setShowCat] = useState(false);
  const [catMessage, setCatMessage] = useState(catMessages[0]);
  const [feedbackMessage, setFeedbackMessage] = useState(
    "Start a session to begin your study workflow."
  );

  const [coFocusLink, setCoFocusLink] = useState("");
  const [friendJoined, setFriendJoined] = useState(false);

  const completedCount = completedTasks.filter(Boolean).length;
  const progress = (completedCount / focusTasks.length) * 100;

  const sessionStatus = useMemo(() => {
    if (!sessionStarted) return "Not started";
    if (completedCount === focusTasks.length) return "Session complete";
    return "In progress";
  }, [sessionStarted, completedCount]);

  function toggleSupport(type: "audio" | "focus" | "language") {
    setSupports((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  }

  function playMeow() {
    try {
      const audio = new Audio(
        "https://cdn.pixabay.com/download/audio/2022/03/15/audio_115b9b6b58.mp3?filename=cat-meow-6226.mp3"
      );
      audio.volume = 0.25;
      void audio.play();
    } catch (error) {
      console.error("Audio playback failed:", error);
    }
  }

  function startSession() {
    setSessionStarted(true);
    setCompletedTasks(new Array(focusTasks.length).fill(false));
    setFeedbackMessage(
      "Session started. Combine support tools based on what you need right now."
    );
    setCatMessage("Session started! Let’s do one small step.");
    setShowCat(true);
    playMeow();

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
        `Nice work — ${newCompletedCount} of ${focusTasks.length} tasks completed.`
      );
    } else {
      setFeedbackMessage(
        `Task unchecked — ${newCompletedCount} of ${focusTasks.length} tasks completed.`
      );
    }
  }

  function generateCoFocusLink() {
    const fakeLink = `https://study-companion.app/session/${Math.random()
      .toString(36)
      .substring(2, 8)}`;
    setCoFocusLink(fakeLink);
    setFriendJoined(false);

    setTimeout(() => {
      setFriendJoined(true);
      setFeedbackMessage(
        "Your friend joined the co-focus session. Stay accountable together."
      );
    }, 4000);
  }

  async function copyInviteLink() {
    if (!coFocusLink) return;

    try {
      await navigator.clipboard.writeText(coFocusLink);
      setFeedbackMessage("Invite link copied.");
    } catch (error) {
      console.error("Copy failed:", error);
      setFeedbackMessage("Could not copy the invite link.");
    }
  }

  useEffect(() => {
    if (!sessionStarted || !supports.focus) return;

    const interval = setInterval(() => {
      const randomMessage =
        catMessages[Math.floor(Math.random() * catMessages.length)];
      setCatMessage(randomMessage);
      setShowCat(true);
      playMeow();

      setTimeout(() => {
        setShowCat(false);
      }, 4000);
    }, 5000);

    return () => clearInterval(interval);
  }, [sessionStarted, supports.focus]);

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
          <h1 className="text-5xl font-bold leading-tight">
            Study Workspace
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            A modular study space where students can combine audio support,
            focus support, and language support based on overlapping learning
            needs.
          </p>
        </div>

        <div className="mt-8 rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold">Choose Your Support Tools</h2>
          <p className="mt-3 text-slate-600">
            You are not limited to one mode. Turn support layers on or off
            depending on what you need for this study session.
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

              <div className="mt-6 rounded-2xl bg-slate-100 p-5">
                <h3 className="font-semibold">Co-Focus Mode</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Invite a friend to stay accountable and study together.
                </p>

                {!coFocusLink ? (
                  <button
                    onClick={generateCoFocusLink}
                    className="mt-4 rounded-2xl bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-800"
                  >
                    Generate Invite Link
                  </button>
                ) : (
                  <div className="mt-4 space-y-3">
                    <div className="rounded-xl bg-white p-3 text-sm break-all">
                      {coFocusLink}
                    </div>

                    <button
                      onClick={copyInviteLink}
                      className="rounded-xl bg-slate-200 px-3 py-2 text-sm font-medium transition hover:bg-slate-300"
                    >
                      Copy Link
                    </button>

                    <p className="text-sm text-slate-600">
                      {friendJoined
                        ? "👤 Friend joined the session"
                        : "Waiting for friend..."}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {supports.focus && (
              <div className="rounded-3xl bg-white p-8 shadow-sm">
                <h2 className="text-2xl font-semibold">Focus Workflow</h2>
                <p className="mt-3 text-slate-600">
                  Complete one task at a time. The goal is progress, not perfection.
                </p>

                <div className="mt-8">
                  <div className="mb-2 flex items-center justify-between text-sm font-medium">
                    <span>Progress</span>
                    <span>
                      {completedCount} / {focusTasks.length} completed
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
                  {focusTasks.map((task, index) => (
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
            )}

            {supports.audio && (
              <div className="rounded-3xl bg-white p-8 shadow-sm">
                <h2 className="text-2xl font-semibold">Audio Support</h2>
                <p className="mt-3 text-slate-600">
                  Turn written study material into a listenable recap for
                  replay and review.
                </p>

                <div className="mt-6 rounded-2xl bg-sky-100 p-5">
                  <p className="font-medium">Audio Summary Preview</p>
                  <p className="mt-3 text-sm leading-7 text-slate-700">
                    This section gives the student a spoken-style recap of the
                    material, so they can study while commuting, walking, or
                    replaying key ideas.
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

            {supports.language && (
              <div className="rounded-3xl bg-white p-8 shadow-sm">
                <h2 className="text-2xl font-semibold">Language Support</h2>
                <p className="mt-3 text-slate-600">
                  Simplify academic wording without losing technical meaning.
                </p>

                <div className="mt-6 rounded-2xl bg-emerald-100 p-5">
                  <p className="font-medium">Simplified Explanation</p>
                  <p className="mt-3 text-sm leading-7 text-slate-700">
                    This content explains difficult academic ideas in clearer
                    language while still preserving the important exam-relevant
                    terms.
                  </p>
                </div>

                <div className="mt-5 rounded-2xl border border-slate-200 p-5">
                  <p className="font-medium">Glossary Support</p>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
                    <li>Intrinsic Load — difficulty caused by the topic itself</li>
                    <li>
                      Extraneous Load — difficulty caused by unclear presentation
                    </li>
                    <li>
                      Working Memory — the part of the mind that holds information temporarily
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-8">
            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-semibold">Mini Challenge</h2>
              <p className="mt-4 leading-7 text-slate-600">
                Break the material into a smaller task. Define the main idea in
                one sentence, then identify one part that still feels confusing.
              </p>

              <div className="mt-6 rounded-2xl bg-amber-100 p-5">
                <p className="font-medium">2-minute mission</p>
                <p className="mt-2 text-sm leading-6 text-slate-700">
                  Based on your material, summarize the concept in one sentence
                  and mark one term you want to review again.
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
                {!supports.audio && !supports.focus && !supports.language && (
                  <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
                    No supports selected
                  </span>
                )}
              </div>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-semibold">Session Summary</h2>
              <p className="mt-4 text-slate-600">
                A modular workflow that adapts to overlapping learner needs.
              </p>

              <div className="mt-6 rounded-2xl bg-slate-100 p-5">
                <p className="font-medium">Current session</p>
                <p className="mt-2 text-sm leading-6 text-slate-700">
                  {completedCount === focusTasks.length && sessionStarted
                    ? "You completed the full focus workflow for this session."
                    : sessionStarted
                    ? `You have completed ${completedCount} of ${focusTasks.length} focus tasks so far.`
                    : "Start a session to begin tracking progress and support usage."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {showCat && supports.focus && (
          <div className="fixed bottom-6 right-6 w-80 rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="flex items-center gap-4">
              <div className="text-5xl">🐱</div>
              <div>
                <p className="text-lg font-semibold">Focus Buddy</p>
                <p className="text-sm text-slate-600">Attention check</p>
              </div>
            </div>

            <p className="mt-4 leading-6 text-slate-700">{catMessage}</p>
          </div>
        )}
      </section>
    </main>
  );
}