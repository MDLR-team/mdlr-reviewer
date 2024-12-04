import { BehaviorSubject } from "rxjs";
import { NoteService } from "../note-service/note-service";
import { SummaryService } from "../summary-service/summary-service";
import {
  ChatGptConfig,
  IProjectService,
  SupabaseConfig,
} from "../../types/project/project-service.types";
import DBService from "../db-service/db-service";
import { NoteEntry } from "../note-service/note-service.types";

export class ProjectService implements IProjectService {
  id: string;
  metadata: Record<string, any>;

  // Services
  private noteService: NoteService;
  private summaryService: SummaryService;
  private dbService: DBService;

  private supabaseClient: any;

  constructor(
    id: string,
    private config: {
      metadata?: Record<string, any>;
      supabase?: SupabaseConfig;
      summaryEndpoint?: string;
    }
  ) {
    this.id = id;
    this.metadata = config.metadata || {};

    // Initialize Supabase client
    this.supabaseClient = this._initializeSupabase(config.supabase);

    this.noteService = new NoteService(this);
    this.summaryService = new SummaryService(this);
    this.dbService = new DBService(this);
  }

  // Expose methods for notes
  public getNotes() {
    return this.noteService.getNotes();
  }

  public addNotes(notes: NoteEntry[]) {
    return this.noteService.addNotes(notes);
  }

  // Expose methods for summaries
  public getSummaries() {
    return this.summaryService.getSummaries();
  }

  public getNoteService() {
    return this.noteService;
  }

  public getSummaryService() {
    return this.summaryService;
  }

  public getConfig() {
    return this.config;
  }

  // Internal: Initialize Supabase client
  private _initializeSupabase(config?: SupabaseConfig) {
    if (config?.client) {
      // Use provided Supabase client
      return config.client;
    }
  }

  public dispose() {
    this.noteService.dispose();
    this.summaryService.dispose();
    this.dbService.dispose();
  }
}

export interface Project {
  id: string;
  name: string;
}
