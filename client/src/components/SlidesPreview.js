// import Swiper core and required modules
import { Container } from "@mui/material";
import { Box, styled } from "@mui/system";
import { Pannellum, PannellumVideo } from "pannellum-react";
import { useState } from "react";
import {
  FreeMode, Navigation,
  Pagination, Thumbs
} from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Swiper, SwiperSlide } from "swiper/react";
import "./styles.css";




const PreviewImage = styled("img")(() => ({
  display: "block",
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: "12px",
  cursor: "pointer",
}));

const PreviewVideo = styled("video")(() => ({
  display: "block",
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: "12px",
  cursor: "pointer",
}));

const SlidesPreview = ({ items, setActiveIndex }) => {
  console.log(items);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [swiper, setSwiper] = useState(null);

  return (
    <Box sx={{ px: 5, flex: 1 }}>
      <Swiper
        modules={[Navigation, Pagination, Thumbs]}
        spaceBetween={100}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true, type: "fraction" }}
        thumbs={{ swiper: thumbsSwiper }}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        onSwiper={(swiper) => setActiveIndex(swiper.activeIndex)}
        allowTouchMove={false}
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            <Container sx={{ my: "40px" }}>
              {item.mediaType === "video" && (
                <PannellumVideo
                  video={item.imgUrl}
                  loop
                  autoplay
                  controls
                  width="100%"
                  height="600px"
                  pitch={10}
                  yaw={180}
                  hfov={120}
                  maxHfov={120}
                ></PannellumVideo>
              )}
              {item.mediaType === "image" && (
                <Pannellum
                  width="100%"
                  height="600px"
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
                    handleClick={(evt, args) =>
                      this.hanldeClickImage(evt, args)
                    }
                    handleClickArg={{ name: "test" }}
                  />
                </Pannellum>
              )}
            </Container>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        modules={[FreeMode, Navigation, Thumbs]}
        spaceBetween={24}
        slidesPerView={5}
        freeMode={true}
        watchSlidesProgress={true}
        // onSwiper={(swiper) => console.log(swiper)}
        onSwiper={setThumbsSwiper}
        onSlideChange={() => console.log("slide change")}
        className="mySwiper"
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            {item.mediaType === "image" && <PreviewImage src={item.imgUrl} />}
            {item.mediaType === "video" && <PreviewVideo src={item.imgUrl} />}
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default SlidesPreview;
