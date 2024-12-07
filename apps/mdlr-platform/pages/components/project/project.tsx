import { Project, useProject } from "@mdlr-reviewer/project";
import { useEffect, useState } from "react";
import { NotesPanel, Panel } from "@mdlr-reviewer/ui-kit";
import { supabase } from "../supabase/supabase-client";
import { Box } from "@mui/material";
import styled from "styled-components";
import Split from "react-split";

const ProjectTest = () => {
  const newProject = "dbee9e2b-67ad-4baa-aa9d-6a4da7b6de2b";
  const existingProject = "9e8d7ffb-6522-4bc8-9b8c-3264f9f4f0cf";

  const [project] = useState(
    () =>
      new Project(existingProject, {
        supabase: {
          client: supabase,
        },
        summaryEndpoint: "/api/generate-summary",
      })
  );

  const dummyNotes = [
    {
      id: "1",
      content:
        "Discussed project timeline and milestones with the management team. Agreed on the initial deadlines and deliverables.",
      author_id: "1",
      author_username: "John Doe",
      created_at: "2023-10-01",
    },
    {
      id: "2",
      content:
        "Team meeting to brainstorm innovative solutions for the project. Focused on leveraging new technologies in the AEC sector.",
      author_id: "2",
      author_username: "Jane Smith",
      created_at: "2023-10-02",
    },
    {
      id: "3",
      content:
        "Budget review session with the finance department. Identified potential cost-saving measures and reallocated resources.",
      author_id: "3",
      author_username: "Alice Johnson",
      created_at: "2023-10-03",
    },
  ];

  useEffect(() => {
    project.addNotes(dummyNotes);
  }, []);

  const { notes, summaries } = useProject(project);

  console.log("project", project);

  return (
    <Wrapper>
      <Split
        sizes={[40, 60]}
        minSize={400}
        gutterSize={3}
        gutterAlign="center"
        direction="horizontal"
        style={{ display: "flex", width: "100%", height: "100%" }}
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
            padding: "20px",
          }}
        >
          <NotesPanel project={project} />
        </Box>
      </Split>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #f1f0ee;

  & .gutter.gutter-horizontal {
    background-color: rgba(0, 0, 0, 0.1);
    cursor: col-resize;

    &:hover {
      background-color: #ff4e00;
    }
  }
`;

export default ProjectTest;
