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

  // Callback function to handle the login action
  function loginUserCallback() {
    console.log("Callback Hit");
    loginUser();
  }

  // Form handling
  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    email: "",
    password: "",
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { loginUser: userData } }) {
      // Store user data in context, including username
      context.login({
        username: userData.username,
        email: userData.email,
        role: userData.role,
        token: userData.token,
      });

      const userRole = userData.role;

      // Navigate based on the user role
      switch (userRole) {
        case "Admin":
          navigate("/"); // Redirect Admins to Home
          break;
        case "Tenant":
          navigate("/tenant"); // Redirect Tenants to TenantPage
          break;
        case "User":
          navigate("/user"); // Redirect Users to UserPage
          break;
        default:
          navigate("/"); // Fallback to Home if no role match is found
          break;
      }
    },
    onError({ graphQLErrors }) {
      setErrors(graphQLErrors);
    },
    variables: { loginInput: values },
  });

  return (
    <Container spacing={2} maxWidth="sm">
      <h3>Login</h3>
      <p>This is login test</p>

      <Stack spacing={2} padding={2}>
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
        <Button
          variant="contained"
          color="primary"
          onClick={onSubmit}
          disabled={loading}
        >
          {loading ? "Loading..." : "Login"}
        </Button>
        {errors.length > 0 && (
          <Alert severity="error">
            <ul>
              {errors.map((error) => (
                <li key={error.message}>{error.message}</li>
              ))}
            </ul>
          </Alert>
        )}
      </Stack>
    </Container>
  );
}
