import FileDocumentIcon from "../../../../../primitives/icons/file-document-icon";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Menu,
  MenuItem,
  Popover,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { usePanel } from "../../../Panel/hooks/use-panel";

const TreeItem: React.FC<{
  item: any;
  isActive: boolean;
  onSelect: (id: string) => void;
}> = ({ item, isActive, onSelect }) => {
  const { project, summaryService } = usePanel();

  const [anchorEl, setAnchorEl] = useState(null);
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const [newName, setNewName] = useState("");

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    summaryService.deleteSummary(item.id);
    handleClose();
  };

  const handleRenameClick = () => {
    setNewName(item.name);
    setRenameDialogOpen(true);
    handleClose();
  };

  const handleRenameClose = () => {
    setRenameDialogOpen(false);
  };

  const handleRenameSave = () => {
    summaryService.updateSummary(item.id, { title: newName });
    setRenameDialogOpen(false);
  };

  const open = Boolean(anchorEl);
  const id = open ? `actions-w-${item.id}` : undefined;

  useEffect(() => {
    if (renameDialogOpen) {
      setNewName(item.title);
    }
  }, [renameDialogOpen]);

  return (
    <>
      <ButtonWrapper
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
          backgroundColor: isActive ? "var(--mr-gray-2)" : "transparent",
          gap: "10px",
          alignItems: "center",
        }}
        onClick={() => onSelect(item.id)}
      >
        <Box
          sx={{
            height: "24px",
          }}
        >
          <FileDocumentIcon />
        </Box>
        <Box
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            width: "100%",
            textAlign: "left",
          }}
        >
          {item.title}
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: "4px",
          }}
          data-type="actions"
        >
          <Button
            onClick={handleClick}
            variant="contained"
            color="primary"
            size="small"
            sx={{
              minWidth: "24px",
              minHeight: "24px",
              borderRadius: "50%",
              padding: "0",
              fontSize: "12px",
            }}
          >
            ...
          </Button>
        </Box>
      </ButtonWrapper>

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
        <MenuItem onClick={handleRenameClick}>Rename</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>

      <Dialog open={renameDialogOpen} onClose={handleRenameClose}>
        <Box sx={{ marginLeft: "10px", marginTop: "10px" }}>Rename Summary</Box>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            type="text"
            fullWidth
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleRenameSave();
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRenameClose}>Cancel</Button>
          <Button onClick={handleRenameSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const ButtonWrapper = styled(Button)`
  &:hover {
    background-color: var(--mr-gray-2) !important;
  }

  & [data-type="actions"] {
    display: none;
  }

  &:hover {
    & [data-type="actions"] {
      display: flex;
    }
  }
`;

export default TreeItem;
