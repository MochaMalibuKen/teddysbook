import Image from "next/image";
import Link from "next/link";
import type { Category } from "@/lib/types";

const categories: Category[] = [
  {
    name: "Cleaning",
    slug: "cleaning",
    description: "Sparkling homes, apartments, and offices.",
    imageUrl:
      "https://syjhashjppfwfsyxmxzv.supabase.co/storage/v1/object/public/teddy-mascots/cleaning_teddy.png",
  },
  {
    name: "Painting",
    slug: "painting",
    description: "Interior, exterior, touch-ups, and full repaints.",
    imageUrl:
      "https://syjhashjppfwfsyxmxzv.supabase.co/storage/v1/object/public/teddy-mascots/painting_teddy.png",
  },
  {
    name: "General Contractor",
    slug: "contractor",
    description: "Remodels, additions, and bigger projects.",
    imageUrl:
      "https://syjhashjppfwfsyxmxzv.supabase.co/storage/v1/object/public/teddy-mascots/gc_teddy.png",
  },
  {
    name: "Pest Control",
    slug: "pest-control",
    description: "Keep your home protected and pest-free.",
    imageUrl:
      "https://syjhashjppfwfsyxmxzv.supabase.co/storage/v1/object/public/teddy-mascots/pest_control_teddy.png",
  },
  {
    name: "Lawn Care",
    slug: "lawn-care",
    description: "Grass, edges, hedges, and tidy yards.",
    imageUrl:
      "https://syjhashjppfwfsyxmxzv.supabase.co/storage/v1/object/public/teddy-mascots/lawncare_teddy.png",
  },
  {
    name: "Electrical",
    slug: "electrical",
    description: "Panels, outlets, lights, and more.",
    imageUrl:
      "https://syjhashjppfwfsyxmxzv.supabase.co/storage/v1/object/public/teddy-mascots/electrical_teddy.png",
  },
  {
    name: "Plumbing",
    slug: "plumbing",
    description: "Leaks, clogs, installs, and repairs.",
    imageUrl:
      "https://syjhashjppfwfsyxmxzv.supabase.co/storage/v1/object/public/teddy-mascots/plumber_teddy.png",
  },
  {
    name: "HVAC",
    slug: "hvac",
    description: "Heating, cooling, and air quality.",
    imageUrl:
      "https://syjhashjppfwfsyxmxzv.supabase.co/storage/v1/object/public/teddy-mascots/hvac_teddy.png",
  },
  {
    name: "Auto Repair",
    slug: "auto-repair",
    description: "Honest local mechanics for your ride.",
    imageUrl:
      "https://syjhashjppfwfsyxmxzv.supabase.co/storage/v1/object/public/teddy-mascots/autos_teddy.png",
  },
  {
    name: "IT Services",
    slug: "it-services",
    description: "Home tech, Wi-Fi, devices, and support.",
    imageUrl:
      "https://syjhashjppfwfsyxmxzv.supabase.co/storage/v1/object/public/teddy-mascots/support_teddy.png",
  },
];

export default function HomePage() {
  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-12 px-4 py-12">
      <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="space-y-4">
            <p className="text-sm font-semibold text-teddy-blue">Teddy’s Book</p>
            <h1 className="text-3xl font-bold leading-tight text-slate-900">
              Find trusted local pros with one request.
            </h1>
            <p className="max-w-xl text-sm text-slate-600">
              Share what you need and we match you with vetted local pros who are ready to help.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/request"
                className="rounded-full bg-teddy-blue px-4 py-2 text-sm font-semibold text-white shadow-sm"
              >
                Book a pro
              </Link>
              <Link
                href="/directory"
                className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900"
              >
                Browse directory
              </Link>
            </div>
            <p className="text-xs text-slate-500">
              No subscriptions for customers. Pros pay per lead.
            </p>
          </div>
          <div className="flex justify-center md:justify-end">
            <div className="relative h-32 w-32">
              <Image
                src="/teddysbook-logo2.png"
                alt="Teddy’s Book logo"
                fill
                sizes="128px"
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900">Popular categories</h2>
          <Link
            href="/directory"
            className="text-sm font-semibold text-teddy-blue hover:underline"
          >
            View all
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {categories.map((category) => (
            <article
              key={category.slug}
              className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="relative h-14 w-14 shrink-0">
                <Image
                  src={category.imageUrl}
                  alt={`${category.name} mascot`}
                  fill
                  sizes="56px"
                  className="rounded-lg object-contain"
                />
              </div>
              <div className="space-y-2">
                <div>
                  <h3 className="text-base font-semibold text-slate-900">{category.name}</h3>
                  <p className="text-sm text-slate-600">{category.description}</p>
                </div>
                <Link
                  href={`/directory?category=${category.slug}`}
                  className="inline-flex text-sm font-semibold text-teddy-blue hover:underline"
                >
                  Find pros
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
