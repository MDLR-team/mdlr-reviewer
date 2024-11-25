import { ProjectService } from "../project-service/project-service";

class DBService {
  constructor(private projectService: ProjectService) {}

  public dispose() {}
}

export default DBService;
