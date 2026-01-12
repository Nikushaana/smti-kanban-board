## 1. Drag-and-Drop Approach

**Chosen Library:** `@dnd-kit/core`

**Reason for choice:**
- Provides fine-grained control over draggable and droppable elements.
- Supports nested drag-and-drop if needed in the future.
- Lightweight and well-maintained compared to alternatives like `react-beautiful-dnd`.
- Easier integration with TypeScript and functional React components.

**Alternative considered:**
- `react-beautiful-dnd`: Very popular and easy to use for simple boards, but heavier and less flexible for nested structures or custom interactions.

---

## 2. State Management

**Chosen Library:** `zustand`

**Reason for choice:**
- Minimal boilerplate compared to Redux.
- Simple and reactive, works well for small-to-medium projects like this Kanban board.
- Reactive store that can be used across multiple components without prop drilling.

**Alternative considered:**
- Redux: Too heavy for this project’s scope. Zustand is faster to set up and simpler to use.

---

## 3. UX Decisions

- **Column layout:** Horizontal scrollable columns for better readability on small screens.
- **Card dragging:** Smooth animations using CSS transforms for a natural feel.
- **Feedback:** Hover and focus effects on cards to make drag-and-drop interactions clear.
- **Dropdowns:** Used shadcn-ui dropdown for task actions to keep UI clean and consistent.

---

## 4. What to improve

- **New Inquiries:** Add functionality for adding inquiries with react-hot-toast notifications for feedback.
- **Delete Inquiries:** Delete inquiries. 
- **New columns:** Add more columns.
- **Delete Columns:** Delete columns. 
- **New Filters:** Add more filter inputs (e.g., event type, Guests, Contact Name) to quickly find tasks.