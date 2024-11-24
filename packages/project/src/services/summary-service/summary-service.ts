import { BehaviorSubject } from "rxjs";
import { NoteService } from "../note-service/note-service";
import { ProjectService } from "../project-service/project-service";
import { SummaryEntry } from "./summary-service.types";

class SummaryService {
  private projectService: ProjectService;

  private summaries$: BehaviorSubject<SummaryEntry[]> = new BehaviorSubject<
    SummaryEntry[]
  >([]);
  private noteService: NoteService;

  constructor(projectService: ProjectService) {
    this.projectService = projectService;
    this.noteService = projectService.getNoteService();

    this.noteService.onNotesUpdated().subscribe((notes) => {
      // Generate summaries when notes are updated
      return true;
    });
  }

  // Expose summaries as an observable
  onSummariesUpdated() {
    return this.summaries$.asObservable();
  }

  // Get the current summaries
  getSummaries() {
    return this.summaries$.getValue();
  }

  public dispose() {
    this.summaries$.complete();
  }
}

export { SummaryService };
