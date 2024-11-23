import React from "react";
import Button from "@mui/material/Button";

interface MyButtonProps {
  label: string;
  onClick: () => void;
}

export const MyButton: React.FC<MyButtonProps> = ({ label, onClick }) => {
  return (
    <Button variant="contained" onClick={onClick}>
      {label}
    </Button>
  );
};
