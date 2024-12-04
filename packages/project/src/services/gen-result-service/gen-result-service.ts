import { ChatGptConfig } from "../../types/project/project-service.types";
import OpenAI from "openai";
import { NoteEntry } from "../note-service/note-service.types";

class GenResultService {
  constructor(chatGptApi?: ChatGptConfig) {}

  public async generateSummary(notes: NoteEntry[]): Promise<string> {
    return "Generated summary";
  }
}

export default GenResultService;
