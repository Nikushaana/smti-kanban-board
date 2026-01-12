# SMTI Kanban Board

A drag-and-drop Kanban board built with **Next.js**, **TypeScript**, and **Tailwind CSS**.  
This project allows users to organize tasks into columns, move them freely between phases, and demonstrates a clean frontend architecture with modern state management.

---

### Setup instructions

# Clone the repository

git clone https://github.com/Nikushaana/smti-kanban-board.git

# Navigate into the project

cd smti-kanban-board

# Install dependencies

npm install

# Run the development server

npm run dev

# Open http://localhost:3000 in your browser to see the Kanban board

---

# Project Structure

smti-kanban-board/
│
├─ public/ # Static assets (fonts, images, icons)
│ └─ fonts/ # Fonts
│
├─ src/
│ └─ app/
│ ├─ api/ # backend apis
│ ├─ components/ # Reusable UI components (Draggable, Droppable, KanbanColumn)
│ ├─ lib/ # Front end shared fetch apis
│ ├─ favicon.ico
│ ├─ global.css
│ ├─ layout.tsx
│ ├─ page.tsx
│ └─ providers.tsx
│
│ ├─ components/ # Shad cn components
│ ├─ lib/ # Utility functions
│ ├─ store/ # Zustand state management store
│ └─ types/ # TypeScript types and interfaces
│
├─ .gitignore
├─ components.json
├─ DECISIONS.md
├─ eslint.config.mjs
├─ next-env.d.js
├─ next.config.js
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ README.md
├─ tsconfig.json
└─ types.d.ts

---

# Libraries Used

shadcn-ui – Component library for building accessible UI components.
@dnd-kit/core – Handles drag-and-drop functionality for Kanban cards.

zustand – Lightweight state management library.
@tanstack/react-query – Data fetching and caching library for React.

dayjs – Lightweight date library for formatting and relative times.
date-fns – Provides date manipulation utilities.

react-date-range – Date range picker component.

react-hot-toast – Toast notifications for React apps.
