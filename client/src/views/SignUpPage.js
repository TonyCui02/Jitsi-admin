import {
  Box,
  Button, CssBaseline, Grid,
  Link,
  Paper, TextField,
  Typography
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const SignUpPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        backgroundColor: "primary.main",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper sx={{ padding: "108px 84px 108px 84px", maxWidth: "680px" }}>
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h3">
            Jitsi 360 Admin
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Create an account
          </Typography>
          <Box component="form" noValidate sx={{ mt: 4 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create Account
            </Button>
            <Grid container>
              <Grid item>
                <Link component={RouterLink} to="/login" variant="body2">
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default SignUpPage;
