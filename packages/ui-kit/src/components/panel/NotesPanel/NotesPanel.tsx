import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Box, Typography } from "@mui/material";

const NotesContainer = styled(Box)`
  padding: 16px;
  height: 100%;
  overflow: hidden;

  background-color: white;
  border: var(--mr-border);
  borderradius: var(--mr-border-radius);
  boxshadow: var(--mr-shadow);

  display: flex;
  flex-direction: column;
  position: relative;

  width: 100%;
  max-width: 450px;
`;

export const NotesPanel: React.FC<{
  project: any;
}> = ({ project }: { project: any }) => {
  const [notes, setNotes] = useState<any[]>([]);

  const noteService = project.getNoteService();

  useEffect(() => {
    const a = noteService.onNotesUpdated.subscribe((notes: any) => {
      setNotes(notes);
    });

    return () => {
      a.unsubscribe();
    };
  }, [project]);

  return (
    <NotesContainer className="mdlr-reviewer-notes">
      <Typography variant="h6">Notes</Typography>

      <Box
        sx={{
          width: "100%",
          height: "100%",
          overflow: "scroll",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            width: "100%",
          }}
        >
          {notes.length > 0 ? (
            notes.map((note) => (
              <NoteContainer key={note.id} mb={2}>
                {note.content}
              </NoteContainer>
            ))
          ) : (
            <p>No notes available</p>
          )}
        </Box>
      </Box>
    </NotesContainer>
  );
};

const NoteContainer = styled(Box)`
  padding: 8px;
  border-radius: var(--mr-border-radius);
  cursor: pointer;

  &:hover {
    background-color: #f1f0ee;
  }

  &,
  & * {
    font-size: 12px;
  }
`;
