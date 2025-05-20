import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MuiCard from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import ForgotPassword from "../components/ForgotPassword.jsx";
import {
  GoogleIcon,
  FacebookIcon,
} from "../components/CustomIcons.jsx";

import { Link as RouterLink } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext.jsx";
import { Snackbar } from "@mui/material";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(8),
  paddingTop: "2.5rem",
  gap: theme.spacing(2),
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "600px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

export default function Authentication() {
  // const [emailError, setEmailError] = React.useState(false);
  // const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  // const [passwordError, setPasswordError] = React.useState(false);
  // const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState();
  const [message, setMessage] = React.useState();

  const [formState, setFormState] = React.useState(0);

  const { handleLogin } = React.useContext(AuthContext);

  let handleAuth = async(e) => {
    e.preventDefault();

    try {
      let result = await handleLogin(username, password);
      setMessage(result); 
      setOpen(true);  

    } catch (err) {
      let message = err.response?.data?.message || "Login failed";
      setError(message);
    }
  }

  const handleClickOpen = () => {
    setOpen(true);    
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const handleSubmit = (event) => {
  //   if (emailError || passwordError) {
  //     event.preventDefault();
  //     return;
  //   }
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     email: data.get("email"),
  //     password: data.get("password"),
  //   });
  // };

  // const validateInputs = () => {
  //   const email = document.getElementById("email");
  //   const password = document.getElementById("password");

  //   let isValid = true;

  //   if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
  //     setEmailError(true);
  //     setEmailErrorMessage("Please enter a valid email address.");
  //     isValid = false;
  //   } else {
  //     setEmailError(false);
  //     setEmailErrorMessage("");
  //   }

  //   if (!password.value || password.value.length < 6) {
  //     setPasswordError(true);
  //     setPasswordErrorMessage("Password must be at least 6 characters long.");
  //     isValid = false;
  //   } else {
  //     setPasswordError(false);
  //     setPasswordErrorMessage("");
  //   }

  //   return isValid;
  // };

  return (
    
    <Box
      sx={{
        display: "flex",
        justifyContent: "center", 
        alignItems: "center",
        minHeight: "100vh", 
      }}
    >
      <Card variant="outlined">
        <Typography
          component="h1"
          variant="h4"
          sx={{
            width: "100%",
            fontSize: "clamp(2rem, 10vw, 2.5rem)",
            fontWeight: "500",
            textAlign: "center",
          }}
        >
          Sign in
        </Typography>
        <Box
          component="form"
          // onSubmit={handleSubmit}
          autoComplete="off"
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 2,
          }}
        >
          <FormControl>
            <FormLabel>Username</FormLabel>
            <TextField
              size="small"
              id="username"
              type="username"
              name="username"
              autoFocus
              required
              fullWidth
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <FormLabel htmlFor="password">Password</FormLabel>
            </Box>
            <TextField
              size="small"
              // error={passwordError}
              // helperText={passwordErrorMessage}
              name="password"
              placeholder="••••••"
              type="password"
              id="password"
              // autoComplete="current-password"
              // autoFocus
              required
              fullWidth
              variant="outlined"
              // color={passwordError ? "error" : "primary"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Link
              component="button"
              type="button"
              onClick={handleClickOpen}
              variant="body2"
              sx={{ cursor: "pointer" }}
            >
              Forgot your password?
            </Link>
          </Box>

          {/* <ForgotPassword open={open} handleClose={handleClose} /> */}

          <p style={{color : "red"}}>{error}</p>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={handleAuth}
            sx={{ textTransform: "none", borderRadius: "0.5rem" }}
          >
            Sign in
          </Button>
          <Typography sx={{ textAlign: "center" }}>
            Don&apos;t have an account?{" "}
            <span>
              <Link
                component={RouterLink}
                to="/signup"
                variant="body2"
                sx={{ alignSelf: "center" }}
              >
                Sign up
              </Link>
            </span>
          </Typography>
        </Box>
        <Divider>or</Divider>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => alert("Sign in with Google")}
            startIcon={<GoogleIcon />}
            sx={{
              color: "black",
              borderColor: "black",
              textTransform: "none",
              fontWeight: 500,
              fontSize: "0.9rem",
              fontFamily: "Roboto, sans-serif",
              letterSpacing: "0.5px",
              borderRadius: "5rem",
              "&:hover": {
                borderColor: "black",
                backgroundColor: "#f5f5f5",
              },
            }}
          >
            Sign in with Google
          </Button>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => alert("Sign in with Facebook")}
            startIcon={<FacebookIcon />}
            sx={{
              color: "black",
              borderColor: "black",
              textTransform: "none",
              fontWeight: 500,
              fontSize: "0.9rem",
              fontFamily: "Roboto, sans-serif",
              letterSpacing: "0.5px",
              borderRadius: "5rem",
              "&:hover": {
                borderColor: "black",
                backgroundColor: "#f5f5f5",
              },
            }}
          >
            Sign in with Facebook
          </Button>
        </Box>
      </Card>
      <Snackbar open={open} autoHideDuration={4000} message={message} />
    </Box>
    
  );
}
