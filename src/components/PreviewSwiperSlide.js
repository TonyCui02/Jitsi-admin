import { Container } from "@mui/material";
import { Pannellum, PannellumVideo } from "pannellum-react";
import React, { memo } from "react";
import { SwiperSlide } from "swiper/react";

const PreviewSwiperSlide = memo(({ item, index }) => {
  return (
    <SwiperSlide key={index}>
      <Container sx={{ my: "40px", height: "60vh" }}>
        {item.mediaType === "video" && (
          <PannellumVideo
            video={item.imgUrl}
            loop
            controls
            width="100%"
            height="100%"
            pitch={10}
            yaw={180}
            hfov={120}
            maxHfov={120}
            autoplay={false}
          ></PannellumVideo>
        )}
        {item.mediaType === "image" && (
          <Pannellum
            width="100%"
            height="100%"
            maxHfov={120}
            hfov={100}
            image={item.imgUrl}
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
        )}
      </Container>
    </SwiperSlide>
  );
});

PreviewSwiperSlide.displayName = 'SwiperSlide';

export default PreviewSwiperSlide;
