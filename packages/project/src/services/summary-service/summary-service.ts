import { BehaviorSubject } from "rxjs";
import { NoteService } from "../note-service/note-service";
import { ProjectService } from "../project-service/project-service";
import { SortMode, SummaryEntry } from "./summary-service.types";
import GenResultService from "../gen-result-service/gen-result-service";

class SummaryService {
  private projectService: ProjectService;
  private genResultService: GenResultService;

  private _summaries$: BehaviorSubject<SummaryEntry[]> = new BehaviorSubject<
    SummaryEntry[]
  >([]);
  private _activeSummary$: BehaviorSubject<SummaryEntry | null> =
    new BehaviorSubject<SummaryEntry | null>(null);

  private supabaseClient: any;
  private noteService: NoteService;

  private _sortMode$ = new BehaviorSubject<SortMode>("date-created-desc");

  constructor(projectService: ProjectService) {
    this.genResultService = new GenResultService();

    this.projectService = projectService;
    this.supabaseClient = projectService["supabaseClient"]; // Access Supabase client from ProjectService
    this.noteService = projectService.getNoteService();

    this.noteService.onNotesUpdated.subscribe((notes) => {
      // Generate summaries when notes are updated
      return true;
    });

    // Fetch summaries for the current project
    this.fetchSummaries();
  }

  /**
   * Fetch summaries for the current project from Supabase.
   */
  public async fetchSummaries() {
    const projectId = this.projectService.id;
    const currentSortMode = this._sortMode$.getValue();

    // Determine sorting column and direction based on sort mode
    let orderColumn: string;
    let ascending: boolean;

    switch (currentSortMode) {
      case "name-asc":
        orderColumn = "title";
        ascending = true;
        break;
      case "name-desc":
        orderColumn = "title";
        ascending = false;
        break;
      case "date-created-asc":
        orderColumn = "created_at";
        ascending = true;
        break;
      case "date-created-desc":
        orderColumn = "created_at";
        ascending = false;
        break;
      case "date-refreshed-asc":
        orderColumn = "updated_at";
        ascending = true;
        break;
      case "date-refreshed-desc":
        orderColumn = "updated_at";
        ascending = false;
        break;
      default:
        orderColumn = "created_at";
        ascending = false;
    }

    const { data, error } = await this.supabaseClient
      .from("summaries") // Adjust table name if needed
      .select("*")
      .eq("project_id", projectId)
      .order(orderColumn, { ascending });

    if (error) {
      console.error("Error fetching summaries:", error);
      return;
    }

    this._summaries$.next(data || []);

    // update active summary
    const activeSummary = this._activeSummary$.getValue();
    if (activeSummary) {
      const updatedSummaries = this._summaries$.getValue();
      const updActiveSummary = updatedSummaries.find(
        (summary) => summary.id === activeSummary.id
      );

      this._activeSummary$.next(updActiveSummary || null);
    } else {
      const updatedSummaries = this._summaries$.getValue();
      this._activeSummary$.next(updatedSummaries[0] || null);
    }
  }

  /**
   * Create a new summary and persist it to Supabase.
   */
  public async createSummary(userPrompt: string) {
    const projectId = this.projectService.id;

    const defaultTitle = "Untitled Summary";
    const newSummary: Partial<SummaryEntry> = {
      project_id: projectId,
      title: defaultTitle,
      prompt: userPrompt,
    };

    const { data, error } = await this.supabaseClient
      .from("summaries") // Adjust table name if needed
      .insert(newSummary);

    if (error) {
      console.error("Error creating summary:", error);
      return;
    }

    await this.fetchSummaries();
  }

  /**
   * Delete a summary.
   */
  public async deleteSummary(summaryId: string) {
    const { data, error } = await this.supabaseClient
      .from("summaries")
      .delete()
      .eq("id", summaryId);

    if (error) {
      console.error("Error deleting summary:", error);
      return;
    }

    await this.fetchSummaries();
  }

  /**
   * Update an existing summary.
   */
  public async updateSummary(
    summaryId: string,
    updates: Partial<SummaryEntry>
  ) {
    const { data, error } = await this.supabaseClient
      .from("summaries")
      .update(updates)
      .eq("id", summaryId);

    if (error) {
      console.error("Error updating summary:", error);
      return;
    }

    await this.fetchSummaries();
  }

  /**
   * Set the active summary (locally, not persisted).
   */
  public setActiveSummary(summaryId: string) {
    const summaries = this._summaries$.getValue();
    const activeSummary = summaries.find((summary) => summary.id === summaryId);

    this._activeSummary$.next(activeSummary || null);
  }

  // Expose summaries as an observable
  public get onSummariesUpdated() {
    return this._summaries$.asObservable();
  }

  // Get the current summaries
  getSummaries() {
    return this._summaries$.getValue();
  }

  public generateSummaryFromNotes = async (summary: SummaryEntry) => {
    const prompt = summary.prompt;

    const notes = this.projectService.getNotes();
    const notesContent = notes
      .map(
        (note) =>
          `[${note.author_username.replace(/\s+/g, "_")}: ${note.content}`
      )
      .join("\n");

    const summaryEndpoint =
      this.projectService.getConfig().summaryEndpoint || "";

    const title =
      (await this.getResultFromEndpoint(summaryEndpoint, {
        type: "title",
        projectId: this.projectService.id,
        userPrompt: prompt,
      })) || "";

    const content =
      (await this.getResultFromEndpoint(summaryEndpoint, {
        type: "content",
        projectId: this.projectService.id,
        userPrompt: prompt,
        notes: notesContent,
      })) || "";

    return {
      title,
      content,
    };
  };

  private async sendRequest(endpoint: string, body: any) {
    return fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }

  private async getResultFromEndpoint(endpoint: string, body: any) {
    try {
      const response = await this.sendRequest(endpoint, body);
      const result = await response.json();
      if (response.ok) {
        return result.summary;
      } else {
        throw new Error(result.error || "Unknown error occurred");
      }
    } catch (error) {
      console.error("Error fetching result from endpoint:", error);
      return null;
    }
  }

  public async refreshSummary(id: string) {
    const summary = this._summaries$.getValue().find((s) => s.id === id);
    if (!summary) {
      return;
    }

    const { title, content } = await this.generateSummaryFromNotes(summary);

    this.updateSummary(id, {
      title,
      content,
      updated_at: new Date(),
    });
  }

  public async sortSummaries(mode: SortMode) {
    this._sortMode$.next(mode);

    this.fetchSummaries();
  }

  public get activeSummary$() {
    return this._activeSummary$.asObservable();
  }

  public get activeSummary() {
    return this._activeSummary$.getValue();
  }

  public get sortMode$() {
    return this._sortMode$.asObservable();
  }

  public dispose() {
    this._summaries$.complete();
    this._activeSummary$.complete();
  }
}

export { SummaryService };
