export interface NoteEntry {
  id: string | number; // Unique ID for the note
  content: string; // The text content of the note
  author_id: string | number; // (Optional) The user who created the note
  author_username: string; // (Optional) The username of the user who created the note
  created_at: Date | string; // Timestamp for when the note was created
  updated_at?: Date | string; // (Optional) Timestamp for the last update to the note
}
