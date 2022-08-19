import axios from "axios";
import * as React from "react";
import { Box, TextField, Button, Stack, Snackbar, Alert } from "@mui/material";
import { useRouter } from "next/router";

export default function add() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  function submitHandler(e) {
    e.preventDefault();
    if (e.target.password.value === e.target.password1.value) {
      axios.post("http://13.250.98.180:3002/users/register", {
        firstName: e.target.firstName.value,
        lastName: e.target.lastName.value,
        email: e.target.email.value,
        address: e.target.address.value,
        phone: e.target.phone.value,
        password: e.target.password.value,
      });
      router.push("/users");
    }
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
        height: "100%",
      }}
    >
      <Button href="/users" variant="contained" color="success">
        Back
      </Button>
      <h1>Add User</h1>
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
        autoComplete="off"
        onSubmit={submitHandler}
      >
        <TextField
          label="First Name"
          variant="standard"
          color="success"
          name="firstName"
          focused
          required
        />
        <TextField
          label="Last Name"
          variant="standard"
          color="success"
          name="lastName"
          focused
          required
        />
        <TextField
          label="Email"
          variant="standard"
          color="success"
          name="email"
          focused
          required
          type="email"
        />
        <TextField
          label="Address"
          variant="standard"
          color="success"
          name="address"
          focused
          required
        />
        <TextField
          label="Phone"
          variant="standard"
          color="success"
          name="phone"
          focused
          type="number"
          required
        />
        <TextField
          label="Password"
          variant="standard"
          color="success"
          name="password"
          focused
          required
          type="password"
        />
        <TextField
          label="Password again"
          variant="standard"
          color="success"
          name="password1"
          focused
          required
          type="password"
        />
        <Button variant="contained" color="success" type="submit">
          Хадгалах
        </Button>
      </Box>
    </div>
  );
}
