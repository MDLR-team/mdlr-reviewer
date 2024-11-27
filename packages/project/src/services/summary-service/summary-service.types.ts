export interface SummaryEntry {
  id: string | number; // Unique ID for the summary
  title: string; // Title of the summary
  content: string; // The text content of the summary
  prompt: string; // Prompt provided for the summary
  projectId: string; // ID of the project the summary belongs to
  createdAt: Date; // Timestamp for when the summary was created
  updatedAt?: Date; // (Optional) Timestamp for the last update to the summary
}
