import { KanbanPhase } from "../../types";
import { kanbanMockData } from "./kanbanData";

// Make a deep copy of mock data
declare global {
    var __KANBAN_STORE: KanbanPhase[] | undefined;
}

export const kanbanStore: KanbanPhase[] =
    global.__KANBAN_STORE || JSON.parse(JSON.stringify(kanbanMockData));

if (!global.__KANBAN_STORE) {
    global.__KANBAN_STORE = kanbanStore;
}
