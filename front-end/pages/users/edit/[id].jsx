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

const style = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
};

export default function Id({ users, roles }) {
  const [open, setOpen] = React.useState(false);
  let router = useRouter();
  async function submitHandler(e) {
    e.preventDefault();
    await axios.put("http://13.250.98.180:3002/users", {
      id: e.target.id.value,
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      email: e.target.email.value,
      address: e.target.address.value,
      phone: +e.target.phone.value,
      role_id: e.target.role.value,
    });
    await setOpen(true);
    await router.push("/users");
  }
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <div style={style}>
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
      <Button href="/users" variant="contained" color="success">
        Back
      </Button>
      <h1>Edit User</h1>
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
          defaultValue={users[0].id}
          InputProps={{ readOnly: true }}
          focused
        />
        <TextField
          label="First Name"
          variant="standard"
          color="success"
          name="firstName"
          defaultValue={users[0].firstName}
          focused
        />
        <TextField
          label="Last Name"
          variant="standard"
          color="success"
          name="lastName"
          defaultValue={users[0].lastName}
          focused
        />
        <TextField
          label="Email"
          variant="standard"
          color="success"
          name="email"
          defaultValue={users[0].email}
          focused
        />
        <TextField
          label="Address"
          variant="standard"
          color="success"
          name="address"
          defaultValue={users[0].address}
          focused
        />
        <TextField
          label="Phone"
          variant="standard"
          color="success"
          name="phone"
          defaultValue={users[0].phone}
          focused
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

export async function getStaticPaths() {
  const res = await axios.get(`http://13.250.98.180:3002/users`);
  return {
    fallback: false,
    paths: res.data.data.map((user) => ({
      params: {
        id: user.id.toString(),
      },
    })),
  };
}

export async function getStaticProps({ params }) {
  const res = await axios.get(`http://13.250.98.180:3002/users/${params.id}`);
  const roles = await axios.get(`http://13.250.98.180:3002/roles`);
  return {
    props: {
      users: res.data.data,
      roles: roles.data.data,
    },
  };
}
