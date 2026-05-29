"use client";

import { useAiRecommendation } from "@/modules/ai-recomendation/hooks/useAiRecommendation";
import { useCycles } from "@/modules/operations/hooks/cycle-hooks";
import { DashboardCycle } from "../../types/harvest";
import { CycleFailureContent } from "./CycleFailureContent";
import { CycleSummaryContent } from "./CycleSummaryContent";
import { DetailSkeleton } from "./DetailSkeleton";

interface DetailDropdownProps {
  cycleId: string;
  isFailed: boolean;
  cycleData: DashboardCycle;
}

export const DetailDropdown = ({
  cycleId,
  isFailed,
  cycleData,
}: DetailDropdownProps) => {
  const { useHistory } = useAiRecommendation({
    cycle_id: cycleId,
    type: "FAILURE_ANALYSIS",
  });
  const { data: aiHistory, isLoading: isAiLoadingHistory } = useHistory();

  const { cycleSummary, isLoading: isSummaryLoading } = useCycles(
    isFailed ? "" : cycleId,
  );

  if (isFailed) {
    if (isAiLoadingHistory) return <DetailSkeleton />;

    const failureAnalysis = Array.isArray(aiHistory) ? aiHistory[0] : aiHistory;

    return (
      <div className="border-t border-slate-100 bg-white px-6 py-8 animate-in fade-in slide-in-from-top-2 duration-500">
        <CycleFailureContent
          data={cycleData}
          aiResponse={failureAnalysis?.ai_response}
        />
      </div>
    );
  }

  if (!cycleSummary) return null;

  return (
    <div className="border-t border-slate-100 bg-white px-6 py-8 animate-in fade-in slide-in-from-top-2 duration-500">
      <CycleSummaryContent data={cycleSummary} />
    </div>
  );
};
