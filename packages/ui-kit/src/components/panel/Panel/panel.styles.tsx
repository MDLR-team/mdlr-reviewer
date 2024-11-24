import React from "react";
import styled from "styled-components";
import { Box, BoxProps } from "@mui/material";

// Styled component for PanelContainer
export const PanelContainer: React.FC<BoxProps> = styled(Box)`
  display: flex;
  flex-direction: row;
  height: 100%;
  border: 1px solid #ccc;
`;

// Styled component for LeftSection
export const LeftSection: React.FC<BoxProps> = styled(Box)`
  width: 30%;
  border-right: 1px solid #ccc;
`;

// Styled component for RightSection
export const RightSection: React.FC<BoxProps> = styled(Box)`
  flex: 1;
  padding: 16px;
`;
