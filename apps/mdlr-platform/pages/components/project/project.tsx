import { Project, useProject } from "@mdlr-reviewer/project";
import { useState } from "react";
import { Panel } from "@mdlr-reviewer/ui-kit";
import { supabase as supabaseClient } from "../supabase/supabase-client";

const ProjectTest = () => {
  const [project] = useState(
    () =>
      new Project("2121", {
        metadata: {
          title: "Test Project",
          description: "This is a test project",
        },
        supabaseClient,
        chatGptConfig: {
          apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY!,
          apiSecret: process.env.NEXT_PUBLIC_OPENAI_API_SECRET!,
        },
      })
  );

  const { notes, summaries } = useProject(project);

  return <Panel project={project} />;
};

export default ProjectTest;
