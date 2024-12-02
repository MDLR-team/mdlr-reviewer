import { Box, Button } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import AiIcon from "../../../primitives/icons/ai-icon";

const Actions = () => {
  const [showPanel, setShowPanel] = useState(false);
  const panelRef = useRef<any>(null);

  const handleButtonClick = () => {
    setShowPanel(true); // Show panel on button click
  };

  const handleCommandClick = (command: any) => {
    //handleAction(command);
    setShowPanel(false); // Hide panel when a command is clicked
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
      setShowPanel(false); // Hide panel when clicking outside
    }
  };

  useEffect(() => {
    if (showPanel) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPanel]);

  return (
    <Box
      sx={{
        width: "100%",
        maxHeight: "max-content",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {!showPanel ? (
        <Button
          sx={{
            boxShadow: "var(--shadow)",
            pointerEvents: "all",
            border: "1px solid var(--gray-3)",
            fontWeight: "bold",
            padding: "8px 16px",
            minHeight: "48px",
            borderRadius: "var(--mr-border-radius)",
            backgroundColor: "#fff",
          }}
          size="large"
          onClick={handleButtonClick}
          startIcon={<AiIcon />} // Add your icon component here
        >
          Actions
        </Button>
      ) : (
        <Box
          ref={panelRef}
          sx={{
            display: "flex",
            flexDirection: "column",
            boxShadow: "var(--shadow)",
            border: "1px solid var(--gray-3)",
            padding: "16px",
            backgroundColor: "#fff",
            borderRadius: "10px",
            pointerEvents: "all",
          }}
        >
          {/* <Button
            sx={{
              marginBottom: "8px",
              display: "flex",
              justifyContent: "flex-start",
            }}
            onClick={() => handleCommandClick("attach-comment")}
          >
            Attach comment
          </Button> */}
          <Button
            sx={{
              marginBottom: "8px",
              display: "flex",
              justifyContent: "flex-start",
            }}
            onClick={() => handleCommandClick("add-summary")}
          >
            Add real-time summary
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Actions;
