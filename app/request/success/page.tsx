import Link from "next/link";

export default function RequestSuccessPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-4 text-center">
      <div className="mb-4 text-4xl">🧸✨</div>
      <h1 className="mb-2 text-2xl font-bold text-gray-900">
        Teddy’s on it!
      </h1>
      <p className="mb-4 text-sm text-gray-600">
        Your request has been sent. Teddy’s Book is now matching you with trusted
        local pros. You’ll hear from someone soon using the contact info you
        provided.
      </p>

      <div className="space-x-3">
        <Link
          href="/"
          className="inline-flex items-center rounded-full bg-teddy-blue px-5 py-2 text-sm font-semibold text-white hover:bg-teddy-teal transition"
        >
          Back to home
        </Link>
        <Link
          href="/directory"
          className="inline-flex items-center rounded-full border border-gray-300 px-5 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
        >
          Browse pros
        </Link>
      </div>
    </div>
  );
}