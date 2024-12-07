export interface SummaryEntry {
  id: string | number; // Unique ID for the summary
  title: string; // Title of the summary
  content: string; // The text content of the summary
  prompt: string; // Prompt provided for the summary
  project_id: string; // ID of the project the summary belongs to
  created_at: Date; // Timestamp for when the summary was created
  updated_at?: Date; // (Optional) Timestamp for the last update to the summary
}

export type SortMode =
  | "name-asc"
  | "name-desc"
  | "date-created-asc"
  | "date-created-desc"
  | "date-refreshed-asc"
  | "date-refreshed-desc";
