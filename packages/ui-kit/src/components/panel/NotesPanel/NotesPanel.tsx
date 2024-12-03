import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Box, Typography } from "@mui/material";

const NotesContainer = styled(Box)`
  padding: 16px;
  height: 100%;
  overflow-y: auto;

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
    <NotesContainer>
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
              <Box key={note.id} mb={2}>
                <Typography variant="body1">{note.content}</Typography>
              </Box>
            ))
          ) : (
            <Typography variant="body2" color="textSecondary">
              No notes available
            </Typography>
          )}
        </Box>
      </Box>
    </NotesContainer>
  );
};
