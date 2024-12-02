import React from "react";
import { Typography, Box } from "@mui/material";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

interface RightSummaryProps {
  activeSummary: any | null;
}

export const RightSummary: React.FC<RightSummaryProps> = ({
  activeSummary,
}) => {
  if (!activeSummary) {
    return (
      <Box>
        <Typography variant="h6">No summary selected</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        padding: "var(--mr-gap-l)",
        overflowY: "auto",
      }}
    >
      <h1 style={{ paddingBottom: "var(--mr-gap-l)" }}>
        {activeSummary.title}
      </h1>

      <Box>
        <ReactMarkdown
          children={activeSummary.content}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
        />
      </Box>
    </Box>
  );
};
