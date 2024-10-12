import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useForm } from "../utility/hooks";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { REGISTER_USER } from "../mutations/userMutation";

import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Stack,
  Alert,
} from "@mui/material";

export default function Register() {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  function registerUserCallback() {
    console.log("Callback Hit");
    registerUser();
  }

  const { onChange, onSubmit, values } = useForm(registerUserCallback, {
    username: "",
    email: "",
    tel: "",
    id_no: "",
    password: "",
    confirmPassword: "",
  });

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { registerUser: userData } }) {
      context.login(userData); // Store user data in context
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
    variables: { registerInput: values },
  });

  return (
    <Container spacing={2} maxWidth="sm">
      <h3>Register</h3>
      <p>This is register test</p>

      <Stack spacing={2} padding={2}>
        <TextField
          label="Username"
          variant="outlined"
          name="username"
          onChange={onChange}
          fullWidth
        />
        <TextField
          label="Email"
          variant="outlined"
          name="email"
          onChange={onChange}
          fullWidth
        />
        <TextField
          label="Tel"
          variant="outlined"
          name="tel"
          onChange={onChange}
          fullWidth
        />
        <TextField
          label="ID Number"
          variant="outlined"
          name="id_no"
          onChange={onChange}
          fullWidth
        />
        <TextField
          label="Password"
          variant="outlined"
          name="password"
          onChange={onChange}
          fullWidth
        />
        <TextField
          label="Confirm Password"
          variant="outlined"
          name="confirmPassword"
          onChange={onChange}
          fullWidth
        />
      </Stack>
      {errors.map((error) => (
        <Alert severity="error" key={error.message}>
          {error.message}
        </Alert>
      ))}
      <Box padding={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={onSubmit}
          disabled={loading}
        >
          Register
        </Button>
      </Box>
    </Container>
  );
}
