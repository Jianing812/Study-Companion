import Link from "next/link";

const personas = [
  {
    title: "🎧 Audio Support",
    description:
      "Convert notes into audio summaries with replay and speed control for on-the-go learning.",
    href: "/multimodal",
    button: "Enter Audio Mode",
  },
  {
    title: "🐱 Focus Support",
    description:
      "Stay engaged with short tasks, progress tracking, and gentle attention reminders.",
    href: "/focus",
    button: "Enter Focus Mode",
  },
  {
    title: "🌍 Language Support",
    description:
      "Simplify academic content and access multilingual explanations without losing accuracy.",
    href: "/global-scholar",
    button: "Enter Language Mode",
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
            Instead of forcing students into one learning style, Study Companion
            provides modular support. You can combine audio, focus, and language
            support based on your needs.
          </p>
        </div>

        
        <div className="mt-6 max-w-3xl rounded-2xl bg-slate-100 p-4 text-sm text-slate-700">
          You are not limited to one mode. Explore different support experiences
          and combine them based on your study challenges.
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