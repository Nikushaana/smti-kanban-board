import { QueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { InquiryPhase } from "../../../../types";

export async function updateInquiryPhase(
  inquiryId: string,
  phase: InquiryPhase,
  queryClient: QueryClient,
  closeModal?: () => void
) {
  try {
    const res = await fetch(`/api/inquiries/${inquiryId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phase }),
    });

    if (!res.ok) {
      toast.error("Failed to update inquiry");
      return;
    }

    // Invalidate Kanban query so UI refetches data
    queryClient.invalidateQueries({ queryKey: ["kanban"] });

    toast.success("Phase updated successfully");

    // Close modal if provided
    closeModal?.();
  } catch (err) {
    toast.error("Error updating inquiry");
  }
}
