import { Observable } from "rxjs";
import { SummaryEntry } from "../../services/summary-service/summary-service.types";

export interface IProjectService {
  id: string;
  metadata: Record<string, any>;

  // Note service methods
  getNotes(): ReturnType<any["getNotes"]>;

  // Summary service methods
  getSummaries(): ReturnType<any["getSummaries"]>;

  // Access underlying services
  getNoteService(): any;
  getSummaryService(): any;

  // Dispose resources
  dispose(): void;
}

export interface SupabaseConfig {
  client?: any; // Supabase client instance (if provided)
  anonKey?: string; // Public key for connecting
  apiUrl?: string; // URL for Supabase API
}

export interface ChatGptConfig {
  apiKey: string; // OpenAI API key
  version?: string; // Version of the OpenAI API, optional
}
