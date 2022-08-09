import axios from "axios";
import * as React from "react";
import { Box, TextField, Button, Stack, Snackbar, Alert } from "@mui/material";
import { useRouter } from "next/router";

export default function add({}) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  function submitHandler(e) {
    e.preventDefault();
    axios.post("http://18.141.207.7:3002/roles", {
      id: e.target.id.value,
      role_name: e.target.role_name.value,
      role_description: e.target.role_description.value,
    });
    router.push("/roles");
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
      <Button href="/roles" variant="contained" color="success">
        Back
      </Button>
      <h1>Add Role</h1>
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
          label="ID"
          variant="standard"
          color="success"
          name="id"
          focused
        />
        <TextField
          label="Role Name"
          variant="standard"
          color="success"
          name="role_name"
          focused
        />

        <TextField
          label="Role Description"
          variant="standard"
          color="success"
          name="role_description"
          focused
        />

        <Button variant="contained" color="success" type="submit">
          Хадгалах
        </Button>
      </Box>
    </div>
  );
}
