import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lightTheme } from "./themes";
import TourEditor from "./views/TourEditor";
import Homepage from "./views/Homepage";
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
          <Route path="/" element={<TourEditor />} />
          {/* <Route path="/home" element={<Homepage />} /> */}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
