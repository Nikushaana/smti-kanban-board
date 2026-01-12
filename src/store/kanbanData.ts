import { KanbanPhase } from "../../types";

export const kanbanMockData: KanbanPhase[] = [
  {
    id: 1,
    name: "New",
    inquiries: [
      {
        id: "INQ-2026-0034",
        clientName: "Novartis AG",
        contactPerson: "Anna Mueller",
        eventType: "Conference",
        eventDate: "2026-03-15T09:30:00Z",
        guestCount: 120,
        potentialValue: 48500,
        phase: "new",
        hotels: ["Grand Hotel Zurich", "Hotel Schweizerhof"],
        notes: "Client prefers city center location",
        createdAt: "2026-01-10T09:30:00Z",
        updatedAt: "2026-01-12T14:30:00Z",
      },
    ],
  },
  {
    id: 2,
    name: "Sent to Hotels",
    inquiries: [],
  },
  {
    id: 3,
    name: "Offers Received",
    inquiries: [],
  },
  {
    id: 4,
    name: "Completed",
    inquiries: [
      {
        id: "INQ-2026-0039",
        clientName: "Roche AG",
        contactPerson: "John Smith",
        eventType: "Conference",
        eventDate: "2026-01-25T09:30:00Z",
        guestCount: 150,
        potentialValue: 60000,
        phase: "completed",
        hotels: ["Hotel Baur au Lac"],
        notes: "Event went smoothly",
        createdAt: "2025-12-12T10:00:00Z",
        updatedAt: "2026-01-25T17:00:00Z",
      },
    ],
  },
];
