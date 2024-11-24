import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TreeItem from "../tree-item/tree-item";

const Tree = () => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {[
        { id: "1", title: "Summary 1" },
        { id: "2", title: "Summary 2" },
        { id: "3", title: "Summary 3" },
      ].map((item) => {
        const isActive = false;

        return <TreeItem key={item.id} item={item} isActive={isActive} />;
      })}
    </Box>
  );
};

export default Tree;
