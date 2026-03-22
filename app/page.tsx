export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-16">
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

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Listen Mode</h2>
            <p className="mt-3 text-slate-600">
              Turn study materials into audio-friendly summaries for learners
              who understand better by listening.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Focus Mode</h2>
            <p className="mt-3 text-slate-600">
              Break dense chapters into short, interactive study challenges for
              students who struggle with long attention spans.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Clarity Mode</h2>
            <p className="mt-3 text-slate-600">
              Simplify academic language without losing technical accuracy for
              international students and other learners.
            </p>
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