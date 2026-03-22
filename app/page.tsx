import Link from "next/link";

const personas = [
  {
    title: "Multi-Modal Learner",
    description:
      "Best for students who understand material better by listening and replaying content.",
    href: "/multimodal",
    button: "Enter Audio Mode",
  },
  {
    title: "Focus-Seeking Student",
    description:
      "Best for students who need short study tasks, progress tracking, and re-engagement prompts.",
    href: "/focus",
    button: "Enter Focus Mode",
  },
  {
    title: "Global Scholar",
    description:
      "Best for students who want simpler academic language without losing technical accuracy.",
    href: "/global-scholar",
    button: "Enter Clarity Mode",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="max-w-4xl">
          <p className="mb-4 inline-block rounded-full bg-slate-200 px-4 py-1 text-sm font-medium">
            Build With AI Case Competition
          </p>

          <h1 className="text-5xl font-bold leading-tight md:text-6xl">
            Study Companion
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Choose the study experience that fits how you learn best. Instead
            of forcing every student into the same format, Study Companion
            adapts the learning journey for different learner types.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {personas.map((persona) => (
            <div
              key={persona.title}
              className="rounded-3xl bg-white p-8 shadow-sm"
            >
              <h2 className="text-2xl font-semibold">{persona.title}</h2>
              <p className="mt-4 min-h-[120px] leading-7 text-slate-600">
                {persona.description}
              </p>

              <Link
                href={persona.href}
                className="mt-6 inline-block rounded-2xl bg-slate-900 px-5 py-3 font-medium text-white transition hover:bg-slate-800"
              >
                {persona.button}
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}