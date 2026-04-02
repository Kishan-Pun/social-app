import { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    let newErrors = {};

    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!form.email.includes("@")) {
      newErrors.email = "Invalid email";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Minimum 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    try {
      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/feed");
    } catch (err) {
      setErrors({ api: err.response?.data?.msg || "Error" });
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" mt={5}>
        Login
      </Typography>

      <TextField
        fullWidth
        label="Email"
        margin="normal"
        error={!!errors.email}
        helperText={errors.email}
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <TextField
        fullWidth
        label="Password"
        type="password"
        margin="normal"
        error={!!errors.password}
        helperText={errors.password}
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

      {errors.api && (
        <Typography color="error">{errors.api}</Typography>
      )}

      <Button fullWidth variant="contained" onClick={handleLogin}>
        Login
      </Button>

      <Typography mt={2} align="center">
        Don’t have an account?{" "}
        <Link to="/signup">Signup</Link>
      </Typography>
    </Container>
  );
}