import { BehaviorSubject } from "rxjs";
import { ProjectService } from "../project-service/project-service";
import { NoteEntry } from "./note-service.types";

export class NoteService {
  private projectService: ProjectService;

  private notes$: BehaviorSubject<NoteEntry[]>;

  constructor(projectService: ProjectService) {
    this.projectService = projectService;

    this.notes$ = new BehaviorSubject<NoteEntry[]>([]);
  }

  // Add a new note and trigger updates
  addNote(note: NoteEntry) {
    const currentNotes = this.notes$.getValue();
    this.notes$.next([...currentNotes, note]);
  }

  // Add multiple notes at a time and trigger updates
  addNotes(notes: NoteEntry[]) {
    const currentNotes = this.notes$.getValue();
    this.notes$.next([...currentNotes, ...notes]);
  }

  // Expose the observable for external services like the SummaryService
  public get onNotesUpdated() {
    return this.notes$.asObservable();
  }

  // Get the current notes
  getNotes() {
    return this.notes$.getValue();
  }

  public dispose() {
    this.notes$.complete();
  }
}
