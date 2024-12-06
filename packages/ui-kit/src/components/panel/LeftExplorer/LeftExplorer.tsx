import React, { useEffect, useState } from "react";
import { Box, IconButton, List, ListItem, ListItemText } from "@mui/material";
import Tree from "./blocks/tree/tree";
import NoteAddIcon from "../../../primitives/icons/note-add-icon";
import FilterLineIcon from "../../../primitives/icons/filter-line-icon";
import { usePanel } from "../Panel/hooks/use-panel";

export interface LeftExplorerProps {
  summaries: any[];
  activeSummary: any | null;
  onSelect: (id: string) => void;
}

export const LeftExplorer: React.FC<LeftExplorerProps> = ({ ...props }) => {
  const { project } = usePanel();
  const summaryService = project.getSummaryService();

  const createSummary = () => {
    summaryService.createSummary("");
  };

  return (
    <Box
      sx={{
        height: "100%",
        minWidth: "240px",
        maxWidth: "240px",
        overflow: "auto",
        transition: "all 0.3s",
      }}
    >
      <Box
        sx={{
          height: "100%",
          borderRight: "var(--mr-border)",
          backgroundColor: "#F6F6F6",
          display: "flex",
          flexDirection: "column",
          padding: "10px",
          gap: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            width: "100%",
          }}
        >
          <IconButton onClick={createSummary}>
            <NoteAddIcon />
          </IconButton>

          <IconButton>
            <FilterLineIcon />
          </IconButton>
        </Box>

        <Tree {...props} />
      </Box>
    </Box>
  );
};
