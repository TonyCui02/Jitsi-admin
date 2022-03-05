import CloseIcon from "@mui/icons-material/Close";
import { Container } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/system";
import { Pannellum, PannellumVideo } from "pannellum-react";
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

const ImagePreview = ({ imgUrl, setPreviewVisible, mediaType }) => {
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
          {mediaType === "image" ? (
            <Pannellum
              width="100%"
              height="800px"
              maxHfov={150}
              image={imgUrl}
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
          ) : (
            <PannellumVideo
              video={imgUrl}
              loop
              autoplay
              controls
              width="100%"
              height="600px"
              hfov={120}
              maxHfov={120}
            >
              <Pannellum.Hotspot
                type="custom"
                pitch={31}
                yaw={150}
                handleClick={(evt, args) => this.hanldeClick(args.name)}
                handleClickArg={{ name: "video2" }}
              />

              <Pannellum.Hotspot
                type="info"
                pitch={31}
                yaw={-57}
                text="Info dfsdfs"
                URL="https://github.com/farminf"
              />
            </PannellumVideo>
          )}
        </Container>
      </Overlay>
    </ThemeProvider>
  );
};

export default ImagePreview;
