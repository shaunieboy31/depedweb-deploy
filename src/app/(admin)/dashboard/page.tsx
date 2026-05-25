import { getSession } from "@/controllers/auth";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";
import React, { Suspense } from "react";
import { RefreshCcw } from "lucide-react";

export default async function AdminDashboardPage() {
  const session = await getSession();

  // Protect the route
  if (!session) {
    redirect("/login");
  }

  return (
    <Suspense fallback={
       <div className="w-full h-screen flex items-center justify-center bg-slate-50 rounded-[3rem]">
          <RefreshCcw className="animate-spin text-blue-600" size={40} />
       </div>
    }>
       <DashboardClient user={session} />
    </Suspense>
  );
}
