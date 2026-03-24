import Link from "next/link";

const supports = [
  {
    icon: "🎧",
    title: "Audio Support",
    description:
      "Turn notes into replayable audio with speed control and downloadable study materials.",
    href: "/multimodal",
    button: "Explore Audio",
    accent: "bg-sky-100 text-sky-800",
  },
  {
    icon: "🐱",
    title: "Focus Support",
    description:
      "Stay engaged with mini tasks, progress tracking, co-focus sessions, and attention reminders.",
    href: "/focus",
    button: "Explore Focus",
    accent: "bg-amber-100 text-amber-800",
  },
  {
    icon: "🌍",
    title: "Language Support",
    description:
      "Simplify difficult academic content with multilingual explanations and interactive term mapping.",
    href: "/global-scholar",
    button: "Explore Language",
    accent: "bg-emerald-100 text-emerald-800",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="max-w-4xl">
          <p className="inline-flex rounded-full bg-slate-200 px-4 py-1 text-sm font-medium text-slate-700">
            Build With AI Case Competition
          </p>

          <h1 className="mt-6 text-5xl font-bold leading-tight tracking-tight md:text-7xl">
            Study Companion
          </h1>

          <p className="mt-6 max-w-3xl text-xl leading-9 text-slate-600">
            Modular study support for how students actually learn.
          </p>

          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-500">
            Combine audio, focus, and language tools in one adaptive workspace
            based on overlapping learning needs.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/focus"
              className="rounded-2xl bg-slate-900 px-6 py-3 font-medium text-white transition hover:bg-slate-800"
            >
              Try the Workspace
            </Link>

            <Link
              href="/global-scholar"
              className="rounded-2xl border border-slate-300 bg-white px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
            >
              View Language Support
            </Link>
          </div>
        </div>

        <div className="mt-10 max-w-4xl rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm leading-7 text-slate-600">
            Students are not locked into one category. A learner can combine
            audio support, focus support, and language support in the same study
            session depending on the material and context.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {supports.map((support) => (
            <div
              key={support.title}
              className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              <div
                className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl text-2xl ${support.accent}`}
              >
                {support.icon}
              </div>

              <h2 className="mt-5 text-2xl font-semibold">{support.title}</h2>

              <p className="mt-4 min-h-[120px] leading-7 text-slate-600">
                {support.description}
              </p>

              <Link
                href={support.href}
                className="mt-6 inline-block rounded-2xl bg-slate-900 px-5 py-3 font-medium text-white transition hover:bg-slate-800"
              >
                {support.button}
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}