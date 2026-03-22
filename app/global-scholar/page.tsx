import Link from "next/link";

export default function GlobalScholarPage() {
  return (
    <main className="min-h-screen bg-emerald-50 px-6 py-16 text-slate-900">
      <section className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="inline-block rounded-full bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-slate-100"
        >
          ← Back to Home
        </Link>

        <h1 className="mt-8 text-5xl font-bold">Global Scholar</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
          This page will focus on simpler academic explanations, glossary
          support, and clearer concept breakdowns.
        </p>
      </section>
    </main>
  );
}