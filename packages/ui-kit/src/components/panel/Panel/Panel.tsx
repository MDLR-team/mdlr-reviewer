import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { LeftExplorer } from "../LeftExplorer/LeftExplorer";
import { RightSummary } from "../RightSummary/RightSummary";
import { PanelContainer } from "./panel.styles";
import GlobalStyles from "../../../styles/global-styles/global-styles";
import NavBar from "../NavBar/NavBar";
import { IProjectService } from "../../../types/project/project-service.types";
import moment from "moment";
import Actions from "../Actions-Area/Actions/Actions";
import ActionsArea from "../Actions-Area/actions-area";
import { PanelProvider } from "./hooks/use-panel";
import { RefreshArea } from "../Refresh-Area/Refresh-Area";

export const PanelContent: React.FC<{
  project: any;
}> = ({ project }) => {
  const [summaries, setSummaries] = useState<any[]>([]);
  const [activeSummary, setActiveSummary] = useState<any>(null);

  const summaryService = project.getSummaryService();

  useEffect(() => {
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

  const onSelectSummary = (id: string) => {
    const summaryService = project.getSummaryService();
    summaryService.setActiveSummary(id);
  };

  return (
    <>
      <GlobalStyles />

      <PanelProvider project={project}>
        <Box
          className="mdlr-reviewer-panel"
          sx={{
            position: "relative",
            height: "100%",
            maxHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            pointerEvents: "all",
            //padding: "var(--mr-gap-m) 0px var(--mr-gap-m) var(--mr-gap-m)",
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
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    pointerEvents: "none",
                    padding: "var(--mr-gap-l)",
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "center",
                    width: "100%",
                    height: "100%",
                    zIndex: 50,
                  }}
                >
                  <ActionsArea project={project} />
                </Box>

                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "white",
                  }}
                >
                  {/* Actions */}
                  <RefreshArea />
                  {/* Right Summary */}
                  <RightSummary activeSummary={activeSummary} />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </PanelProvider>

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
