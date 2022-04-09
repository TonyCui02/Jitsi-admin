import {
    Box,
    Button, CssBaseline, Grid,
    Link,
    Paper, TextField,
    Typography
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const LoginPage = () => {
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
            Sign in to continue
          </Typography>
          <Box component="form" noValidate sx={{ mt: 4 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
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
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link component={RouterLink} to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginPage;
