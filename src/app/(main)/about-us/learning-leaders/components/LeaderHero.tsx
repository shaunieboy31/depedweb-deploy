import React from "react";
import Image from "next/image";

export function LeaderHero() {
  return (
    <section className="relative h-[400px] md:h-[500px] w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/newbuilding.webp"
          alt="SDO Imus Building"
          fill
          className="object-cover object-center brightness-[0.4]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#032977] via-transparent to-transparent opacity-60" />
      </div>
      
      <div className="relative z-10 text-center px-6 max-w-4xl animate-in fade-in slide-in-from-bottom-10 duration-1000">
        <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-blue-300 uppercase bg-blue-950/40 backdrop-blur-md rounded-full border border-blue-400/30">
          Institutional Archive
        </span>
        <h1 className="text-4xl md:text-7xl font-black text-white tracking-tight leading-[1.1] mb-6 drop-shadow-2xl">
          Learning <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
            Leaders & Visionaries
          </span>
        </h1>
        <p className="text-lg md:text-xl text-slate-200 leading-relaxed max-w-2xl mx-auto drop-shadow-lg font-medium">
          Meet the architects of excellence who shaped the Schools Division Office of Imus City.
        </p>
      </div>
    </section>
  );
}
