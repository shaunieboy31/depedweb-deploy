"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { SEARCH_INDEX } from "@/utils/searchIndex";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const q = (searchParams?.get("q") || "").trim();

  const results = q
    ? SEARCH_INDEX.filter((item) => {
        const needle = q.toLowerCase();
        return (
          item.title.toLowerCase().includes(needle) ||
          item.excerpt.toLowerCase().includes(needle)
        );
      })
    : [];

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Search results</h1>

      {!q && <p>Please enter a search term.</p>}

      {q && (
        <div>
          <p className="mb-4">
            Showing results for <strong>{q}</strong>.
          </p>

          {results.length === 0 ? (
            <div className="p-4 border rounded bg-white">No results found.</div>
          ) : (
            <ul className="space-y-4">
              {results.map((r) => (
                <li key={r.href} className="border rounded p-4 bg-white">
                  <Link
                    href={r.href}
                    className="text-lg font-semibold text-blue-700 hover:underline"
                  >
                    {r.title}
                  </Link>
                  <p className="mt-2 text-sm text-gray-700">{r.excerpt}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
