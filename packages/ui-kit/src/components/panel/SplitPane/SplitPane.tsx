import React from "react";
import styled from "styled-components";
import Split from "react-split";
import { Box } from "@mui/material";

export const SplitPane: React.FC<{
  children: React.ReactNode;
  sizes?: number[];
  minSize?: number;
  fullscreen?: boolean;
}> = ({ children, sizes = [40, 60], minSize = 400, fullscreen = false }) => {
  const childrenArray = React.Children.toArray(children);

  if (childrenArray.length !== 2) {
    throw new Error("Layout component must have exactly 2 children.");
  }

  return (
    <Wrapper data-fullscreen={fullscreen ? "true" : "false"}>
      <Split
        sizes={sizes}
        minSize={minSize}
        gutterSize={3}
        gutterAlign="center"
        direction="horizontal"
        style={{ display: "flex", width: "100%", height: "100%" }}
      >
        {childrenArray.map((child, index) => (
          <Box
            key={index}
            sx={{
              width: "100%",
              ...(index === 1 ? { padding: "20px" } : {}),
            }}
          >
            {child}
          </Box>
        ))}
      </Split>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #f1f0ee;

  &[data-fullscreen="true"] {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    width: 100vw;
    height: 100vh;
  }

  & .gutter.gutter-horizontal {
    background-color: rgba(0, 0, 0, 0.1);
    cursor: col-resize;

    &:hover {
      background-color: #ff4e00;
    }
  }
`;
