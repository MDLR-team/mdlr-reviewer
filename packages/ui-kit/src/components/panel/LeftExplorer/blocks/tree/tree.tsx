import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TreeItem from "../tree-item/tree-item";
import { LeftExplorerProps } from "../../LeftExplorer";

const Tree: React.FC<LeftExplorerProps> = ({
  summaries,
  activeSummary,
  onSelect,
}) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {summaries.map((item) => {
        const isActive = activeSummary && activeSummary.id === item.id;

        return (
          <TreeItem
            key={item.id}
            item={item}
            isActive={isActive}
            onSelect={onSelect}
          />
        );
      })}
    </Box>
  );
};

export default Tree;
