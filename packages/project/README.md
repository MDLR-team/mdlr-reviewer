# @mdlr-reviewer/project

**MDLR** is a lightweight, AI-powered framework for managing **notes**, **comments**, and **summaries** in a structured, extensible way. Designed for simplicity and collaboration, it allows teams to turn scattered information into actionable insights.

## 🔥 What is MDLR?

MDLR provides a **project-driven architecture** that works seamlessly across frontend and backend. The core functionality revolves around:

- **Organizing Notes**: Collect and manage comments, notes, or feedback.
- **Generating AI Summaries**: Use AI services like OpenAI to analyze notes and provide concise summaries.
- **Supabase Integration**: Connect effortlessly to Supabase for persistence and scalability.
- **Customizable Backend**: MDLR allows you to offload AI generation and persistence logic to a backend, ensuring security and scalability.

The `@mdlr-reviewer/project` package is the **brain** of the MDLR framework. It provides services for managing projects, notes, and summaries, making it easy for developers to plug and play.

---

## 🚀 Key Features

- **Project Management**: Centralized entity for managing projects with metadata.
- **Notes Service**: Add, update, and retrieve notes seamlessly.
- **AI Summary Generation**: Integrate with backend APIs to generate summaries for notes.
- **Supabase Support**: Store notes and summaries in a Supabase database.
- **Backend Integration**: Offload heavy operations (e.g., AI generation) to backend endpoints.

---

## 🔧 Installation

Install with your preferred package manager:

```bash
npm install @mdlr-reviewer/project
# or
yarn add @mdlr-reviewer/project
# or
pnpm add @mdlr-reviewer/project
```

## 📄 Basic Usage Example

1. Initialize Project and Supabase Client

```bash
import { Project } from "@mdlr-reviewer/project";
import { createClient } from "@supabase/supabase-js";

// Supabase client
const supabase = createClient("YOUR_SUPABASE_URL", "YOUR_SUPABASE_ANON_KEY");

// Initialize Project
const project = new Project("project-123", {
  supabase: { client: supabase },
  apiEndpoint: "/api/generate-summary",
});

// Add initial notes
project.addNotes([
  { id: "1", content: "Review management tasks", author_id: 1, author_username: "John Doe", created_at: "2023-10-01" },
  { id: "2", content: "Update timelines for Site A", author_id: 2, author_username: "Jane Smith", created_at: "2023-10-01" },
]);

console.log("Notes:", project.getNotes());
```

## 🌟 Features in Action
1. **Notes Management**
 - Add and manage notes with ease.
 - Subscribe to real-time updates.

2. **Summary Generation**
 - Integrate with a backend endpoint to summarize notes.

3. **Supabase Integration**
 - Seamlessly persist notes and summaries in Supabase.

## 🛠️ Explore Full Framework
For a complete frontend experience, including ready-to-use UI components, explore the `@mdlr-reviewer/ui-kit` package.

[👉 MDLR Full Framework on GitHub](https://github.com/MDLR-team/mdlr-reviewer)