import React from "react";
import { Typography, Box } from "@mui/material";

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
    <Box>
      <h1>{activeSummary.title}</h1>
      <Box>{activeSummary.content}</Box>
    </Box>
  );
};
