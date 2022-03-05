import { useTheme } from "@emotion/react";
import { Container } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import TopNavbar from "../components/TopNavbar";
import PresentView from "../views/PresentView";

const HomePageLayout = ({ children }) => {
  return <>{children}</>;
};

export default HomePageLayout;
