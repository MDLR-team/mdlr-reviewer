# **MDLR Framework**

**MDLR** is an open-source framework designed to transform unstructured feedback—notes, comments, and ideas—into **real-time, actionable insights**. Whether you're organizing **personal notes** or managing feedback for **collaborative projects**, MDLR adapts to your workflows, making sense of the chaos.

---

## **Features**

- **Real-Time Summaries**: Generate actionable insights on-demand with prompts like _“Summarize feedback on Task A”_ or _“What recurring themes are in my notes?”_.
- **Works Anywhere**: Integrates seamlessly with 2D/3D canvases, brainstorming boards, or project management-like workflows.
- **Project Organization**: Group notes and comments into project-based buckets with built-in collaboration and Supabase support.
- **Modular Packages**: Lightweight, reusable components for project management, UI visualization, and summarization.

---

## **Packages**

1. **Project Package** (`@mdlr/project`)  
   Manages project buckets, integrates with **Supabase**, and supports summary generation.

2. **UI-Kit Package** (`@mdlr/ui-kit`)  
   Includes components for notes, comments, and summaries.

---

## **Getting Started**

### **Installation**

Install MDLR's core packages:

```bash
npm install @mdlr/project @mdlr/ui-kit
```

---

## Setup Example

Below is an example of setting up **MDLR** in a **Next.js/React** app.

### a. Supabase Initialization
Ensure you create a **Supabase** table for summaries named `summaries` with the following schema:

| **Column**    | **Type**     | **Notes**                  |
|---------------|--------------|----------------------------|
| `id`         | `int8`     | Primary Key                |
| `project_id` | `uuid`       | References Project ID      |
| `prompt`| `text`       | User-provided prompt       |
| `title`    | `text`       | AI-generated title       |
| `content`    | `text`       | AI-generated summary       |
| `created_at` | `timestamp`  | Default: `now()`           |
| `updated_at` | `timestamp`  | Optional, for updates      |

### b. Integrate MDLR with Supabase and the Summary API
```typescript
import React from "react";
import { Project } from "@mdlr/project";
import { Panel, NotesPanel, Layout } from "@mdlr/ui-kit";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

// Initialize Project with API endpoint
const project = new Project("project-123", {
  supabase: { client: supabase },
  summaryEndpoint: "/api/generate-summary", // Backend endpoint for summaries
});

// Add initial notes
project.addNotes([
  { id: "1", content: "Review management tasks", author_id: 1, author_username: "John Doe", created_at: "2023-10-01" },
  { id: "2", content: "Update timelines for Site A", author_id: 2, author_username: "Jane Smith", created_at: "2023-10-01" },
]);

// App Component
const App = () => (
  <Layout>
    <Panel project={project} />
    <NotesPanel project={project} />
  </Layout>
);

export default App;
```

---

## API Setup for Summaries

To enable the **summary generation** feature, create an API endpoint in your Next.js app:

```typescript
// pages/api/generate-summary.ts
import { NextApiRequest, NextApiResponse } from "next";
import { GenResultService } from "@mdlr/project";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { notes } = req.body;

  const genResultService = new GenResultService({
    apiKey: process.env.CHATGPT_API_KEY || "", // Replace with your OpenAI key
  });

  try {
    const summary = await genResultService.generateSummary(notes);
    res.status(200).json({ summary });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
```

---

## **Use Cases**

### **Personal Notes**

Use MDLR to organize and generate summaries from scattered, unstructured thoughts.  
For example:

> _“What are the recurring themes in my journal this week?”_

### **Collaborative Work**

MDLR helps teams summarize feedback from design reviews, brainstorming boards, and project management workflows.  
Example prompt:

> _“Summarize unresolved comments about the electrical plan.”_

---

## **Full Documentation**
For a more detailed guide, visit the [MDLR Framework Documentation](https://www.mdlr.app/).