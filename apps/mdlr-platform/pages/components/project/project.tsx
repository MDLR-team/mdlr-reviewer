import { Project, useProject } from "@mdlr-reviewer/project";
import { useEffect, useState } from "react";
import { Panel } from "@mdlr-reviewer/ui-kit";
import { supabase as supabaseClient } from "../supabase/supabase-client";
import { Box } from "@mui/material";

const ProjectTest = () => {
  const newProject = "dbee9e2b-67ad-4baa-aa9d-6a4da7b6de2b";
  const existingProject = "9e8d7ffb-6522-4bc8-9b8c-3264f9f4f0cf";

  const [project] = useState(
    () =>
      new Project(existingProject, {
        metadata: {
          title: "Test Project",
          description: "This is a test project",
        },
        supabase: {
          client: supabaseClient,
        },
        chatGpt: {
          apiKey: process.env.NEXT_PUBLIC_OPENAI_API_SECRET!,
        },
      })
  );

  const dummyNotes = [
    {
      id: "1",
      content:
        "Discussed project timeline and milestones with the management team. Agreed on the initial deadlines and deliverables.",
      author: "John Doe",
      createdAt: "2023-10-01",
    },
    {
      id: "2",
      content:
        "Team meeting to brainstorm innovative solutions for the project. Focused on leveraging new technologies in the AEC sector.",
      author: "Jane Smith",
      createdAt: "2023-10-02",
    },
    {
      id: "3",
      content:
        "Budget review session with the finance department. Identified potential cost-saving measures and reallocated resources.",
      author: "Alice Johnson",
      createdAt: "2023-10-03",
    },
  ];

  useEffect(() => {
    project.addNotes(dummyNotes);
  }, []);

  const { notes, summaries } = useProject(project);

  console.log("project", project);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
      }}
    >
      <Box
        sx={{
          width: "100%",
        }}
      >
        <Panel project={project} />
      </Box>

      <Box
        sx={{
          width: "100%",
        }}
      >
        Content
      </Box>
    </Box>
  );
};

export default ProjectTest;
