"use client";

import React from "react";
import Image from "next/image";

export default function PageSeals() {
  return (
    <div className="bg-transparent">
      <div className="max-w-7xl mx-auto px-35 py-1">
        <div className="flex justify-center gap-100 mt-0">
          <a
            href="/transparency-seal"
          >
            <Image
              src="/images/logo/transparency-seal-160x160.png"
              alt="Transparency Seal"
              width={150}
              height={128}
              className="object-contain hover:scale-105 transition-transform duration-200"
            />
          </a>

          <a
            href="https://your-foi-link.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/images/logo/foi-logo.webp"
              alt="Freedom of Information Seal"
              width={160}
              height={128}
              className="object-contain hover:scale-105 transition-transform duration-200"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
