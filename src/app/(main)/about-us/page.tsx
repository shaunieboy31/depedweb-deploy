"use client";

import React from "react";
import Link from "next/link";

export default function AboutIndex() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">About Us</h1>
      <p className="text-gray-700 mb-8">
        The Schools Division Office of Imus City — links to the History,
        Division Profile and other related pages are below.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/about-us/history"
          className="block p-6 bg-sky-100 border border-sky-300 rounded-lg shadow hover:shadow-lg"
        >
          <h3 className="text-lg font-semibold text-sky-700">History</h3>
          <p className="text-sm text-sky-700 mt-2">
            Read the history and background of the division.
          </p>
        </Link>

        <Link
          href="/about-us/division-profile"
          className="block p-6 bg-emerald-100 border border-emerald-300 rounded-lg shadow hover:shadow-lg"
        >
          <h3 className="text-lg font-semibold text-emerald-700">
            Division Profile
          </h3>
          <p className="text-sm text-emerald-700 mt-2">
            Overview of the division office, leadership and contact details.
          </p>
        </Link>

        <Link
          href="/about-us/organizational-structure"
          className="block p-6 bg-indigo-100 border border-indigo-300 rounded-lg shadow hover:shadow-lg"
        >
          <h3 className="text-lg font-semibold text-indigo-700">
            Organizational Structure
          </h3>
          <p className="text-sm text-indigo-700 mt-2">
            See how the division is organized, offices and units.
          </p>
        </Link>

        <Link
          href="/about-us/learning-leaders"
          className="block p-6 bg-pink-100 border border-pink-300 rounded-lg shadow hover:shadow-lg"
        >
          <h3 className="text-lg font-semibold text-pink-700">
            Learning Leaders
          </h3>
          <p className="text-sm text-pink-700 mt-2">
            Profiles and messages from our learning leaders.
          </p>
        </Link>

        <Link
          href="/about-us/employee-of-month"
          className="block p-6 bg-amber-100 border border-amber-300 rounded-lg shadow hover:shadow-lg"
        >
          <h3 className="text-lg font-semibold text-amber-700">
            Employee of the Month
          </h3>
          <p className="text-sm text-amber-700 mt-2">
            Recognition for outstanding staff from across the division.
          </p>
        </Link>

        <Link
          href="/contact"
          className="block p-6 bg-gray-100 border border-gray-300 rounded-lg shadow hover:shadow-lg"
        >
          <h3 className="text-lg font-semibold text-gray-800">Contact</h3>
          <p className="text-sm text-gray-700 mt-2">
            Get in touch with the Schools Division Office of Imus City.
          </p>
        </Link>
      </div>
    </div>
  );
}
