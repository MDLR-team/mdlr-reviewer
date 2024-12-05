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
    type: "title" | "content";
    projectId: string;
    userPrompt: string;
    notes?: string;
    [key: string]: any;
  }): Promise<string> {
    const { projectId, userPrompt, notes, type, ...additionalConfigs } = body;

    if (type === "title") {
      return await this.processTitle(userPrompt);
    } else if (type === "content") {
      // Generate summary with notes and userPrompt
      return await this.processContent(notes!, userPrompt);
    }

    throw new Error("Invalid type provided for summary generation.");
  }

  // Internal: Initialize Supabase client
  private _initializeSupabase(config?: SupabaseConfig) {
    if (config?.client) {
      // Use provided Supabase client
      return config.client;
    }
  }

  private async processTitle(userPrompt: string): Promise<string> {
    const titleSystemMessage = `Generate a concise title for the following content based on the user's prompt: "${userPrompt}". The title should be short, informative, and capture the essence of the content.`;

    const messages: any = [
      {
        role: "system",
        content: titleSystemMessage,
      },
    ];

    const response = await this.openai?.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
    });

    // Handle the response
    if (!response || !response.choices || response.choices.length === 0) {
      throw new Error("Failed to generate title from ChatGPT.");
    }

    return response.choices[0].message?.content || "";
  }

  private async processContent(
    notes: string,
    userPrompt: string
  ): Promise<string> {
    const systemMessage = `Summarize the comments based on the user's prompt: "${userPrompt}". Use only the comments provided, keeping the response within 1000 characters, and divide it into paragraphs for clear readability. If mentioning a user, format their name exactly as @First_Last (using an underscore between first and last names. important!). No additional information beyond these comments.`;

    const messages: any = [
      {
        role: "system",
        content: systemMessage,
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
