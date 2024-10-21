import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useForm } from "../utility/hooks";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { LOGIN_USER } from "../mutations/userMutation";

import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Stack,
  Alert,
} from "@mui/material";

export default function Login() {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  function loginUserCallback() {
    loginUser();
  }

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    email: "",
    password: "",
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { loginUser: userData } }) {
      context.login({
        username: userData.username,
        email: userData.email,
        role: userData.role,
        token: userData.token,
      });

      switch (userData.role) {
        case "Admin":
          navigate("/");
          break;
        case "Tenant":
          navigate("/tenant");
          break;
        case "User":
          navigate("/user");
          break;
        default:
          navigate("/");
          break;
      }
    },
    onError({ graphQLErrors }) {
      setErrors(graphQLErrors);
    },
    variables: { loginInput: values },
  });

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Box
          width="100%"
          sx={{
            backgroundColor: "#ffffff", // Change to white background for consistency
            borderRadius: "10px",
            padding: "40px", // Match Register component padding
            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)", // Match Register component shadow
            border: "1px solid #ddd",
          }}
        >
          {/* Title */}
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#333" }} // Style for title
          >
            Login
          </Typography>
          <Typography
            variant="body1"
            align="center"
            gutterBottom
            sx={{ color: "#666" }} // Description style
          >
            Please enter your credentials to access your account.
          </Typography>

          {/* Form Fields */}
          <Stack spacing={3}>
            <TextField
              label="Email"
              variant="outlined"
              name="email"
              onChange={onChange}
              fullWidth
            />
            <TextField
              label="Password"
              variant="outlined"
              name="password"
              type="password"
              onChange={onChange}
              fullWidth
            />
            {errors.length > 0 && (
              <Alert severity="error">
                <ul>
                  {errors.map((error) => (
                    <li key={error.message}>{error.message}</li>
                  ))}
                </ul>
              </Alert>
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={onSubmit}
              disabled={loading}
              fullWidth
            >
              {loading ? "Loading..." : "Login"}
            </Button>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
}
