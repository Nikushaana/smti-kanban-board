"use client";

import { useSearchParams } from "next/navigation";
import PhaseColumn from "./phaseColumn";
import { fetchInquiries } from "@/app/lib/api/inquiries";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { InquiryPhase, KanbanPhase } from "../../../../types";
import SkeletonLoader from "../skeletonLoader/skeletonLoader";
import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { updateInquiryPhase } from "@/app/lib/api/updateInquiryPhase";

export default function KanbanBoard() {
  const searchParams = useSearchParams();

  // Get filter values from URL
  const clientName = searchParams.get("clientName")?.toLowerCase() || "";
  const minValue = Number(searchParams.get("minValue") || 0);
  const startDate = searchParams.get("startDate") || "";
  const endDate = searchParams.get("endDate") || "";

  // fetch filtered phases
  const {
    data: phasesData,
    isLoading,
    isError,
    error,
  } = useQuery<KanbanPhase[]>({
    queryKey: ["kanban", clientName, minValue, startDate, endDate],
    queryFn: () => fetchInquiries({ clientName, minValue, startDate, endDate }),
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 10,
  });

  const [phases, setPhases] = useState<KanbanPhase[]>([]);

  useEffect(() => {
    if (phasesData) {
      setPhases(phasesData);
    }
  }, [phasesData]);

  const queryClient = useQueryClient();

  // drag end drop
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const inquiryId = active.id as string;
    const targetPhaseName = over.id as String;
    const phase = targetPhaseName
      .toLowerCase()
      .split(" ")
      .join("_") as InquiryPhase;

    //update local
    setPhases((prev) => {
      let movedInquiry: any = null;

      const updated = prev.map((column) => {
        const index = column.inquiries.findIndex((i) => i.id === inquiryId);

        if (index > -1) {
          const inquiry = column.inquiries[index];

          // already in target phase do nothing
          if (inquiry.phase === phase) return column;

          movedInquiry = { ...inquiry, phase };

          return {
            ...column,
            inquiries: column.inquiries.filter((i) => i.id !== inquiryId),
          };
        }

        return column;
      });

      if (!movedInquiry) return prev;

      // add inquiry to target column
      return updated.map((column) =>
        column.name.toLowerCase().split(/\s+/).join("_") === phase
          ? { ...column, inquiries: [...column.inquiries, movedInquiry!] }
          : column
      );
    });

    // update with api
    await updateInquiryPhase(inquiryId, phase, queryClient);
  };

  // drag starts after moving 5px
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

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
          <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
            {phases?.map((phase) => (
              <PhaseColumn key={phase.id} phase={phase} />
            ))}
          </DndContext>
        )}
      </div>
    </div>
  );
}
