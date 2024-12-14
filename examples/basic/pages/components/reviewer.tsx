import React from "react";
import { Project } from "@mdlr-reviewer/project";
import { Panel, NotesPanel, SplitPane } from "@mdlr-reviewer/ui-kit";
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
  { id: "1", content: "Review management tasks", author_id: "1", author_username: "John Doe", created_at: "2023-10-01" },
  { id: "2", content: "Update timelines for Site A", author_id: "2", author_username: "Jane Smith", created_at: "2023-10-01" },
]);

// App Component
const App = () => (
  <SplitPane>
    <Panel project={project} />
    <NotesPanel project={project} />
  </SplitPane>
);

export default App;