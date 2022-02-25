import CloseIcon from "@mui/icons-material/Close";
import { Container } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/system";
import { Pannellum } from "pannellum-react";
import { darkTheme } from "../themes";

const Overlay = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  position: "fixed",
  height: "100vh",
  width: "100%",
  zIndex: "10",
  left: "0",
  top: "0",
  backgroundColor: theme.palette.grey[900],
  overflowX: "hidden",
}));

const ImagePreview = ({ imageUrl, setPreviewVisible }) => {
  return (
    <ThemeProvider theme={darkTheme}>
      <Overlay>
        <IconButton
          //   size="large"
          sx={{ position: "absolute", top: "14px", right: "14px" }}
          aria-label="close"
          onClick={() => setPreviewVisible(false)}
        >
          <CloseIcon fontSize="large" />
        </IconButton>
        <Container>
          <Pannellum
            width="100%"
            height="800px"
            maxHfov="120"
            image={imageUrl}
            autoLoad
            author=""
            title=""
            orientationOnByDefault={false}
            draggable
            keyboardZoom
            mouseZoom
            preview=""
            previewAuthor=""
            previewTitle=""
            showControls
            showFullscreenCtrl
            showZoomCtrl
            onLoad={() => {
              console.log("panorama loaded");
            }}
            onScenechange={(id) => {
              console.log("Scene has change on " + id);
            }}
            onScenechangefadedone={() => {
              console.log("panorama loaded");
            }}
            onError={(err) => {
              console.log("Error", err);
            }}
            onErrorcleared={() => {
              console.log("Error Cleared");
            }}
            onMousedown={(evt) => {
              console.log("Mouse Down", evt);
            }}
            onMouseup={(evt) => {
              console.log("Mouse Up", evt);
            }}
            onTouchstart={(evt) => {
              console.log("Touch Start", evt);
            }}
            onTouchend={(evt) => {
              console.log("Touch End", evt);
            }}
            hotspotDebug={false}
          >
            <Pannellum.Hotspot
              type="info"
              text="Info Hotspot Text 3"
              URL="https://github.com/farminf"
            />
            <Pannellum.Hotspot
              type="custom"
              handleClick={(evt, args) => this.hanldeClickImage(evt, args)}
              handleClickArg={{ name: "test" }}
            />
          </Pannellum>
        </Container>
      </Overlay>
    </ThemeProvider>
  );
};

export default ImagePreview;
