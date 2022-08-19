import axios from "axios";
import React from "react";
import { useRouter } from "next/router";
import { Button, Alert, TextField, Box, Stack, Snackbar } from "@mui/material";

export default function Id({ category }) {
  const [open, setOpen] = React.useState(false);
  let router = useRouter();

  function submitHandler(e) {
    e.preventDefault();
    axios.put("http://13.250.98.180:3002/category", {
      name: e.target.name.value,
      color: e.target.color.value,
      _id: e.target.id.value,
    });
    setOpen(true);
    router.push("/category");
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
          name="name"
          variant="standard"
          color="success"
          defaultValue={category[0].name}
          focused
        />
        <TextField
          label="ID"
          variant="standard"
          name="id"
          color="success"
          defaultValue={category[0]._id}
          focused
          InputProps={{ readOnly: true }}
        />
        <TextField
          label="Color"
          variant="standard"
          name="color"
          color="success"
          defaultValue={category[0].color}
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
  const res = await axios.get(`http://13.250.98.180:3002/category`);
  return {
    fallback: false,
    paths: res.data.data.map((category) => ({
      params: {
        id: category._id.toString(),
      },
    })),
  };
}

export async function getStaticProps({ params }) {
  const res = await axios.get(
    `http://13.250.98.180:3002/category/${params.id}`
  );
  return {
    props: {
      category: res.data.data,
    },
  };
}
