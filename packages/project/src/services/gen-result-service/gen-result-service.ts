class GenResultService {
  private chatGptApiKey: string;

  constructor(chatGptApiKey: string) {
    if (!chatGptApiKey) {
      throw new Error("ChatGPT API key is required.");
    }
    this.chatGptApiKey = chatGptApiKey;
  }

  public async generateSummary(notes: string[]): Promise<string> {
    const messages = [
      {
        role: "system",
        content: "Summarize the following notes for a project.",
      },
      { role: "user", content: notes.join("\n") },
    ];

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.chatGptApiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4", // or the specific GPT version
        messages: messages,
      }),
    });

    const result = await response.json();
    return result.choices[0].message.content;
  }
}

export default GenResultService;
