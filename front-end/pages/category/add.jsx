import axios from "axios";
import * as React from "react";
import { Box, TextField, Button, Stack, Snackbar, Alert } from "@mui/material";
import { useRouter } from "next/router";

export default function add() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  function submitHandler(e) {
    e.preventDefault();
    axios.post("http://18.141.207.7:3002/category", {
      name: e.target.name.value,
      color: e.target.color.value,
    });
    router.push("/category");
    setOpen(true);
  }
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Button href="/category" variant="contained" color="success">
        Back
      </Button>
      <h1>Add Categories</h1>
      <Stack sx={{ width: "100%" }} spacing={2}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Амжилттай хадгалагдлаа!
          </Alert>
        </Snackbar>
      </Stack>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          "& .MuiTextField-root": { width: "50ch" },
        }}
        spacing={2}
        noValidate
        autoComplete="off"
        onSubmit={submitHandler}
      >
        <TextField
          label="Name"
          variant="standard"
          color="success"
          name="name"
          focused
        />
        <TextField
          label="Color"
          variant="standard"
          color="success"
          name="color"
          focused
        />

        <Button variant="contained" color="success" type="submit">
          Хадгалах
        </Button>
      </Box>
    </div>
  );
}
