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
  height: "100vh",
};

export default function id({ roles }) {
  const [open, setOpen] = React.useState(false);
  let router = useRouter();
  async function submitHandler(e) {
    e.preventDefault();
    await axios.put("http://13.250.98.180:3002/roles", {
      id: e.target.id.value,
      role_name: e.target.role_name.value,
      role_description: e.target.role_description.value,
    });
    await setOpen(true);
    await router.push("/roles");
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
      <h1>Edit Role</h1>
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
          defaultValue={roles[0].id}
          InputProps={{ readOnly: true }}
          focused
        />
        <TextField
          label="Role Name"
          variant="standard"
          color="success"
          name="role_name"
          defaultValue={roles[0].role_name}
          focused
        />
        <TextField
          label="Role Description"
          variant="standard"
          color="success"
          name="role_description"
          defaultValue={roles[0].role_description}
          focused
        />

        <Button variant="contained" color="success" type="submit">
          Хадгалах
        </Button>
      </Box>
    </div>
  );
}

export async function getStaticPaths() {
  const res = await axios.get(`http://13.250.98.180:3002/roles`);
  return {
    fallback: false,
    paths: res.data.data.map((role) => ({
      params: {
        id: role.id.toString(),
      },
    })),
  };
}

export async function getStaticProps({ params }) {
  const res = await axios.get(`http://13.250.98.180:3002/roles/${params.id}`);

  return {
    props: {
      roles: res.data.data,
    },
  };
}
