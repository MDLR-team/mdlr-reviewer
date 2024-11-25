import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import { LeftExplorer } from "../LeftExplorer/LeftExplorer";
import { RightSummary } from "../RightSummary/RightSummary";
import { PanelContainer } from "./panel.styles";
import GlobalStyles from "../../../styles/global-styles/global-styles";
import NavBar from "../NavBar/NavBar";
import { IProjectService } from "../../../types/project/project-service.types";

export const Panel: React.FC<{
  project: IProjectService;
}> = ({ project }) => {
  const [selectedSummaryId, setSelectedSummaryId] = useState<string | null>(
    null
  );

  return (
    <>
      <GlobalStyles />

      <Box
        sx={{
          position: "relative",
          height: "100%",
          maxHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          pointerEvents: "all",
          padding: "var(--mr-gap-m) 0px var(--mr-gap-m) var(--mr-gap-m)",
          zIndex: 2,
          transition: "all 0.3s",
        }}
      >
        <Box
          sx={{
            position: "relative",
            height: "100%",
            maxHeight: "100vh",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            border: "var(--mr-border)",
            borderRadius: "var(--mr-border-radius)",
            boxShadow: "var(--mr-shadow)",
          }}
        >
          <NavBar />

          <Box
            sx={{
              position: "relative",
              display: "flex",
              height: "100%",
              maxHeight: "100%",
              overflow: "hidden",
              width: "100%",
            }}
          >
            <LeftExplorer onSelect={(id) => setSelectedSummaryId(id)} />

            <Box
              sx={{
                width: "100%",
                height: "100%",
                minWidth: "350px",
                maxHeight: "100%",
                overflow: "hidden",
                position: "relative",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {" "}
              {true && (
                <Box
                  sx={{
                    width: "100%",
                    backgroundColor: "var(--mr-gray-1)",
                    borderBottom: "1px solid var(--mr-gray-3)",
                    padding: "6px 16px",
                    display: "flex",
                    gap: "8px",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    {`It was updated ${
                      /* moment(
                      activeSummary.updated_at
                    ).fromNow()} */ "1 day ago"
                    }`}
                  </Box>

                  <Box>
                    <Button
                      size="small"
                      //onClick={() => summaryService.generateSummary()}
                      sx={{
                        border: "1px solid var(--mr-gray-3)",
                      }}
                    >
                      Refresh
                    </Button>
                  </Box>
                </Box>
              )}
              {/* Right Summary */}
              <RightSummary summaryId={selectedSummaryId} />
            </Box>
          </Box>
        </Box>
      </Box>

      {/* <PanelContainer>
        <LeftExplorer onSelect={(id) => setSelectedSummaryId(id)} />
      </PanelContainer> */}
    </>
  );
};
