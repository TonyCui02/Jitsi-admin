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

export default function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/tours/:tourId" element={<TourEditor />}/>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
