import React from "react";
import { ShieldCheck } from "lucide-react";

export function QualityPolicy() {
  return (
    <div className="space-y-10 border-l-4 border-[#191970] pl-12">
      <div className="space-y-6">
        <div className="flex items-center gap-4 text-[#191970]">
          <ShieldCheck size={32} />
          <h3 className="text-2xl font-black uppercase tracking-tight">DepEd Quality Policy Statement (QPS)</h3>
        </div>
        <p className="text-slate-700 leading-relaxed font-bold text-lg italic">
          "The Department of Education is committed to provide learners with quality basic education 
          that is accessible, inclusive, liberating through:"
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-slate-600 font-medium">
        {[
          "Proactive leadership",
          "Shared governance",
          "Evidenced-based policies, standards and programs",
          "Responsive and relevant curricula",
          "Highly competent and committed personnel",
          "An enabling learning environment"
        ].map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="h-1.5 w-1.5 rounded-full bg-[#191970]" />
            <p>{item}</p>
          </div>
        ))}
      </div>

      <p className="text-slate-600 leading-relaxed font-medium text-sm pt-4">
        The Department upholds the highest standards of conduct and performance to fulfill 
        stakeholders’ needs and expectations by adhering to constitutional mandates and 
        sustaining client satisfaction through continuous improvement.
      </p>
    </div>
  );
}
