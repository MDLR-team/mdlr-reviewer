import React from "react";
import { Typography, Box } from "@mui/material";

interface RightSummaryProps {
  summaryId: string | null;
}

export const RightSummary: React.FC<RightSummaryProps> = ({ summaryId }) => {
  if (!summaryId) {
    return (
      <Box>
        <Typography variant="h6">No summary selected</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h6">Summary Details</Typography>
      <Typography variant="body1">
        Details for summary ID: {summaryId}
      </Typography>
    </Box>
  );
};
