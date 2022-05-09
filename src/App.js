import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lightTheme } from "./themes";
import TourEditor from "./views/TourEditor";
import HomePage from "./views/HomePage";
import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import LoginPage from "./views/LoginPage";
import SignUpPage from "./views/SignUpPage";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { userContext } from "./context/userContext";
import AccountSettingsView from "./views/AccountSettingsView";

const App = ({ signOut, user }) => {
  return (
    <userContext.Provider value={user}>
      <ThemeProvider theme={lightTheme}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/*"
              element={<HomePage user={user} signOut={signOut} />}
            />
            <Route path="/tours/:tourId" element={<TourEditor user={user} />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignUpPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </userContext.Provider>
  );
};

export default withAuthenticator(App);
