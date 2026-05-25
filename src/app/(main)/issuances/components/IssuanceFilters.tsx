import React from "react";
import { Search, Filter, ArrowUpDown } from "lucide-react";

type SortOption = "newest" | "oldest" | "number-desc" | "number-asc";

interface IssuanceFiltersProps {
  searchTerm: string;
  onSearchChange: (val: string) => void;
  sortOrder: SortOption;
  onSortOrderChange: (val: SortOption) => void;
  categoryLabel: string;
  resultsCount: number;
}

export function IssuanceFilters({
  searchTerm,
  onSearchChange,
  sortOrder,
  onSortOrderChange,
  categoryLabel,
  resultsCount
}: IssuanceFiltersProps) {
  return (
    <div className="w-full space-y-8">
      {/* Search Input */}
      <div className="relative group max-w-3xl mx-auto -mt-32 z-30">
        <div className="absolute inset-y-0 left-6 flex items-center text-slate-400 group-focus-within:text-blue-400 transition-colors">
          <Search size={24} />
        </div>
        <input 
          type="text" 
          placeholder="Search by Keyword, Title, or Document Number..."
          className="w-full pl-16 pr-8 py-8 bg-white rounded-3xl text-slate-900 placeholder:text-slate-400 font-bold shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 text-lg transition-all"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {/* Controls Bar */}
      <div className="max-w-5xl mx-auto px-6 relative z-20">
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 border border-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 text-slate-500 w-full md:w-auto">
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-blue-600" />
              <span className="text-[10px] font-black uppercase tracking-widest">{categoryLabel} Filter:</span>
            </div>
            <div className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase shadow-sm ${searchTerm ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
              {searchTerm ? "Filtered View" : "All Records"}
            </div>
            
            <div className="h-4 w-px bg-slate-200 hidden sm:block mx-1" />

            <div className="flex items-center gap-2">
              <ArrowUpDown size={16} className="text-blue-600" />
              <span className="text-[10px] font-black uppercase tracking-widest">Sort by:</span>
              <select 
                value={sortOrder}
                onChange={(e) => onSortOrderChange(e.target.value as SortOption)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/10 cursor-pointer hover:bg-slate-100 transition-colors"
              >
                <option value="newest">Latest Series (Default)</option>
                <option value="oldest">Oldest Series</option>
                <option value="number-desc">Memo # (High-Low)</option>
                <option value="number-asc">Memo # (Low-High)</option>
              </select>
            </div>
          </div>

          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 shadow-inner">
            {resultsCount} Documents Found
          </p>
        </div>
      </div>
    </div>
  );
}
