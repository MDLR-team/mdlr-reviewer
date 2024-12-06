import { Box, Button, TextField, CircularProgress } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useActionArea } from "../actions-area";

const SummaryAction: React.FC<{
  project: any;
}> = ({ project }) => {
  const { actionType, handleAction } = useActionArea();

  const summaryService = project.getSummaryService();

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const insertStructuredContent = (text: string) => {
    const segments = text.split(/(## .+|@\w+)/g); // Split by headings (##) and mentions (@username)

    segments.forEach((segment) => {
      const mentionPattern = /^@(\w+)/;
      const headingPattern = /^##(.+)/;

      if (mentionPattern.test(segment)) {
        const mentionMatch = mentionPattern.exec(segment);

        console.log("mentionMatch", mentionMatch);
        /* if (mentionMatch) {
          editor
            .chain()
            .focus()
            .insertContent({
              type: "mention",
              attrs: {
                id: mentionMatch[1],
                label: `${mentionMatch[1]}`,
              },
            })
            .run();
        } */
      } else if (headingPattern.test(segment)) {
        /* const headingMatch = headingPattern.exec(segment);
        console.log("headingMatch", headingMatch);

        if (headingMatch) {
          editor
            .chain()
            .focus()
            .insertContent({
              type: "heading",
              attrs: { level: 2 }, // Level 2 for headings starting with ##
              content: [{ type: "text", text: headingMatch[1] }],
            })
            .run();
        } */
      } else {
        // Insert remaining text as plain content
        //editor.chain().focus().insertContent(segment).run();
      }
    });
  };

  const typeTextToEditor = async (text: string) => {
    // check if interval is already running and clear it
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    const segments = [text];
    //const segments = text.split(/(\s+|,|\.|\n)/); // Split by spaces, punctuation, and newlines

    let index = 0;
    intervalRef.current = setInterval(() => {
      if (index < segments.length) {
        const textSegment = segments[index];
        insertStructuredContent(textSegment); // Send the entire segment to `insertStructuredContent`
        index++;
      } else {
        if (intervalRef.current) clearInterval(intervalRef.current); // Stop the typing effect once done
        setLoading(false);
      }
    }, 20); // Adjust speed by changing the interval duration
  };

  const onComplete = async () => {
    const activeSummary = summaryService.activeSummary;
    if (!activeSummary) return;

    await summaryService.updateSummary(activeSummary.id, {
      prompt: value,
    });

    await summaryService.refreshSummary(activeSummary.id);
  };

  /* useEffect(() => {
    const sub = summaryService.activeSummary$.subscribe(setActiveSummary);
    return () => sub.unsubscribe();
  }, []);

  useEffect(() => {
    if (activeSummary && editor) {
      const title = activeSummary.title;
      const content = activeSummary.content;

      // Clear editor content first to ensure a clean slate
      editor
        .chain()
        .focus()
        .deleteRange({ from: 0, to: editor.state.doc.content.size })
        .run();

      // Insert the title as a heading
      editor
        .chain()
        .focus()
        .insertContent({
          type: "heading",
          attrs: { level: 1 }, // Insert as top-level heading
          content: [{ type: "text", text: title.trim().replace(/^"|"$/g, "") }],
        })
        .run();

      // Insert a paragraph node or line break to reset styling
      editor.chain().focus().insertContent("<p>  </p>").run();

      const wrappedValue = `${content}`;

      // Clear editor content and start typing the result
      editor.chain().focus().run();
      typeTextToEditor(wrappedValue);
    }
  }, [activeSummary, editor]); */

  const clearQuery = () => {
    setValue("");
  };

  useEffect(() => {
    setValue("");
  }, [actionType]);

  if (actionType !== "add-summary") return null;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        boxShadow: "var(--shadow)",
        border: "1px solid var(--gray-3)",
        padding: "16px",
        backgroundColor: "#fff",
        borderRadius: "10px",
        pointerEvents: "all",
        minWidth: "300px",
      }}
    >
      <TextField
        multiline
        fullWidth
        minRows={5}
        maxRows={10}
        placeholder="Describe what you want summarized from comments or media, e.g., '@John_Doe's comments on safety"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        variant="outlined"
        required
        size="small"
        margin="normal"
        sx={{
          fontSize: "14px",
          margin: "0px",
          border: "0px !important",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              border: "none",
            },
          },
        }}
        InputProps={{
          endAdornment: value && (
            <Box
              onClick={clearQuery}
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              {/* <CancelIcon
                style={{
                  fontSize: "16px",
                  color: "#8C8C8C !important",
                }}
                color="inherit"
              /> */}
            </Box>
          ),
        }}
      />

      <Button
        size="small"
        sx={{ maxWidth: "100px" }}
        variant="contained"
        color="primary"
        onClick={onComplete}
        disabled={loading}
      >
        {loading ? <CircularProgress size={16} color="inherit" /> : "Go"}
      </Button>
    </Box>
  );
};

export default SummaryAction;
