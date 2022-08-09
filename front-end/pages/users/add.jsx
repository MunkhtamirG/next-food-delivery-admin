import axios from "axios";
import * as React from "react";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Button,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";
import { useRouter } from "next/router";

export default function add({ roles }) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  function submitHandler(e) {
    e.preventDefault();
    axios.post("http://18.141.207.7:3002/users", {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      email: e.target.email.value,
      address: e.target.address.value,
      phone: +e.target.phone.value,
      role_id: +e.target.role.value,
    });
    router.push("/users");
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
        noValidate
        autoComplete="off"
        onSubmit={submitHandler}
      >
        <TextField
          label="First Name"
          variant="standard"
          color="success"
          name="firstName"
          focused
        />
        <TextField
          label="Last Name"
          variant="standard"
          color="success"
          name="lastName"
          focused
        />

        <TextField
          label="Email"
          variant="standard"
          color="success"
          name="email"
          focused
        />
        <TextField
          label="Address"
          variant="standard"
          color="success"
          name="address"
          focused
        />
        <TextField
          label="Phone"
          variant="standard"
          color="success"
          name="phone"
          focused
          type="number"
        />
        <InputLabel id="demo-simple-select-label">Role</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Age"
          name="role"
          defaultValue={roles[0].id}
        >
          {roles.map((role) => {
            return (
              <MenuItem value={role.id} key={role.id}>
                {role.role_name}
              </MenuItem>
            );
          })}
        </Select>
        <Button variant="contained" color="success" type="submit">
          Хадгалах
        </Button>
      </Box>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const roles = await axios.get(`http://18.141.207.7:3002/roles`);
  return {
    props: {
      roles: roles.data.data,
    },
  };
}
