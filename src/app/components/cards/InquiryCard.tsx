"use client";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Inquiry } from "../../../../types";
import { useInquiryModalStore } from "@/store/useInquiryModalStore";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

dayjs.extend(relativeTime);

export default function InquiryCard({ inq }: { inq: Inquiry }) {
  const { attributes, listeners, setNodeRef, transform  } = useDraggable({
    id: inq.id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  const openModal = useInquiryModalStore((s) => s.openModal);

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={() => openModal(inq)}
      className={`bg-white flex flex-col gap-y-4 px-3 py-4 mx-1 rounded-lg shadow-md border-2 hover:bg-gray-300 duration-200 cursor-pointer ${
        inq.potentialValue > 50000
          ? "border-yellow-300"
          : "border-white hover:border-gray-300"
      }`}
    >
      <div className="flex justify-between">
        <p className="font-bold">{inq.clientName}</p>
        <p className="text-sm">{dayjs(inq.eventDate).fromNow()}</p>
      </div>
      <div className="flex justify-between text-sm">
        <p>{inq.guestCount} guests</p>
        <p className="bg-gray-300 text-gray-800 px-3 rounded-lg font-semibold">
          CHF {inq.potentialValue.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
