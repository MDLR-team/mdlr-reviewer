import React, { useMemo } from "react";
import { Avatar as MuiAvatar } from "@mui/material";

const Avatar: React.FC<{
  username: string;
  size: "xxl" | "large" | "small";
  isCount?: boolean;
  isCopilot?: boolean;
}> = ({ username, size, isCount, isCopilot }) => {
  const initials = useMemo(() => getInitials(username), [username]);
  const color = useMemo(() => "lightgrey", [username]);

  const avatarSize = {
    xxl: 52,
    large: 32,
    small: 24,
  };

  const avatarFontSize = {
    xxl: 22,
    large: 14,
    small: 10,
  };

  return (
    <MuiAvatar
      sx={{
        width: avatarSize[size],
        height: avatarSize[size],
        fontSize: avatarFontSize[size],
        ...(isCopilot
          ? {
              background:
                "linear-gradient(97deg, #4168FF 0%, #AB62F8 58%, #F4A700 100%)",
            }
          : isCount
            ? { backgroundColor: "darkgrey" }
            : { backgroundColor: color }),
        color: "#FFFFFF", // Ensure the text color is white
      }}
    >
      {isCount ? username : initials}
    </MuiAvatar>
  );
};

export const getInitials = (username: string) => {
  const nameParts = username!.split(" ");
  if (nameParts.length > 1) {
    return nameParts[0].charAt(0).toUpperCase();
  } else {
    return nameParts[0].charAt(0).toUpperCase();
  }
};

export default Avatar;
