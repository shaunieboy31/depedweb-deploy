import React from "react";
import TransparencySealPageContent from "./TransparencySealPageContent";
import { getTransparencySealItems } from "@/services/transparency.service";

export default async function TransparencySealPage() {
  const result = await getTransparencySealItems();
  const items = result.success ? (result.data || []) : [];

  return <TransparencySealPageContent items={items} />;
}
