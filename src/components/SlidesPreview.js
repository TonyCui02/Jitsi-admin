// import Swiper core and required modules
import { Container } from "@mui/material";
import { Box, styled } from "@mui/system";
import { Pannellum, PannellumVideo } from "pannellum-react";
import { memo, useState } from "react";
import { FreeMode, Navigation, Pagination, Thumbs } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Swiper, SwiperSlide } from "swiper/react";
import PreviewSwiperSlide from "./PreviewSwiperSlide";
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

const SlidesPreview = memo(({ items, setActiveIndex }) => {
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
        {items
          .filter((item) => item.isVisible === true)
          .map((item, index) => (
            <PreviewSwiperSlide item={item} index={index} key={index} />
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
        {items
          .filter((item) => item.isVisible === true)
          .map((item, index) => (
            <SwiperSlide key={index}>
              {item.mediaType === "image" && (
                <PreviewImage src={item.imgUrl + "?x-request=html"} />
              )}
              {item.mediaType === "video" && (
                <PreviewVideo src={item.imgUrl + "?x-request=html"} />
              )}
            </SwiperSlide>
          ))}
      </Swiper>
    </Box>
  );
});

export default SlidesPreview;
