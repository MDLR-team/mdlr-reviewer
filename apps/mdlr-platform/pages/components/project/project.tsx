import { Project, useProject } from "@mdlr-reviewer/project";
import { useState } from "react";

const ProjectTest = () => {
  const [projectService] = useState(() => new Project("2121"));

  const { notes, summaries } = useProject(projectService);

  console.log(projectService);
  console.log(notes);
  console.log(summaries);

  return <></>;
};

export default ProjectTest;
