import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { LeftExplorer } from "../LeftExplorer/LeftExplorer";
import { RightSummary } from "../RightSummary/RightSummary";
import { PanelContainer } from "./panel.styles";
import GlobalStyles from "../../../styles/global-styles/global-styles";
import NavBar from "../NavBar/NavBar";
import { IProjectService } from "../../../types/project/project-service.types";
import moment from "moment";

export const PanelContent: React.FC<{
  project: any;
}> = ({ project }) => {
  const [summaries, setSummaries] = useState<any[]>([]);
  const [activeSummary, setActiveSummary] = useState<any>(null);

  useEffect(() => {
    const summaryService = project.getSummaryService();
    const a = summaryService.onSummariesUpdated.subscribe((summaries: any) => {
      setSummaries(summaries);
    });
    const b = summaryService.activeSummary$.subscribe((summary: any) =>
      setActiveSummary(summary)
    );

    return () => {
      a.unsubscribe();
      b.unsubscribe();
    };
  }, [project]);

  console.log("activeSummary", activeSummary);

  const onSelectSummary = (id: string) => {
    const summaryService = project.getSummaryService();
    summaryService.setActiveSummary(id);
  };

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
            <LeftExplorer
              summaries={summaries}
              activeSummary={activeSummary}
              onSelect={onSelectSummary}
            />

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
                  {activeSummary && (
                    <Box>
                      {`It was updated ${moment(
                        activeSummary.updated_at
                      ).fromNow()}`}
                    </Box>
                  )}

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
              <RightSummary activeSummary={activeSummary} />
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

export const Panel: React.FC<{
  project: any;
}> = ({ project }) => {
  if (!project) {
    return null;
  }

  return <PanelContent project={project} />;
};
