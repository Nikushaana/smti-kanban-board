import { NextRequest, NextResponse } from "next/server";
import { InquiryPhase } from "../../../../../types";
import { kanbanStore } from "@/store/kanbanStore";

function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await delay(500); // simulate 500ms network delay

  const { id } = await params;
  const body = await req.json();
  const { phase } = body;

  const validPhases: InquiryPhase[] = ["new","sent_to_hotels","offers_received","completed"];
  if (!phase || !validPhases.includes(phase)) {
    return NextResponse.json({ error: "Invalid phase" }, { status: 400 });
  }

  let found = false;

  // Find inquiry in current column
  for (const column of kanbanStore) {
    const inquiryIndex = column.inquiries.findIndex(i => i.id === id);
    if (inquiryIndex > -1) {
      const inquiry = column.inquiries[inquiryIndex];

      if (inquiry.phase !== phase) {
        // Remove from old column
        column.inquiries.splice(inquiryIndex, 1);

        // Add to new column
        const targetColumn = kanbanStore.find(column => {
          if (phase === "new") return column.name === "New";
          if (phase === "sent_to_hotels") return column.name === "Sent to Hotels";
          if (phase === "offers_received") return column.name === "Offers Received";
          if (phase === "completed") return column.name === "Completed";
          return false;
        });

        if (targetColumn) {
          inquiry.phase = phase as InquiryPhase;
          targetColumn.inquiries.push(inquiry);
        }
      }

      found = true;
      break;
    }
  }

  if (!found) return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });

  return NextResponse.json({ message: "Phase updated successfully" }, { status: 200 });
}
