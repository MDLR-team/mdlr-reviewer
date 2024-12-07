import { Box } from "@mui/material";
import moment from "moment";
import React from "react";
import styled from "styled-components";
import Avatar from "../Avatar/Avatar";

const NoteMessage: React.FC<{
  note: any;
}> = ({ note }) => {
  const { author_username = "", created_at } = note;

  // date to comment format when if it was recently we can show "just now" or "1 minute ago" or "x dayes ago" or "x months ago"
  const time = created_at ? moment(created_at).fromNow() : "";

  return (
    <NoteContainer>
      <Box
        sx={{
          display: "flex",
          columnGap: "9px",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        {author_username && (
          <Box sx={{ display: "flex", columnGap: "9px" }}>
            {<Avatar username={author_username} size="small" />}

            <Box sx={{ display: "flex", gap: "2px", flexDirection: "column" }}>
              <Box sx={{ display: "flex", gap: "9px" }}>
                <Box sx={{ fontWeight: "500" }}>{author_username}</Box>
              </Box>

              {created_at && (
                <Box
                  sx={{ color: "#999999", fontSize: "9px", fontWeight: "500" }}
                >
                  {time}
                </Box>
              )}
            </Box>
          </Box>
        )}
      </Box>

      <Box>{note.content}</Box>
    </NoteContainer>
  );
};

const NoteContainer = styled(Box)`
  padding: 8px;
  border-radius: var(--mr-border-radius);
  cursor: pointer;

  display: flex;
  flex-direction: column;
  gap: 9px;

  &:hover {
    background-color: #f1f0ee;
  }

  &,
  & * {
    font-size: 12px;
  }
`;

export default NoteMessage;
