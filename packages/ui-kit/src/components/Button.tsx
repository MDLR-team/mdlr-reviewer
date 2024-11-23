import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

interface MyButtonProps {
  label: string;
  onClick: () => void;
}

export const MyButton: React.FC<MyButtonProps> = ({ label, onClick }) => {
  return (
    <>
      <Box>!!!!</Box>
      <Button variant="contained" onClick={onClick}>
        {label}
      </Button>
    </>
  );
};
