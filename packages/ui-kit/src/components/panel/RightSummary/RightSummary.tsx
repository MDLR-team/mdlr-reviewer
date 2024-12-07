import React from "react";
import { Typography, Box, IconButton } from "@mui/material";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { usePanel } from "../Panel/hooks/use-panel";
import NoteAddIcon from "../../../primitives/icons/note-add-icon";

// Function to wrap @name mentions with <span class="highlight-name">
function preprocessContent(content: any) {
  const regex = /(@[\w_]+)/g; // Matches @ followed by word characters and underscores
  if (typeof content !== "string") return content;

  return content.replace(regex, '<span class="highlight-name">$1</span>');
}

interface RightSummaryProps {
  activeSummary: any | null;
}

export const RightSummary: React.FC<RightSummaryProps> = ({
  activeSummary,
}) => {
  const { project } = usePanel();
  const summaryService = project.getSummaryService();

  const createSummary = () => {
    summaryService.createSummary("");
  };

  if (!activeSummary) {
    return (
      <Box
        sx={{
          padding: "var(--mr-gap-l)",
        }}
      >
        <p>
          No summaries loaded. Create a new one.{" "}
          <IconButton onClick={createSummary}>
            <NoteAddIcon />
          </IconButton>
        </p>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        overflowY: "scroll",
      }}
    >
      <Box
        sx={{
          width: "100%",
          minHeight: "max-content",
          padding: "var(--mr-gap-l)",
          position: "relative",
        }}
      >
        <h1 style={{ paddingBottom: "var(--mr-gap-l)" }}>
          {activeSummary.title}
        </h1>

        <Box>
          <ReactMarkdown
            children={preprocessContent(activeSummary.content)}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          />
        </Box>
      </Box>
    </Box>
  );
};
