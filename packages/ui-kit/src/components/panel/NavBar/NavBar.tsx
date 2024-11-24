import FolderIcon from "../../../primitives/icons/folder-icon";
import SearchIcon from "../../../primitives/icons/search-icon";
import SidebarIcon from "../../../primitives/icons/sidebar-icon";
import { Box, IconButton } from "@mui/material";
//import { useLeftSidebar } from "../../use-left-sidebar";
//import { useGlobalStates } from "@/components/services/project-services/global-states-service/global-states-provider";

const NavBar = () => {
  /* const { isExplorerOpen, handleExplorerToggle } = useLeftSidebar();
  const { globalStatesService } = useGlobalStates(); */

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "45px",
        minHeight: "45px",
        justifyContent: "space-between",
        backgroundColor: "#FCFCFC",
        borderBottom: "var(--mr-border)",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          gap: "var(--mr-gap-m)",
          alignItems: "center",
          paddingLeft: "10px",
          pointerEvents: "all",
        }}
      >
        <IconButton
          sx={{
            transform: "scale(var(--mr-icon-scale))",
          }}
          //data-active={isExplorerOpen ? "true" : "false"}
          //onClick={handleExplorerToggle}
        >
          <FolderIcon />
        </IconButton>

        <IconButton
          sx={{
            transform: "scale(var(--mr-icon-scale))",
          }}
        >
          <SearchIcon />
        </IconButton>
      </Box>

      <Box
        sx={{
          minWidth: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <IconButton
          sx={{
            transform: "scale(var(--mr-icon-scale))",
          }}
          //onClick={() => globalStatesService.toggleNotePanel()}
        >
          <SidebarIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default NavBar;
