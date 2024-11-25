import { Project, useProject } from "@mdlr-reviewer/project";
import { useState } from "react";
import { Panel } from "@mdlr-reviewer/ui-kit";

const ProjectTest = () => {
  const [project] = useState(
    () =>
      new Project("2121", {
        metadata: {
          title: "Test Project",
          description: "This is a test project",
        },
        supabaseClient,
        chatGpt: {
          apiKey: process.env.NEXT_PUBLIC_CHAT_GPT_API_KEY,
        },
      })
  );

  const { notes, summaries } = useProject(project);

  return <Panel project={project} />;
};

export default ProjectTest;
