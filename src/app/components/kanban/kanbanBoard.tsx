"use client";

import { useSearchParams } from "next/navigation";
import SkeletonLoader from "./skeletonLoader";
import PhaseColumn from "./phaseColumn";
import { fetchInquiries } from "@/app/lib/api/inquiries";
import { useQuery } from "@tanstack/react-query";
import { KanbanPhase } from "../../../../types";

export default function KanbanBoard() {
  const searchParams = useSearchParams();

  // Get filter values from URL
  const clientName = searchParams.get("clientName")?.toLowerCase() || "";
  const minValue = Number(searchParams.get("minValue") || 0);
  const startDate = searchParams.get("startDate") || "";
  const endDate = searchParams.get("endDate") || "";

  // fetch all phases
  const {
    data: phases,
    isLoading,
    isError,
    error,
  } = useQuery<KanbanPhase[]>({
    queryKey: ["kanban", clientName, minValue, startDate, endDate],
    queryFn: () => fetchInquiries({ clientName, minValue, startDate, endDate }),
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 10,
  });

  if (isError) {
    return (
      <div className="flex items-center justify-center h-full text-red-600">
        {(error as Error).message || "Failed to load inquiries"}
      </div>
    );
  }

  return (
    <div className="w-full flex-1 pb-3 overflow-x-auto showXScroll">
      <div className="grid grid-cols-4 gap-4 min-w-325 h-full">
        {isLoading ? (
          <SkeletonLoader />
        ) : (
          phases?.map((phase) => <PhaseColumn key={phase.id} phase={phase} />)
        )}
      </div>
    </div>
  );
}
