import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    name: "Cleaning",
    slug: "cleaning",
    description: "Sparkling homes, apartments, and offices.",
    teddyImage:
      "https://syjhashjppfwfsyxmxzv.supabase.co/storage/v1/object/public/teddy-mascots/cleaning_teddy.png",
  },
  {
    name: "Painting",
    slug: "painting",
    description: "Interior, exterior, touch-ups, and full repaints.",
    teddyImage:
      "https://syjhashjppfwfsyxmxzv.supabase.co/storage/v1/object/public/teddy-mascots/painting_teddy.png",
  },
  {
    name: "General Contractor",
    slug: "contractor",
    description: "Remodels, additions, and bigger projects.",
    teddyImage:
      "https://syjhashjppfwfsyxmxzv.supabase.co/storage/v1/object/public/teddy-mascots/gc_teddy.png",
  },
  {
    name: "Pest Control",
    slug: "pest-control",
    description: "Keep your home protected and pest-free.",
    teddyImage:
      "https://syjhashjppfwfsyxmxzv.supabase.co/storage/v1/object/public/teddy-mascots/pest_control_teddy.png",
  },
  {
    name: "Lawn Care",
    slug: "lawn-care",
    description: "Grass, edges, hedges, and tidy yards.",
    teddyImage:
      "https://syjhashjppfwfsyxmxzv.supabase.co/storage/v1/object/public/teddy-mascots/lawncare_teddy.png",
  },
  {
    name: "Electrical",
    slug: "electrical",
    description: "Panels, outlets, lights, and more.",
    teddyImage:
      "https://syjhashjppfwfsyxmxzv.supabase.co/storage/v1/object/public/teddy-mascots/electrical_teddy.png",
  },
  {
    name: "Plumbing",
    slug: "plumbing",
    description: "Leaks, clogs, installs, and repairs.",
    teddyImage:
      "https://syjhashjppfwfsyxmxzv.supabase.co/storage/v1/object/public/teddy-mascots/plumber_teddy.png",
  },
  {
    name: "HVAC",
    slug: "hvac",
    description: "Heating, cooling, and air quality.",
    teddyImage:
      "https://syjhashjppfwfsyxmxzv.supabase.co/storage/v1/object/public/teddy-mascots/hvac_teddy.png",
  },
  {
    name: "Auto Repair",
    slug: "auto-repair",
    description: "Honest local mechanics for your ride.",
    teddyImage:
      "https://syjhashjppfwfsyxmxzv.supabase.co/storage/v1/object/public/teddy-mascots/autos_teddy.png",
  },
  {
    name: "IT Services",
    slug: "it-services",
    description: "Home tech, Wi-Fi, devices, and support.",
    teddyImage:
      "https://syjhashjppfwfsyxmxzv.supabase.co/storage/v1/object/public/teddy-mascots/support_teddy.png",
  },
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 space-y-12">
      {/* Hero */}
      <section className="rounded-3xl bg-linear-to-br from-teddy-blue via-teddy-green to-teddy-teal p-1.5 shadow-teddy-card">
        <div className="rounded-3xl bg-white/95 px-6 py-8 backdrop-blur-sm dark:bg-slate-900/90">
          <div className="flex flex-col gap-8 md:flex-row md:items-center">
            {/* Hero text */}
            <div className="flex-1 space-y-4">
              <div className="inline-flex items-center rounded-full bg-teddy-neutral/80 px-3 py-1 text-xs font-medium text-slate-700">
                🧸 Teddy&apos;s Book · Local service-matching
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 md:text-4xl">
                Find trusted local pros, the Teddy way.
              </h1>
              <p className="max-w-xl text-sm text-slate-700 dark:text-slate-200">
                Where the right pro meets the right job. Tell Teddy what you
                need, and we&apos;ll match you with local, vetted professionals
                who are ready to help.
              </p>

              {/* Search bar inside hero */}
              <form
                action="/directory"
                method="get"
                className="mt-3 flex flex-col gap-3 sm:flex-row"
              >
                <input
                  type="text"
                  name="q"
                  placeholder="What do you need help with? (e.g. 'plumber in Aiken')"
                  className="flex-1 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm focus:border-teddy-blue focus:outline-none focus:ring-2 focus:ring-teddy-blue/40 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                />
                <button
                  type="submit"
                  className="rounded-full bg-teddy-blue px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-teddy-teal focus:outline-none focus:ring-2 focus:ring-teddy-blue focus:ring-offset-2"
                >
                  Search pros
                </button>
              </form>

              {/* Primary CTA */}
              <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-600 dark:text-slate-300">
                <Link
                  href="/request"
                  className="inline-flex items-center rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
                >
                  Book a Pro
                </Link>
                <Link
                  href="/pro/join"
                  className="inline-flex items-center rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-900 shadow-sm transition hover:border-teddy-blue hover:text-teddy-blue dark:border-slate-700 dark:text-slate-100"
                >
                  Are you a Pro? Join Teddy
                </Link>
                <span>• No subscriptions for customers · Pros pay per lead</span>
              </div>
            </div>

            {/* Hero visual / placeholder for Teddy mascot */}
            <div className="flex flex-1 items-center justify-center">
              <div className="relative h-60 w-60 sm:h-72 sm:w-72 flex items-center justify-center">
                <Image
                  src="/teddysbook-logo2.png"
                  alt="Teddy’s Book Logo"
                  fill
                  sizes="288px"
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust indicators */}
      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-700">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
            Local & community-rooted
          </h3>
          <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
            Teddy&apos;s Book starts in your region — connecting neighbors to
            trusted local pros, not random out-of-town call centers.
          </p>
        </div>
        <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-700">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
            Smart matching, human review
          </h3>
          <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
            AI-assisted matching helps route the right jobs to the right pros,
            with human oversight so quality stays high.
          </p>
        </div>
        <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-700">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
            Pros pay per lead — not you
          </h3>
          <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
            Customers don&apos;t pay Teddy to browse. Pros pay a transparent
            lead fee so you can compare options without pressure.
          </p>
        </div>
      </section>

      {/* Category grid */}
      <section className="relative overflow-hidden space-y-4 rounded-3xl border border-slate-200 bg-white/85 p-4 shadow-teddy-card">
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute inset-0 opacity-70"
            style={{
              backgroundImage:
                "linear-gradient(135deg, rgba(44,143,191,0.14), rgba(38,166,154,0.16))",
              backgroundSize: "200% 200%",
            }}
          />
          <div
            className="absolute inset-0 animate-jigsaw-parallax opacity-45"
            style={{
              backgroundImage: "url('/puzzle-bg.svg')",
              backgroundSize: "180px",
              backgroundRepeat: "repeat",
              backgroundPosition: "0 0",
            }}
          />
        </div>

        <div className="relative flex items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
              Browse by category
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Tap a Teddy to start a request in that category.
            </p>
          </div>
          <Link
            href="/directory"
            className="text-xs font-semibold text-teddy-blue hover:text-teddy-teal"
          >
            View full directory →
          </Link>
        </div>

        <div className="relative grid gap-4 md:grid-cols-2">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/request?category=${encodeURIComponent(cat.slug)}`}
              className="group rounded-2xl bg-white p-4 shadow-teddy-card ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:ring-teddy-blue/70 dark:bg-slate-900 dark:ring-slate-700"
            >
              <div className="flex items-center gap-4">
                {/* Mascot left */}
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-teddy-neutral/70 dark:bg-slate-800">
                  <Image
                    src={cat.teddyImage}
                    alt={`${cat.name} Teddy`}
                    fill
                    sizes="80px"
                    className="object-contain p-1"
                  />
                </div>

                {/* Text right */}
                <div className="flex-1 space-y-1">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    {cat.description}
                  </p>
                  <div className="text-[11px] font-semibold text-teddy-blue group-hover:text-teddy-teal">
                    Start a {cat.name.toLowerCase()} request →
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
