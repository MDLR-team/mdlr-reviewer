export interface NoteEntry {
  id: string; // Unique ID for the note
  content: string; // The text content of the note
  author?: string; // (Optional) The user who created the note
  createdAt?: Date; // Timestamp for when the note was created
  updatedAt?: Date; // (Optional) Timestamp for the last update to the note
}
