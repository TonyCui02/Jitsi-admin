import { useTheme } from "@emotion/react";
import { Container } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import TopNavbar from "../components/TopNavbar";
import PresentView from "../views/PresentView";

const HomePageLayout = ({ children }) => {
  const theme = useTheme();
  const [presentMode, setPresentMode] = useState(false);

  return (
    <>
      {presentMode ? (
        <PresentView setPresentMode={setPresentMode} />
      ) : (
        <Box
          sx={{
            backgroundColor: theme.palette.grey[200],
            height: "100%",
            minHeight: "100vh",
          }}
        >
          <TopNavbar setPresentMode={setPresentMode}/>
          <Container maxWidth="md">{children}</Container>
        </Box>
      )}
    </>
  );
};

export default HomePageLayout;
