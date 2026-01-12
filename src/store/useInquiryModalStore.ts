import { create } from "zustand";
import { Inquiry } from "../../types";

interface InquiryModalState {
  isOpen: boolean;
  inquiry: Inquiry | null;

  openModal: (inquiry: Inquiry) => void;
  closeModal: () => void;
}

export const useInquiryModalStore = create<InquiryModalState>((set) => ({
  isOpen: false,
  inquiry: null,

  openModal: (inquiry) =>
    set({
      isOpen: true,
      inquiry,
    }),

  closeModal: () =>
    set({
      isOpen: false,
      inquiry: null,
    }),
}));
