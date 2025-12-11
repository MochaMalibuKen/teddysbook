"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function TeddyHelper() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(timeout);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fadeIn">
      <div className="relative rounded-2xl bg-white shadow-xl border border-gray-200 p-4 max-w-xs">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2">
          <Image
            src="https://syjhashjppfwfsyxmxzv.supabase.co/storage/v1/object/public/teddy-mascots/pro_teddy.png"
            alt="Teddy Helper"
            width={100}
            height={100}
          />
        </div>

        <p className="mt-10 text-sm font-medium text-gray-800">
          Hi, I’m Teddy! Need help finding a great local pro?  
          Just tell me what you&apos;re looking for!
        </p>

        <button
          onClick={() => setVisible(false)}
          className="mt-3 w-full rounded-full bg-teddy-blue text-white py-2 text-xs font-semibold hover:bg-teddy-teal transition"
        >
          Got it!
        </button>
      </div>
    </div>
  );
}
