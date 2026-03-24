"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function AudioWorkspace() {
  const [notes, setNotes] = useState(
    "Photosynthesis is the process by which plants convert light energy into chemical energy. It mainly occurs in the chloroplasts and uses carbon dioxide, water, and sunlight to produce glucose and oxygen."
  );

  const [supports, setSupports] = useState({
    audio: true,
    focus: false,
    language: false,
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [statusMessage, setStatusMessage] = useState(
    "Ready to generate audio from your study material."
  );

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  function toggleSupport(type: "audio" | "focus" | "language") {
    setSupports((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  }

  function stopSpeech() {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    utteranceRef.current = null;
    setIsPlaying(false);
    setIsPaused(false);
    setStatusMessage("Audio stopped.");
  }

  function playSpeech() {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      setStatusMessage("Speech synthesis is not supported in this browser.");
      return;
    }

    if (!notes.trim()) {
      setStatusMessage("Please enter some study material first.");
      return;
    }

    // 如果当前是暂停状态，就继续
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPlaying(true);
      setIsPaused(false);
      setStatusMessage(`Audio resumed at ${speed}x speed.`);
      return;
    }

    // 先停止之前的
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(notes);
    utterance.rate = speed;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
      setStatusMessage(`Now playing at ${speed}x speed.`);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setStatusMessage("Audio finished.");
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setStatusMessage("Audio playback failed.");
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }

  function pauseSpeech() {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
      window.speechSynthesis.pause();
      setIsPlaying(false);
      setIsPaused(true);
      setStatusMessage("Audio paused.");
    }
  }

  function changeSpeed() {
    const speeds = [1, 1.25, 1.5];
    const next = speeds[(speeds.indexOf(speed) + 1) % speeds.length];
    setSpeed(next);
    setStatusMessage(`Playback speed set to ${next}x.`);

    // 如果正在播，提醒用户重新播放以应用新速度
    if (isPlaying || isPaused) {
      stopSpeech();
      setStatusMessage(`Playback speed set to ${next}x. Press Play to restart.`);
    }
  }

  function downloadTranscript() {
    const blob = new Blob([notes], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "study-transcript.txt";
    a.click();
    URL.revokeObjectURL(url);
    setStatusMessage("Transcript downloaded.");
  }

  function downloadAudioPlaceholder() {
    setStatusMessage(
      "Audio download is a planned feature. In this demo, transcript download is available now."
    );
  }

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <main className="min-h-screen bg-sky-50 text-slate-900">
      <section className="mx-auto max-w-6xl px-6 py-16">
        <Link
          href="/"
          className="inline-block rounded-full bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-slate-100"
        >
          ← Back to Home
        </Link>

        <div className="mt-8 max-w-4xl">
          <h1 className="text-5xl font-bold leading-tight">Audio Workspace</h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            A modular study space where students can turn written content into
            audio, and optionally combine focus and language support.
          </p>
        </div>

        <div className="mt-8 rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold">Choose Your Support Tools</h2>
          <p className="mt-3 text-slate-600">
            Activate one or more support layers depending on what you need for
            this study session.
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
                Paste notes, extracted slide text, or textbook content below.
              </p>

              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="mt-6 min-h-[240px] w-full rounded-2xl border border-slate-200 p-4 text-sm leading-7 outline-none focus:border-sky-400"
              />
            </div>

            {supports.audio && (
              <div className="rounded-3xl bg-white p-8 shadow-sm">
                <h2 className="text-2xl font-semibold">Audio Summary</h2>
                <p className="mt-3 text-slate-600">
                  Listen to your study material with adjustable playback speed.
                </p>

                <div className="mt-6 rounded-2xl bg-sky-100 p-5">
                  <p className="font-medium">Audio status</p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    {statusMessage}
                  </p>

                  <div className="mt-5 h-3 w-full rounded-full bg-white">
                    <div
                      className={`h-3 rounded-full bg-slate-900 transition-all ${
                        isPlaying ? "w-2/3" : isPaused ? "w-1/3" : "w-1/6"
                      }`}
                    />
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <button
                      onClick={playSpeech}
                      className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
                    >
                      {isPaused ? "Resume" : "Play"}
                    </button>

                    <button
                      onClick={pauseSpeech}
                      className="rounded-2xl bg-white px-4 py-2 text-sm font-medium hover:bg-slate-100"
                    >
                      Pause
                    </button>

                    <button
                      onClick={stopSpeech}
                      className="rounded-2xl bg-white px-4 py-2 text-sm font-medium hover:bg-slate-100"
                    >
                      Stop
                    </button>

                    <button
                      onClick={changeSpeed}
                      className="rounded-2xl bg-white px-4 py-2 text-sm font-medium hover:bg-slate-100"
                    >
                      Speed {speed}x
                    </button>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <button
                      onClick={downloadAudioPlaceholder}
                      className="rounded-2xl bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700"
                    >
                      Download Audio
                    </button>

                    <button
                      onClick={downloadTranscript}
                      className="rounded-2xl bg-white px-4 py-2 text-sm font-medium hover:bg-slate-100"
                    >
                      Download Transcript
                    </button>
                  </div>
                </div>
              </div>
            )}

            {supports.focus && (
              <div className="rounded-3xl bg-white p-8 shadow-sm">
                <h2 className="text-2xl font-semibold">Focus Support</h2>
                <p className="mt-3 text-slate-600">
                  Break the audio session into smaller study actions.
                </p>

                <div className="mt-6 rounded-2xl bg-amber-100 p-5">
                  <ul className="space-y-3 text-sm leading-6 text-slate-700">
                    <li>• Listen to the audio summary once</li>
                    <li>• Pause and explain the main idea in one sentence</li>
                    <li>• Replay the most confusing section</li>
                    <li>• Mark one key term for review</li>
                  </ul>
                </div>
              </div>
            )}

            {supports.language && (
              <div className="rounded-3xl bg-white p-8 shadow-sm">
                <h2 className="text-2xl font-semibold">Language Support</h2>
                <p className="mt-3 text-slate-600">
                  Simplify the content while keeping the key academic meaning.
                </p>

                <div className="mt-6 rounded-2xl bg-emerald-100 p-5">
                  <p className="font-medium">Simplified explanation</p>
                  <p className="mt-3 text-sm leading-7 text-slate-700">
                    This material explains how plants use sunlight to create
                    energy. The main idea is that plants turn light, water, and
                    carbon dioxide into glucose and oxygen.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-8">
            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-semibold">Transcript</h2>
              <p className="mt-3 text-slate-600">
                Review the same study material in text form while listening.
              </p>

              <div className="mt-6 rounded-2xl border border-slate-200 p-5">
                <p className="text-sm leading-7 text-slate-700">{notes}</p>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-semibold">Replay Sections</h2>
              <div className="mt-6 flex flex-col gap-3">
                <button className="rounded-2xl bg-slate-100 px-4 py-3 text-left hover:bg-slate-200">
                  Replay definition
                </button>
                <button className="rounded-2xl bg-slate-100 px-4 py-3 text-left hover:bg-slate-200">
                  Replay key process
                </button>
                <button className="rounded-2xl bg-slate-100 px-4 py-3 text-left hover:bg-slate-200">
                  Replay quick recap
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
          </div>
        </div>
      </section>
    </main>
  );
}