import React from "react";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import Typography from "@mui/material/Typography";

export default function footer() {
  return (
    <div
      style={{
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        color: "black",
        alignItems: "center",
      }}
    >
      <LunchDiningIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
      <Typography
        variant="h6"
        noWrap
        component="a"
        href="/"
        sx={{
          mr: 2,
          display: { xs: "none", md: "flex" },
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        Food Delivery
      </Typography>
    </div>
  );
}
