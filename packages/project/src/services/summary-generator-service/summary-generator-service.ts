import { SupabaseConfig } from "../../types/project/project-service.types";

class SummaryGeneratorService {
  private supabaseClient: any;

  constructor(
    private config: {
      metadata?: Record<string, any>;
      supabase?: any;
      chatGpt?: {
        apiKey?: string;
      };
    }
  ) {
    this.supabaseClient = this._initializeSupabase(config.supabase);
  }

  public async generate(body: any): Promise<string> {
    return "Generated summary";
  }

  // Internal: Initialize Supabase client
  private _initializeSupabase(config?: SupabaseConfig) {
    if (config?.client) {
      // Use provided Supabase client
      return config.client;
    }
  }

  public dispose() {}
}

export { SummaryGeneratorService };
