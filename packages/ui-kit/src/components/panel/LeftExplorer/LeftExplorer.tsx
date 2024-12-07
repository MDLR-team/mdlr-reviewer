import React, { useEffect, useState } from "react";
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
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

  const [sortMode, setSortMode] = useState<string>("date-created-desc");

  useEffect(() => {
    const smsub = summaryService.sortMode$.subscribe(setSortMode);

    return () => {
      smsub.unsubscribe();
    };
  }, []);

  const createSummary = () => {
    summaryService.createSummary("");
  };

  // Helper function to render menu item with active state
  const renderMenuItem = (label: string, mode: string, onClick: () => void) => (
    <MenuItem
      onClick={onClick}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "10px",
        fontWeight: sortMode === mode ? "bold" : "normal",
        backgroundColor:
          sortMode === mode ? "rgba(0, 0, 0, 0.04)" : "transparent",
      }}
    >
      {label}
      {sortMode === mode && (
        <Box
          sx={{
            backgroundColor: "black",
            width: "5px",
            height: "5px",
            borderRadius: "50%",
          }}
        />
      )}
    </MenuItem>
  );

  const handleSortMode = (
    mode:
      | "name-asc"
      | "name-desc"
      | "date-created-asc"
      | "date-created-desc"
      | "date-refreshed-asc"
      | "date-refreshed-desc"
  ) => {
    summaryService.sortSummaries(mode);
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
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

            <IconButton onClick={handleClick}>
              <FilterLineIcon />
            </IconButton>
          </Box>

          <Tree {...props} />
        </Box>
      </Box>

      <Menu
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        className="mdlr-reviewer-menu"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        sx={{
          minWidth: "max-content !important",
          maxWidth: "max-content !important",
        }}
      >
        {renderMenuItem("File name (A to Z)", "name-asc", () =>
          handleSortMode("name-asc")
        )}
        {renderMenuItem("File name (Z to A)", "name-desc", () =>
          handleSortMode("name-desc")
        )}
        <Divider />

        {renderMenuItem(
          "Date created (Newest first)",
          "date-created-desc",
          () => handleSortMode("date-created-desc")
        )}
        {renderMenuItem("Date created (Oldest first)", "date-created-asc", () =>
          handleSortMode("date-created-asc")
        )}

        <Divider />

        {renderMenuItem(
          "Date refreshed (Newest first)",
          "date-refreshed-desc",
          () => handleSortMode("date-refreshed-desc")
        )}
        {renderMenuItem(
          "Date refreshed (Oldest first)",
          "date-refreshed-asc",
          () => handleSortMode("date-refreshed-asc")
        )}
      </Menu>
    </>
  );
};
