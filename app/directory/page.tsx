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

export default function DirectoryPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 space-y-10">
      {/* Header */}
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Browse All Categories
        </h1>
        <p className="text-sm text-gray-600 max-w-xl">
          Select a category to request a local pro. Teddy will route your job to nearby,
          vetted professionals.
        </p>
      </header>

      {/* Category Grid */}
      <div className="grid gap-5 sm:grid-cols-2">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/request?category=${encodeURIComponent(cat.slug)}`}
            className="group flex items-center gap-4 rounded-xl bg-white p-4 shadow-md border border-gray-200 transition hover:-translate-y-1 hover:shadow-lg"
          >
            {/* Teddy mascot */}
            <div className="relative h-20 w-20 flex-shrink-0 rounded-xl bg-gray-100 overflow-hidden">
              <Image
                src={cat.teddyImage}
                alt={cat.name}
                fill
                sizes="80px"
                className="object-contain p-1"
              />
            </div>

            {/* Text */}
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-gray-900">
                {cat.name}
              </h2>
              <p className="text-xs text-gray-600">{cat.description}</p>
              <span className="text-xs font-semibold text-teddy-blue group-hover:text-teddy-teal">
                Start a {cat.name.toLowerCase()} request →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}