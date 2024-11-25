export interface IProjectService {
  id: string;
  metadata: Record<string, any>;

  // Note service methods
  getNotes(): ReturnType<any["getNotes"]>;
  onNotesUpdated(): ReturnType<any["onNotesUpdated"]>;

  // Summary service methods
  getSummaries(): ReturnType<any["getSummaries"]>;
  onSummariesUpdated(): ReturnType<any["onSummariesUpdated"]>;

  // Access underlying services
  getNoteService(): any;
  getSummaryService(): any;

  // Dispose resources
  dispose(): void;
}
