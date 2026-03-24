"use client";

import { useState } from "react";
import Link from "next/link";

export default function AudioWorkspace() {
  const [notes, setNotes] = useState(
    "Photosynthesis is the process by which plants convert light energy into chemical energy."
  );

  const [supports, setSupports] = useState({
    audio: true,
    focus: false,
    language: false,
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);

  function toggleSupport(type: "audio" | "focus" | "language") {
    setSupports((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  }

  function togglePlay() {
    setIsPlaying(!isPlaying);
  }

  function changeSpeed() {
    const speeds = [1, 1.25, 1.5];
    const next = speeds[(speeds.indexOf(speed) + 1) % speeds.length];
    setSpeed(next);
  }

  function downloadTranscript() {
    const blob = new Blob([notes], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "study-summary.txt";
    a.click();
  }

  function downloadAudio() {
    // demo用：下载一个假音频文件
    const a = document.createElement("a");
    a.href =
      "https://cdn.pixabay.com/download/audio/2022/03/15/audio_115b9b6b58.mp3?filename=cat-meow-6226.mp3";
    a.download = "audio-summary.mp3";
    a.click();
  }

  return (
    <main className="min-h-screen bg-sky-50 text-slate-900">
      <section className="mx-auto max-w-6xl px-6 py-16">
        <Link
          href="/"
          className="inline-block rounded-full bg-white px-4 py-2 text-sm shadow-sm"
        >
          ← Back
        </Link>

        <h1 className="mt-8 text-5xl font-bold">Audio Workspace</h1>

        {/* 🔥 SUPPORT TOGGLE */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => toggleSupport("audio")}
            className={`px-4 py-2 rounded ${
              supports.audio ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            🎧 Audio
          </button>

          <button
            onClick={() => toggleSupport("focus")}
            className={`px-4 py-2 rounded ${
              supports.focus ? "bg-amber-500 text-white" : "bg-gray-200"
            }`}
          >
            🐱 Focus
          </button>

          <button
            onClick={() => toggleSupport("language")}
            className={`px-4 py-2 rounded ${
              supports.language ? "bg-green-600 text-white" : "bg-gray-200"
            }`}
          >
            🌍 Language
          </button>
        </div>

        {/* INPUT */}
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="mt-6 w-full p-4 rounded border"
        />

        {/* 🎧 AUDIO */}
        {supports.audio && (
          <div className="mt-6 p-6 bg-white rounded shadow">
            <h2 className="text-xl font-semibold">Audio Summary</h2>

            <p className="mt-3 text-sm text-gray-600">
              Playing at {speed}x speed
            </p>

            <div className="mt-4 flex gap-3">
              <button onClick={togglePlay} className="px-3 py-2 bg-black text-white rounded">
                {isPlaying ? "Pause" : "Play"}
              </button>

              <button onClick={changeSpeed} className="px-3 py-2 bg-gray-200 rounded">
                Speed {speed}x
              </button>

              <button onClick={downloadAudio} className="px-3 py-2 bg-blue-500 text-white rounded">
                Download Audio
              </button>
            </div>
          </div>
        )}

        {/* 🌍 LANGUAGE */}
        {supports.language && (
          <div className="mt-6 p-6 bg-white rounded shadow">
            <h2 className="text-xl font-semibold">Simplified Explanation</h2>
            <p className="mt-3 text-gray-700">
              This concept explains how plants turn sunlight into energy.
            </p>
          </div>
        )}

        {/* 🐱 FOCUS */}
        {supports.focus && (
          <div className="mt-6 p-6 bg-white rounded shadow">
            <h2 className="text-xl font-semibold">Focus Tasks</h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li>• Listen to audio once</li>
              <li>• Summarize in one sentence</li>
              <li>• Identify one key term</li>
            </ul>
          </div>
        )}

        {/* TRANSCRIPT */}
        <div className="mt-6 p-6 bg-white rounded shadow">
          <h2 className="text-xl font-semibold">Transcript</h2>
          <p className="mt-3 text-sm">{notes}</p>

          <button
            onClick={downloadTranscript}
            className="mt-4 px-3 py-2 bg-gray-200 rounded"
          >
            Download Transcript
          </button>
        </div>
      </section>
    </main>
  );
}