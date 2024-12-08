import { Project, useProject } from "@mdlr-reviewer/project";
import { useEffect, useState } from "react";
import { NotesPanel, Panel, SplitPane } from "@mdlr-reviewer/ui-kit";
import { supabase } from "../supabase/supabase-client";

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
      content: "Great progress on the project so far!",
      author_id: "1",
      author_username: "John Doe",
      created_at: "2023-10-01",
    },
    {
      id: "2",
      content:
        "We need to address the budget concerns raised in the last meeting.",
      author_id: "2",
      author_username: "Jane Smith",
      created_at: "2023-10-02",
    },
    {
      id: "3",
      content: "The new technology stack looks promising.",
      author_id: "3",
      author_username: "Alice Johnson",
      created_at: "2023-10-03",
    },
    {
      id: "4",
      content: "Can we schedule a follow-up meeting next week?",
      author_id: "4",
      author_username: "Bob Brown",
      created_at: "2023-10-04",
    },
    {
      id: "5",
      content: "The design phase is almost complete.",
      author_id: "5",
      author_username: "Charlie Davis",
      created_at: "2023-10-05",
    },
    {
      id: "6",
      content: "We should consider alternative suppliers for materials.",
      author_id: "6",
      author_username: "Diana Evans",
      created_at: "2023-10-06",
    },
    {
      id: "7",
      content: "The client has requested some changes to the initial plan.",
      author_id: "7",
      author_username: "Evan Foster",
      created_at: "2023-10-07",
    },
    {
      id: "8",
      content: "Let's review the project risks in the next meeting.",
      author_id: "8",
      author_username: "Fiona Green",
      created_at: "2023-10-08",
    },
    {
      id: "9",
      content: "The prototype is ready for testing.",
      author_id: "9",
      author_username: "George Harris",
      created_at: "2023-10-09",
    },
    {
      id: "10",
      content: "We need to finalize the project documentation.",
      author_id: "10",
      author_username: "Hannah Irving",
      created_at: "2023-10-10",
    },
    {
      id: "11",
      content: "The client is happy with the current progress.",
      author_id: "11",
      author_username: "Ian Jackson",
      created_at: "2023-10-11",
    },
    {
      id: "12",
      content: "We should prepare a demo for the stakeholders.",
      author_id: "12",
      author_username: "Jackie King",
      created_at: "2023-10-12",
    },
    {
      id: "13",
      content: "The testing phase is going smoothly.",
      author_id: "13",
      author_username: "Karen Lee",
      created_at: "2023-10-13",
    },
    {
      id: "14",
      content: "We need to address some bugs found during testing.",
      author_id: "14",
      author_username: "Larry Moore",
      created_at: "2023-10-14",
    },
    {
      id: "15",
      content: "The project is on track for the next milestone.",
      author_id: "15",
      author_username: "Mona Nelson",
      created_at: "2023-10-15",
    },
    {
      id: "16",
      content: "We should start planning the deployment phase.",
      author_id: "16",
      author_username: "Nina Owens",
      created_at: "2023-10-16",
    },
    {
      id: "17",
      content: "The client has approved the latest changes.",
      author_id: "17",
      author_username: "Oscar Perez",
      created_at: "2023-10-17",
    },
    {
      id: "18",
      content: "We need to update the project timeline.",
      author_id: "18",
      author_username: "Paula Quinn",
      created_at: "2023-10-18",
    },
    {
      id: "19",
      content: "The team is doing a fantastic job.",
      author_id: "19",
      author_username: "Quincy Roberts",
      created_at: "2023-10-19",
    },
    {
      id: "20",
      content: "Let's celebrate the completion of this phase.",
      author_id: "20",
      author_username: "Rachel Smith",
      created_at: "2023-10-20",
    },
  ];

  useEffect(() => {
    project.addNotes(dummyNotes);
  }, []);

  const { notes, summaries } = useProject(project);

  console.log("project", project);

  return (
    <SplitPane fullscreen>
      <Panel project={project} />
      <NotesPanel project={project} />
    </SplitPane>
  );
};

export default ProjectTest;
