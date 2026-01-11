import { Suspense } from "react";
import KanbanBoard from "./components/kanban/kanbanBoard";
import KanbanFilter from "./components/kanban/kanbanFilter";

export default function Home() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div className="w-full min-h-screen h-full flex flex-col gap-y-5 pt-10 pb-7 px-5 lg:px-10 ">
        <KanbanFilter />
        <KanbanBoard />
      </div>
    </Suspense>
  );
}
