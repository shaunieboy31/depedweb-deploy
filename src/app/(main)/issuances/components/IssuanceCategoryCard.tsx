import React from "react";
import Link from "next/link";
import { ArrowRight, LucideIcon } from "lucide-react";

interface IssuanceCategoryCardProps {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  colorClass: string;
  shadowClass: string;
}

export function IssuanceCategoryCard({ 
  title, 
  description, 
  href, 
  icon: Icon, 
  colorClass, 
  shadowClass 
}: IssuanceCategoryCardProps) {
  return (
    <Link href={href} className="group h-full">
      <div className="bg-white rounded-[3rem] p-10 h-full border border-slate-200 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col items-center text-center space-y-6">
        <div className={`w-24 h-24 ${colorClass} rounded-[2.5rem] flex items-center justify-center text-white shadow-xl ${shadowClass} group-hover:scale-110 transition-transform`}>
          <Icon size={48} />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">{title}</h3>
          <p className="text-slate-500 font-medium text-sm leading-relaxed">{description}</p>
        </div>
        <div className={`pt-4 flex items-center gap-2 font-black text-[10px] uppercase tracking-widest ${colorClass.replace('bg-', 'text-')}`}>
          <span>Open Archive</span>
          <ArrowRight size={14} />
        </div>
      </div>
    </Link>
  );
}
