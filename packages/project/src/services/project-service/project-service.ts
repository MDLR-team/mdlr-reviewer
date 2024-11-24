import { BehaviorSubject } from "rxjs";
import { NoteService } from "../note-service/note-service";
import { SummaryService } from "../summary-service/summary-service";

export class ProjectService {
  id: string;
  metadata: Record<string, any>;

  // Services
  private noteService: NoteService;
  private summaryService: SummaryService;

  constructor(id: string, metadata?: Record<string, any>) {
    this.id = id;
    this.metadata = {};

    this.noteService = new NoteService(this);
    this.summaryService = new SummaryService(this);
  }

  // Expose methods for notes
  public getNotes() {
    return this.noteService.getNotes();
  }

  public onNotesUpdated() {
    return this.noteService.onNotesUpdated();
  }

  // Expose methods for summaries
  public getSummaries() {
    return this.summaryService.getSummaries();
  }

  public onSummariesUpdated() {
    return this.summaryService.onSummariesUpdated();
  }

  public getNoteService() {
    return this.noteService;
  }

  public getSummaryService() {
    return this.summaryService;
  }

  public dispose() {
    this.noteService.dispose();
    this.summaryService.dispose();
  }
}

export interface Project {
  id: string;
  name: string;
}
