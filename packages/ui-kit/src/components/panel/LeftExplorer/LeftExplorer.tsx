import React from "react";
import { Box, IconButton, List, ListItem, ListItemText } from "@mui/material";
import Tree from "./blocks/tree/tree";
import NoteAddIcon from "../../../primitives/icons/note-add-icon";
import FilterLineIcon from "../../../primitives/icons/filter-line-icon";

interface LeftExplorerProps {
  onSelect: (id: string) => void;
}

const mockSummaries = [
  { id: "1", title: "Summary 1" },
  { id: "2", title: "Summary 2" },
  { id: "3", title: "Summary 3" },
];

export const LeftExplorer: React.FC<LeftExplorerProps> = ({ onSelect }) => {
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
          <IconButton onClick={() => true}>
            <NoteAddIcon />
          </IconButton>

          <IconButton>
            <FilterLineIcon />
          </IconButton>
        </Box>

        <Tree />
      </Box>
    </Box>
  );
};
