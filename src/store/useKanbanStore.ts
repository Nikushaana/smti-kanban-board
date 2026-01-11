import { create } from "zustand";
import { KanbanPhase } from "../../types";

interface KanbanState {
    phases: KanbanPhase[];

    // actions
    setPhases: (phases: KanbanPhase[]) => void;
}

export const useKanbanStore = create<KanbanState>((set) => ({
    phases: [],

    setPhases: (phases) => set({ phases }),
}));
