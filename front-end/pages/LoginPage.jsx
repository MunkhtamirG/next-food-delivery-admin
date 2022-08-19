import React, { useState } from "react";
import { Button, Stack, Snackbar, Alert, Box, TextField } from "@mui/material";
import axios from "axios";

export default function LoginPage({ setUser }) {
  const [open, setOpen] = React.useState(false);
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [register, setRegister] = useState(false);
  const [alertMsg, setAlertMsg] = useState();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  function submitHandler(e) {
    e.preventDefault();

    axios
      .post("http://13.250.98.180:3002/users/login", {
        email: e.target.email.value,
        password: e.target.password.value,
      })
      .then((res) => {
        if (res.status === 200) {
          setUser(res.data.data);
          window.localStorage.setItem(
            "user",
            JSON.stringify({
              email: res.data.data.email,
              token: res.data.token,
            })
          );
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
          setAlertMsg("Бүртгэлгүй хэрэглэгч байна. Бүртгүүлнэ үү!");
        } else if (err.response.status === 401) {
          setAlertMsg("Нууц үг эсвэл емайл хаяг буруу байна!");
        } else {
          setAlertMsg("Амжилттай нэвтэрлээ!");
        }
        setOpen(true);
      });
  }

  function registerHandler(e) {
    e.preventDefault();

    if (e.target.password.value === e.target.password1.value) {
      axios
        .post("http://13.250.98.180:3002/users/register", {
          firstName: e.target.firstName.value,
          lastName: e.target.lastName.value,
          email: e.target.email.value,
          address: e.target.address.value,
          phone: e.target.phone.value,
          password: e.target.password.value,
        })
        .then((res) => {
          if (res.status === 200) {
            setOpenSuccess(true);
            setTimeout(() => {
              setRegister(false);
            }, 1000);
          }
        });
    } else {
      setAlertMsg("Нууц үг таарахгүй байна!");
    }

    setOpen(true);
  }

  return (
    <>
      {register == false ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <h1>Login</h1>
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert
                onClose={handleClose}
                severity="error"
                sx={{ width: "100%" }}
              >
                {alertMsg}
              </Alert>
            </Snackbar>
          </Stack>

          <div>
            <Box
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "15px",
                "& .MuiTextField-root": { width: "50ch" },
              }}
              defaultValue={""}
              spacing={2}
              onSubmit={submitHandler}
            >
              <TextField
                label="Email"
                variant="standard"
                color="success"
                name="email"
                focused
                type="email"
                required
              />
              <TextField
                label="Password"
                variant="standard"
                color="success"
                name="password"
                required
                focused
                type="password"
              />

              <Button variant="contained" color="success" type="submit">
                Нэвтрэх
              </Button>
            </Box>
            <Button
              variant="contained"
              color="success"
              style={{ width: "100%", marginTop: "15px" }}
              onClick={(e) => {
                e.preventDefault();
                setRegister(true);
              }}
            >
              Бүртгүүлэх
            </Button>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Snackbar
              open={openSuccess}
              autoHideDuration={6000}
              onClose={handleClose}
            >
              <Alert
                onClose={handleClose}
                severity="success"
                sx={{ width: "100%" }}
              >
                Амжилттай бүртгэгдлээ нэвтэрч орно уу!
              </Alert>
            </Snackbar>
          </Stack>
          <h1>Register</h1>

          <div>
            <Box
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "15px",
                "& .MuiTextField-root": { width: "50ch" },
              }}
              defaultValue={""}
              spacing={2}
              onSubmit={registerHandler}
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
                required
                focused
              />
              <TextField
                label="Email"
                variant="standard"
                color="success"
                name="email"
                required
                focused
                type="email"
              />
              <TextField
                label="Address"
                variant="standard"
                color="success"
                name="address"
                required
                focused
              />
              <TextField
                label="Phone Number"
                variant="standard"
                color="success"
                name="phone"
                required
                focused
                type="number"
              />
              <TextField
                required
                label="Password"
                variant="standard"
                color="success"
                name="password"
                focused
                type="password"
              />
              <TextField
                required
                label="Password again"
                variant="standard"
                color="success"
                name="password1"
                focused
                type="password"
              />

              <Button
                variant="contained"
                color="success"
                style={{ width: "100%", marginTop: "15px" }}
                type="submit"
              >
                Бүртгүүлэх
              </Button>
            </Box>
            <Button
              variant="contained"
              color="success"
              style={{ width: "100%", marginTop: "15px" }}
              onClick={() => {
                setRegister(false);
              }}
            >
              Нэвтрэх
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
