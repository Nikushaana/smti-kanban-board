import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default function Home() {
  const data = [
    {
      id: 1,
      name: "New",
      inquiries: [
        {
          id: "INQ-2026-0034",
          clientName: "Novartis AG",
          contactPerson: "Anna Mueller",
          eventType: "Conference",
          eventDate: "2026-03-15",
          guestCount: 120,
          potentialValue: 48500,
          phase: "new",
          hotels: ["Grand Hotel Zurich", "Hotel Schweizerhof"],
          notes: "Client prefers city center location",
          createdAt: "2026-01-10T09:00:00Z",
          updatedAt: "2026-01-12T14:30:00Z",
        },
        {
          id: "INQ-2026-0035",
          clientName: "Roche AG",
          contactPerson: "John Smith",
          eventType: "Workshop",
          eventDate: "2026-04-20",
          guestCount: 50,
          potentialValue: 25000,
          phase: "new",
          hotels: ["Hotel Baur au Lac"],
          notes: "Needs projector and breakout rooms",
          createdAt: "2026-01-11T10:00:00Z",
          updatedAt: "2026-01-13T12:00:00Z",
        },
      ],
    },
    {
      id: 2,
      name: "Sent to Hotels",
      inquiries: [
        {
          id: "INQ-2026-0036",
          clientName: "Novartis AG",
          contactPerson: "Anna Mueller",
          eventType: "Seminar",
          eventDate: "2026-05-10",
          guestCount: 80,
          potentialValue: 52000,
          phase: "sent_to_hotels",
          hotels: ["Grand Hotel Zurich"],
          notes: "Prefers city center, high-value event",
          createdAt: "2026-01-12T09:30:00Z",
          updatedAt: "2026-01-14T15:00:00Z",
        },
      ],
    },
    {
      id: 3,
      name: "Offers Received",
      inquiries: [
        {
          id: "INQ-2026-0037",
          clientName: "Geberit AG",
          contactPerson: "Laura Klein",
          eventType: "Conference",
          eventDate: "2026-06-05",
          guestCount: 200,
          potentialValue: 78000,
          phase: "offers_received",
          hotels: ["Hotel Schweizerhof"],
          notes: "Requires AV equipment and catering",
          createdAt: "2026-01-13T11:00:00Z",
          updatedAt: "2026-01-15T14:30:00Z",
        },
      ],
    },
    {
      id: 4,
      name: "Completed",
      inquiries: [
        {
          id: "INQ-2026-0038",
          clientName: "Novartis AG",
          contactPerson: "Anna Mueller",
          eventType: "Workshop",
          eventDate: "2026-01-20",
          guestCount: 60,
          potentialValue: 30000,
          phase: "completed",
          hotels: ["Grand Hotel Zurich", "Hotel Schweizerhof"],
          notes: "Successfully held, client satisfied",
          createdAt: "2025-12-10T09:00:00Z",
          updatedAt: "2026-01-20T16:00:00Z",
        },
        {
          id: "INQ-2026-0039",
          clientName: "Roche AG",
          contactPerson: "John Smith",
          eventType: "Conference",
          eventDate: "2026-01-25",
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
  return (
      <div className="w-full h-screen overflow-x-auto showXScroll">
        <div className="py-10 px-5 lg:px-10 grid grid-cols-4 gap-4 min-w-325 h-full">
          {data.map((phase) => {
            // Calculate total potential value
            const totalValue = phase.inquiries.reduce(
              (sum, inquiry) => sum + inquiry.potentialValue,
              0
            );

            return (
              <div
                key={phase.id}
                className="bg-gray-100 px-1 py-5 rounded-[10px] flex flex-col gap-y-6 shadow-lg border
            border-gray-100 hover:shadow-md hover:border-gray-200 duration-200"
              >
                <div className="flex flex-col gap-2 px-4">
                  <h1 className="text-gray-600 font-bold">{phase.name}</h1>
                  <div className="flex justify-between text-sm">
                    <p className="bg-gray-200 text-gray-700 px-3 rounded-lg">
                      {phase.inquiries.length} Inqueries
                    </p>
                    <p className="bg-gray-300 text-gray-800 px-3 rounded-lg font-semibold">
                      Total CHF {totalValue.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-y-2 flex-1 overflow-y-auto showYScroll">
                  {phase.inquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className={`bg-white flex flex-col gap-y-4 px-3 py-4 mx-1 rounded-lg shadow-md border-2 hover:bg-gray-300 duration-200
                      ${
                        inq.potentialValue > 50000
                          ? "border-yellow-300"
                          : "border-white hover:border-gray-300"
                      }`}
                    >
                      <div className="flex justify-between">
                        <p className="font-bold">{inq.clientName}</p>
                        <p className="text-sm">
                          {dayjs(inq.eventDate).fromNow()}
                        </p>
                      </div>
                      <div className="flex justify-between text-sm">
                        <p>{inq.guestCount} guests</p>
                        <p className="bg-gray-300 text-gray-800 px-3 rounded-lg font-semibold">
                          CHF {inq.potentialValue.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
  );
}
