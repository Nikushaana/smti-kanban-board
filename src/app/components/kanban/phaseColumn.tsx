import { KanbanPhase } from "../../../../types";
import InquiryCard from "../cards/InquiryCard";

const phaseColors: Record<string, { header: string; content: string }> = {
  New: { header: "bg-blue-200", content: "bg-blue-100" },
  "Sent to Hotels": { header: "bg-yellow-200", content: "bg-yellow-100" },
  "Offers Received": { header: "bg-red-200", content: "bg-red-100" },
  Completed: { header: "bg-green-200", content: "bg-green-100" },
};

export default function PhaseColumn({ phase }: { phase: KanbanPhase }) {
  // Calculate total potential value
  const totalValue = phase.inquiries.reduce(
    (sum, inquiry) => sum + inquiry.potentialValue,
    0
  );

  // Get colors for this phase
  const colors = phaseColors[phase.name] || {
    header: "bg-gray-200",
    content: "bg-gray-100",
  };

  return (
    <div
      className={`p-1 pb-5 rounded-[10px] flex flex-col gap-y-4 shadow-lg border border-gray-100 hover:shadow-2xl hover:border-gray-200 duration-200 ${colors.content}`}
    >
      <div className={`flex flex-col gap-2 p-4 rounded-lg ${colors.header}`}>
        <h1 className="text-gray-600 font-bold">{phase.name}</h1>
        <div className="flex justify-between text-sm">
          <p className="bg-gray-300 text-gray-700 px-3 rounded-lg">
            {phase.inquiries.length} Inqueries
          </p>
          <p className="bg-gray-300 text-gray-800 px-3 rounded-lg font-semibold">
            Total CHF {totalValue.toLocaleString()}
          </p>
        </div>
      </div>

      <hr className="border-gray-200" />

      <div className="flex flex-col gap-y-2 flex-1">
        {phase.inquiries.length > 0 ? (
          phase.inquiries.map((inq) => <InquiryCard key={inq.id} inq={inq} />)
        ) : (
          <p className="text-gray-500 text-center py-2">No inquiries</p>
        )}
      </div>
    </div>
  );
}
