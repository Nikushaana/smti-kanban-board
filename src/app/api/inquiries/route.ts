import { NextRequest, NextResponse } from "next/server"; 
import { kanbanStore } from "@/store/kanbanStore";

function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function GET(req: NextRequest) {
    await delay(500); // simulate 500ms network delay

    const url = new URL(req.url);
    const clientName = url.searchParams.get("clientName") || "";
    const minValue = Number(url.searchParams.get("minValue") || 0);
    const startDate = url.searchParams.get("startDate");
    const endDate = url.searchParams.get("endDate");

    // Filter inquiries inside each phase
    const filteredPhases = kanbanStore.map((phase) => {
        const filteredInquiries = phase.inquiries.filter((inq) => {
            const matchesClientName =
                !clientName ||
                inq.clientName.toLowerCase().includes(clientName.toLowerCase());

            const matchesMinValue = !minValue || inq.potentialValue >= minValue;

            const matchesDate =
                !startDate ||
                !endDate ||
                (new Date(inq.eventDate) >= new Date(startDate) &&
                    new Date(inq.eventDate) <= new Date(endDate));

            return matchesClientName && matchesMinValue && matchesDate;
        });

        return { ...phase, inquiries: filteredInquiries };
    });

    return NextResponse.json(filteredPhases);
}
