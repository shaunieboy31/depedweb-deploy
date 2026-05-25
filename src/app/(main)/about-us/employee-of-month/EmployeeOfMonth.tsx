"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Trophy,
  Calendar,
  Star,
  Sparkles,
  Award,
  ChevronRight,
  User
} from "lucide-react";
import { getEmployeeHonorsAction } from "@/controllers/employee";

export default function EmployeeOfMonth() {
  const [honors, setHonors] = useState<any[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Filters
  const [selectedMonth, setSelectedMonth] = useState<string>("All Months");
  const [selectedYear, setSelectedYear] = useState<string>("All Years");

  useEffect(() => {
    async function loadHonors() {
      const result = await getEmployeeHonorsAction();
      if (result.success && result.data) {
        setHonors(result.data);
      }
      setLoading(false);
    }
    loadHonors();
  }, []);

  // Compute unique months and years for filter dropdowns
  const availableMonths = ["All Months", ...Array.from(new Set(honors.map(h => h.month)))];
  const availableYears = ["All Years", ...Array.from(new Set(honors.map(h => h.year)))].sort((a, b) => b.localeCompare(a));

  // Filtered List
  const filteredHonors = honors.filter(h => {
    const monthMatch = selectedMonth === "All Months" || h.month === selectedMonth;
    const yearMatch = selectedYear === "All Years" || h.year === selectedYear;
    return monthMatch && yearMatch;
  });

  const featured = filteredHonors[activeIndex] || filteredHonors[0];

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 space-y-12 animate-pulse">
        <div className="h-10 w-64 bg-slate-100 rounded-lg" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="aspect-square bg-slate-50 rounded-[3rem]" />
          <div className="space-y-6 pt-12">
            <div className="h-4 w-32 bg-slate-100 rounded-md" />
            <div className="h-16 w-full bg-slate-100 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (honors.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-32 text-center space-y-8">
        <div className="p-8 bg-blue-50 w-fit mx-auto rounded-full text-blue-100">
          <Trophy size={80} strokeWidth={0.5} />
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tight">Employee of the Month</h2>
          <p className="text-slate-500 font-medium">The Division is currently selecting the next outstanding employee. Check back soon!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white min-h-screen">
      {/* Modernized Hero Section */}
      <section className="relative h-[400px] md:h-[500px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 text-white">
          <Image
            src="/images/newbuilding.webp"
            alt="SDO Imus Building"
            fill
            className="object-cover object-center brightness-[0.35]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#032977] via-transparent to-transparent opacity-80" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-blue-300 uppercase bg-blue-950/40 backdrop-blur-md rounded-full border border-blue-400/30">
            Employee of the Month
          </span>
          <h1 className="text-4xl md:text-7xl font-black text-white tracking-tight leading-[1.1] mb-6 drop-shadow-2xl uppercase">
            Employee <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              of the Month
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-200 leading-relaxed max-w-2xl mx-auto drop-shadow-lg font-medium">
            Celebrating the exceptional dedication and commitment of SDO Imus City personnel.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

          {/* Main Featured Content (Left Side - spans 6) */}
          <div className="lg:col-span-6 space-y-12">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-50 rounded-full -z-10 blur-3xl opacity-50" />

              {featured ? (
                <article className="space-y-10 text-center lg:text-left">
                  {/* Photo & Badge */}
                  <div className="relative group mx-auto lg:mx-0 max-w-md">
                    <div className="aspect-[4/5] relative rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white group-hover:rotate-1 transition-transform duration-700">
                      <Image
                        src={featured.image || "/images/leader-placeholder.webp"}
                        alt=""
                        fill
                        className="object-cover"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>

                  <div className="space-y-6 pt-6">
                    <div className="h-1.5 w-20 bg-blue-600 mx-auto lg:mx-0" />
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em]">
                        {featured.month} {featured.year} Honoree
                      </p>
                      <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter">
                        {featured.name}
                      </h2>
                    </div>
                    <p className="text-slate-500 font-medium leading-relaxed max-w-xs mx-auto lg:mx-0">
                      Recognized for exceptional dedication and outstanding contributions to the SDO Imus City community.
                    </p>
                  </div>
                </article>
              ) : (
                <div className="aspect-[4/5] bg-slate-50 rounded-[3rem] flex items-center justify-center text-slate-300">
                  <p className="font-bold uppercase tracking-widest text-xs">No Match Found</p>
                </div>
              )}
            </div>
          </div>

          {/* Hall of History (Right Side - spans 6) */}
          <div className="lg:col-span-6 space-y-12">
            <div className="space-y-8 border-b border-slate-100 pb-10">
              <div className="space-y-4 text-center lg:text-left">
                <div className="inline-flex items-center gap-3 text-blue-600">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-100">
                    <Sparkles size={20} />
                  </div>
                  <h3 className="text-xl font-black uppercase tracking-tight">Recognition Archive</h3>
                </div>
                <p className="text-slate-500 font-medium text-sm">
                  Explore our visual directory of educators and staff recognized for their outstanding commitment.
                </p>
              </div>

              {/* FILTER CONTROLS */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Filter Month</label>
                  <select
                    value={selectedMonth}
                    onChange={(e) => { setSelectedMonth(e.target.value); setActiveIndex(0); }}
                    className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs font-black uppercase tracking-widest outline-none focus:ring-2 focus:ring-blue-600/20 transition-all appearance-none cursor-pointer"
                  >
                    {availableMonths.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div className="flex-1 space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Filter Year</label>
                  <select
                    value={selectedYear}
                    onChange={(e) => { setSelectedYear(e.target.value); setActiveIndex(0); }}
                    className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs font-black uppercase tracking-widest outline-none focus:ring-2 focus:ring-blue-600/20 transition-all appearance-none cursor-pointer"
                  >
                    {availableYears.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Grid of Past Winners */}
            {filteredHonors.length === 0 ? (
              <div className="py-20 text-center space-y-4 bg-slate-50 rounded-[2rem] border border-slate-100">
                <p className="text-slate-400 text-xs font-black uppercase tracking-widest">No matching honorees</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                {filteredHonors.map((h, idx) => (
                  <button
                    key={h.id}
                    onClick={() => {
                      setActiveIndex(idx);
                    }}
                    className={`group relative aspect-[3/4] rounded-2xl overflow-hidden border-4 transition-all duration-300 ${idx === activeIndex
                      ? "border-blue-600 shadow-xl scale-95"
                      : "border-transparent hover:border-slate-200"
                      }`}
                  >
                    <Image
                      src={h.image || "/images/leader-placeholder.webp"}
                      alt=""
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-slate-900/90 to-transparent pt-10">
                      <p className="text-[10px] font-black text-white uppercase tracking-widest">{h.month}</p>
                      <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{h.year}</p>
                    </div>
                    {idx === activeIndex && (
                      <div className="absolute top-3 right-3 p-1.5 bg-blue-600 text-white rounded-full shadow-lg">
                        <Award size={12} />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
