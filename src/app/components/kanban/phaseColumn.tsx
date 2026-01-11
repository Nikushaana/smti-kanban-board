import { KanbanPhase } from "../../../../types";
import InquiryCard from "./InquiryCard";

export default function PhaseColumn({ phase }: { phase: KanbanPhase }) {
  // Calculate total potential value
  const totalValue = phase.inquiries.reduce(
    (sum, inquiry) => sum + inquiry.potentialValue,
    0
  );

  return (
    <div className="bg-gray-100 p-1 pb-5 rounded-[10px] flex flex-col gap-y-4 shadow-lg border border-gray-100 hover:shadow-2xl hover:border-gray-200 duration-200">
      <div className="flex flex-col gap-2 p-4 rounded-lg bg-gray-200">
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
