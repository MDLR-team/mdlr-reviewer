import { ChatGptConfig } from "../../types/project/project-service.types";
import OpenAI from "openai";
import { NoteEntry } from "../note-service/note-service.types";

class GenResultService {
  private chatGptApiKey: string;
  private openai?: OpenAI;

  constructor(chatGptApi?: ChatGptConfig) {
    const chatGptApiKey = chatGptApi?.apiKey;

    if (!chatGptApiKey) {
      throw new Error("ChatGPT API key is required.");
    }
    this.chatGptApiKey = chatGptApiKey;

    // Initialize OpenAI API
    this.openai = new OpenAI({
      apiKey: chatGptApiKey,
      dangerouslyAllowBrowser: true,
    });
  }

  public async generateSummary(notes: NoteEntry[]): Promise<string> {
    const notesContent = notes.map((note) => note.content);

    const messages: any = [
      {
        role: "system",
        content: "Summarize the following notes for a project.",
      },
      {
        role: "user",
        content: notesContent.join("\n"),
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
}

export default GenResultService;
