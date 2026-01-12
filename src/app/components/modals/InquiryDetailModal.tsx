"use client";

import { useInquiryModalStore } from "@/store/useInquiryModalStore";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { InquiryPhase } from "../../../../types";
import { useQueryClient } from "@tanstack/react-query";
import { updateInquiryPhase } from "@/app/lib/api/updateInquiryPhase";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

dayjs.extend(relativeTime);

type Option = {
  value: InquiryPhase;
  label: string;
};

const options: Option[] = [
  { value: "new", label: "New" },
  { value: "sent_to_hotels", label: "Sent to Hotels" },
  { value: "offers_received", label: "Offers Received" },
  { value: "completed", label: "Completed" },
];

export default function InquiryDetailModal() {
  const { isOpen, inquiry, closeModal } = useInquiryModalStore();
  const queryClient = useQueryClient();

  const showModal = isOpen && inquiry;

  const handlePhaseChange = async (phase: InquiryPhase) => {
    if (!inquiry) return;

    await updateInquiryPhase(inquiry.id, phase, queryClient, closeModal);
  };

  return (
    <div
      className={`fixed inset-0 flex duration-75 ${
        showModal ? "z-50 " : "-z-10 opacity-0 pointer-events-none"
      }`}
    >
      <div className="absolute inset-0 bg-black/40" onClick={closeModal} />

      {/* Side panel */}
      <div
        className={`relative ml-auto w-full sm:w-105 h-full bg-white shadow-xl p-5 duration-200 ${
          showModal ? "translate-x-0" : "translate-x-105"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg font-bold">{inquiry?.clientName}</h1>
          <p onClick={closeModal} className="hover:text-red-500 cursor-pointer">
            Close
          </p>
        </div>

        {/* Inquiry details */}
        <div className="flex flex-col gap-y-2 text-sm">
          <p>
            <span className="font-bold">Contact:</span> {inquiry?.contactPerson}
          </p>
          <p>
            <span className="font-bold">Event type:</span> {inquiry?.eventType}
          </p>
          <p>
            <span className="font-bold">Event date:</span>{" "}
            {dayjs(inquiry?.eventDate).format("DD MMM YYYY, HH:mm")}
          </p>
          <p>
            <span className="font-bold">Guests:</span> {inquiry?.guestCount}
          </p>
          <p>
            <span className="font-bold">Potential value:</span> CHF{" "}
            {inquiry?.potentialValue.toLocaleString()}
          </p>
        </div>

        {/* Phase selector */}
        <div className="mt-4 flex flex-col gap-y-1">
          <label className="text-sm font-semibold">Phase</label>
          <Select
            value={inquiry?.phase}
            onValueChange={(value) => handlePhaseChange(value as InquiryPhase)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select phase" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="sent_to_hotels">Sent to Hotels</SelectItem>
              <SelectItem value="offers_received">Offers Received</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Hotels */}
        <div className="mt-4 flex flex-col gap-y-2">
          <h3 className="font-semibold">Hotels</h3>
          <ul className="list-disc list-inside text-sm">
            {inquiry?.hotels.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </div>

        {/* Notes */}
        <div className="mt-4 flex flex-col gap-y-2">
          <h3 className="font-semibold">Notes</h3>
          <p className="text-sm text-gray-700">{inquiry?.notes || "---"}</p>
        </div>

        {/* Footer timestamps */}
        <div className="mt-6 text-xs text-gray-500">
          <p>
            Created: {dayjs(inquiry?.createdAt).format("DD MMM YYYY HH:mm")}
          </p>
          <p>Updated: {dayjs(inquiry?.updatedAt).fromNow()}</p>
        </div>
      </div>
    </div>
  );
}
