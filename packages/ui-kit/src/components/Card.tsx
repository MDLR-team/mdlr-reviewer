import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

interface MyCardProps {
  title: string;
  content: string;
}

export const MyCard: React.FC<MyCardProps> = ({ title, content }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="body2">{content}</Typography>
      </CardContent>
    </Card>
  );
};
