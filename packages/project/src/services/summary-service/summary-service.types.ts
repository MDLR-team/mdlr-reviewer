export interface SummaryEntry {
  id: string; // Unique ID for the summary
  prompt: string; // Prompt provided for the summary
  generatedText: string; // The AI-generated summary text
  createdAt: Date; // Timestamp for when the summary was created
}
