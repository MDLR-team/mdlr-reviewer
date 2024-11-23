import { BehaviorSubject } from "rxjs";

export class ProjectService {
  private project$ = new BehaviorSubject<Project | null>(null);
  public readonly projectObservable = this.project$.asObservable();

  constructor() {}

  public dispose() {}
}

export interface Project {
  id: string;
  name: string;
}
