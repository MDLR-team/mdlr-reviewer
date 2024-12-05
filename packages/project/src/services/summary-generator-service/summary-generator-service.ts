import OpenAI from "openai";
import { SupabaseConfig } from "../../types/project/project-service.types";

class SummaryGeneratorService {
  private supabase: any;
  private openai?: OpenAI;

  constructor(
    private config: {
      metadata?: Record<string, any>;
      supabase?: any;
      chatGpt?: {
        apiKey?: string;
      };
    }
  ) {
    const chatGptApiKey = config.chatGpt?.apiKey;

    // Initialize OpenAI API
    this.openai = new OpenAI({
      apiKey: chatGptApiKey,
    });

    this.supabase = this._initializeSupabase(config.supabase);
  }

  public async generate(body: {
    projectId: string;
    userPrompt: string;
    notes: string;
    [key: string]: any;
  }): Promise<string> {
    const { projectId, userPrompt, notes, ...additionalConfigs } = body;

    // Generate summary with notes and userPrompt
    const summary = await this.processWithChatGPT(notes, userPrompt);

    return summary;
  }

  // Internal: Initialize Supabase client
  private _initializeSupabase(config?: SupabaseConfig) {
    if (config?.client) {
      // Use provided Supabase client
      return config.client;
    }
  }

  private async processWithChatGPT(
    notes: string,
    userPrompt: string
  ): Promise<string> {
    const messages: any = [
      {
        role: "system",
        content: "Summarize the following notes for a project.",
      },
      {
        role: "user",
        content: notes,
      },
    ];

    const response = await this.openai?.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
    });

    // Handle the response
    if (!response || !response.choices || response.choices.length === 0) {
      throw new Error("Failed to generate summary from ChatGPT.");
    }

    return response.choices[0].message?.content || "";
  }

  public dispose() {}
}

export { SummaryGeneratorService };
