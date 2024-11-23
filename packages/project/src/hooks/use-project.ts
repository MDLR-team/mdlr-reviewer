import { useEffect, useState } from "react";
import {
  ProjectService,
  Project,
} from "../services/project-service/project-service";

export function useProject(projectService: ProjectService) {
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    const subscription = projectService.projectObservable.subscribe(setProject);
    return () => subscription.unsubscribe();
  }, [projectService]);

  return {
    project,
    setProject: projectService.setProject.bind(projectService),
  };
}
