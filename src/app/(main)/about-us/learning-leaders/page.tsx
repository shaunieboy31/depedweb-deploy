import { getLeadersAction } from "@/controllers/leaders";
import LearningLeaders from "./LearningLeaders";

export const metadata = {
  title: "Learning Leaders | SDO Imus City",
  description: "Meet the architects of excellence who shaped the Schools Division Office of Imus City.",
};

export default async function LearningLeadersPage() {
  const result = await getLeadersAction();
  const leaders = result.success ? result.data : [];

  return <LearningLeaders initialLeaders={leaders} />;
}
