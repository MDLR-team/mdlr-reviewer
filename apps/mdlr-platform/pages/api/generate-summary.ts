// pages/api/generate-summary.ts
import { NextApiRequest, NextApiResponse } from "next";
import { SummaryGenerator } from "@mdlr-reviewer/project";
import { supabase } from "../components/supabase/supabase-client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Validate that the request body exists
    if (!req.body) {
      return res.status(400).json({ error: "Request body is missing" });
    }

    // Initialize the SummaryGenerator service
    const summaryGenerator = new SummaryGenerator({
      supabase: {
        client: supabase,
        chatGpt: { apiKey: process.env.CHATGPT_API_KEY },
      },
    });

    // Pass the entire body to the generate method
    const summary = await summaryGenerator.generate(req.body);

    // Respond with the generated summary
    return res.status(200).json({ summary });
  } catch (error) {
    console.error("Error generating summary:", error);
    return res.status(500).json({ error: "Failed to generate summary." });
  }
}
