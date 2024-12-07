import { Box, Button } from "@mui/material";
import moment from "moment";
import { usePanel } from "../Panel/hooks/use-panel";

const RefreshArea = () => {
  const { project, activeSummary } = usePanel();

  return (
    <>
      {activeSummary && (
        <Box
          sx={{
            width: "100%",
            backgroundColor: "var(--mr-gray-3)",
            borderBottom: "1px solid var(--mr-gray-3)",
            padding: "6px 16px",
            display: "flex",
            gap: "8px",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box>
            {`It was updated ${moment(activeSummary.updated_at).fromNow()}`}
          </Box>

          <Box>
            <Button
              size="small"
              onClick={() =>
                project.summaryService.refreshSummary(activeSummary.id)
              }
              sx={{
                border: "1px solid var(--mr-gray-3)",
              }}
            >
              Refresh
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export { RefreshArea };
