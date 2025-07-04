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
import { GoogleIcon, FacebookIcon } from "../components/CustomIcons.jsx";

import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Snackbar } from "@mui/material";
import { AuthContext } from "../contexts/AuthContext.jsx";

const Card = styled(MuiCard)(({ theme }) => ({
  margin: "1rem 0",
  backgroundColor: "#1e1e2f",
  backdropFilter: "blur(10px)",
  border: "2px solid rgba(255, 255, 255, 0.2)",
  color: "#d1d1e0",
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

export default function SignUp(props) {

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [error, setError] = React.useState();
  const [message, setMessage] = React.useState();
  const [open, setOpen] = React.useState(false);

  const router = useNavigate();

  const { handleRegister } = React.useContext(AuthContext);

  let handleSignup = async (e) => {
    e.preventDefault();

    try {
      let result = await handleRegister(name, username, password);
      console.log(result);
      setMessage(result);
      setOpen(true);
      setError("");
      setName("");
      setUsername("");
      setPassword("");

      router("/auth");
      
    } catch (err) {
      let message = err.response.data.message;
      setError(message);
    }
  };

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
          Sign up
        </Typography>
        <Box
          component="form"
          autoComplete="off"
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 2,
          }}
        >
          <FormControl>
            <FormLabel style={{ color: "#d1d1e0" }}>
              Full name
            </FormLabel>
            <TextField
              size="small"
              name="name"
              required
              fullWidth
              variant="outlined"
              id="name"
              placeholder="Enter you full name"
              autoComplete="off"
              value={name}
              sx={{
                color: "black",
                backgroundColor: "#d1d1e0",
                borderRadius: "12px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  backgroundColor: "#1e1e2f",
                  color: "white",
                  "& fieldset": {
                    borderColor: "#555",
                  },
                  "&:hover fieldset": {
                    borderColor: "#888",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#a855f7",
                  },
                },
                "& input": {
                  color: "white",
                },
                "& label": {
                  color: "#aaa",
                },
                "& label.Mui-focused": {
                  color: "#a855f7",
                },
              }}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel style={{ color: "#d1d1e0" }}>
              Username
            </FormLabel>
            <TextField
              size="small"
              required
              fullWidth
              id="username"
              placeholder="Enter you username"
              name="username"
              variant="outlined"
              autoComplete="new-username"
              value={username}
              sx={{
                color: "black",
                backgroundColor: "#d1d1e0",
                borderRadius: "12px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  backgroundColor: "#1e1e2f",
                  color: "white",
                  "& fieldset": {
                    borderColor: "#555",
                  },
                  "&:hover fieldset": {
                    borderColor: "#888",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#a855f7",
                  },
                },
                "& input": {
                  color: "white",
                },
                "& label": {
                  color: "#aaa",
                },
                "& label.Mui-focused": {
                  color: "#a855f7",
                },
              }}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel style={{ color: "#d1d1e0" }}>
              Password
            </FormLabel>
            <TextField
              size="small"
              required
              fullWidth
              name="password"
              placeholder="••••••"
              type="password"
              id="password"
              variant="outlined"
              value={password}
              sx={{
                color: "black",
                backgroundColor: "#d1d1e0",
                borderRadius: "12px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  backgroundColor: "#1e1e2f",
                  color: "white",
                  "& fieldset": {
                    borderColor: "#555",
                  },
                  "&:hover fieldset": {
                    borderColor: "#888",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#a855f7",
                  },
                },
                "& input": {
                  color: "white",
                },
                "& label": {
                  color: "#aaa",
                },
                "& label.Mui-focused": {
                  color: "#a855f7",
                },
              }}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <FormControlLabel
            sx={{
              color: "#d1d1e0", 
              "&.Mui-checked": {
                color: " #7f5af0", 
              },
            }}
            control={<Checkbox value="allowExtraEmails" color="primary" />}
            label="I want to receive updates via email."
          />

          <p style={{ color: "red" }}>{error}</p>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={handleSignup}
            sx={{
              textTransform: "none",
              borderRadius: "0.5rem",
              backgroundColor: " #7f5af0",
            }}
          >
            Sign up
          </Button>
        </Box>
        <Typography sx={{ textAlign: "center" }}>
          Already have an account?{" "}
          <Link
            component={RouterLink}
            to="/auth"
            variant="body2"
            sx={{ alignSelf: "center", color: " #7f5af0", textDecoration: "none" }}
          >
            Sign in
          </Link>
        </Typography>
        <Divider
  sx={{
    color: '#d1d1e0',       
    '&::before, &::after': {
      borderColor: '#444',  
    },
  }}
>
  or
</Divider>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => alert("Sign up with Google")}
            startIcon={<GoogleIcon />}
            sx={{
              color: "#d1d1e0",
              borderColor: "#d1d1e0",
              textTransform: "none",
              fontWeight: 500,
              fontSize: "0.9rem",
              fontFamily: "Roboto, sans-serif",
              letterSpacing: "0.5px",
              borderRadius: "5rem",
              "&:hover": {
                color: "black",
                borderColor: "none",
                backgroundColor: "#d1d1e0",
              },
            }}
          >
            Sign up with Google
          </Button>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => alert("Sign up with Facebook")}
            startIcon={<FacebookIcon />}
            sx={{
              color: "#d1d1e0",
              borderColor: "#d1d1e0",
              textTransform: "none",
              fontWeight: 500,
              fontSize: "0.9rem",
              fontFamily: "Roboto, sans-serif",
              letterSpacing: "0.5px",
              borderRadius: "5rem",
              "&:hover": {
                color: "black",
                borderColor: "none",
                backgroundColor: "#d1d1e0",
              },
            }}
          >
            Sign up with Facebook
          </Button>
        </Box>
      </Card>

      <Snackbar open={open} autoHideDuration={4000} message={message} />
    </Box>
  );
}
