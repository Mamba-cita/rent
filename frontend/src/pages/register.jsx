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
      context.login(userData);

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
    variables: { registerInput: values },
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
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            padding: "40px",
            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
            border: "1px solid #ddd",
          }}
        >
          {/* Title and description */}
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#333" }}
          >
            Register To HAO
          </Typography>
          <Typography
            variant="body1"
            align="center"
            gutterBottom
            sx={{ color: "#666" }}
          >
            HAO is a comprehensive house management system designed to simplify property managements.
          </Typography>

          {/* Form Fields */}
          <Stack spacing={3}>
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
              type="password"
              onChange={onChange}
              fullWidth
            />
            <TextField
              label="Confirm Password"
              variant="outlined"
              name="confirmPassword"
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
              {loading ? "Registering..." : "Register"}
            </Button>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
}
