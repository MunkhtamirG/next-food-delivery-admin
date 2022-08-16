import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import { useRouter } from "next/router";

export default function Navbar() {
  const pages = ["Categories", "Foods", "Users", "Roles"];

  const router = useRouter();
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <LunchDiningIcon sx={{ display: { xs: "", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Food Delivery
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "flex" },
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex" }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => {
                    if (page == "Categories") {
                      router.push("/category");
                    } else if (page == "Foods") {
                      router.push("/food");
                    } else if (page == "Roles") {
                      router.push("/roles");
                    } else {
                      router.push("/users");
                    }
                  }}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </div>
            <Button
              variant="contained"
              color="warning"
              style={{ color: "white", margin: "5px" }}
              onClick={() => {
                window.localStorage.removeItem("user");
                window.location.reload();
              }}
            >
              Log Out
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
