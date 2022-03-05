// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y, Thumbs } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Pannellum, PannellumVideo } from "pannellum-react";
import { Container } from "@mui/material";
import { useState } from "react";

const SlidesPreview = ({ items }) => {
  console.log(items);

  return (
    <div>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={100}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true, type: "fraction" }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
        allowTouchMove={false}
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
      >
        {items.map((item, index) => (
          <SwiperSlide>
            <Container sx={{ my: "40px" }}>
              {item.mediaType === "image" ? (
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
              ) : (
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
                  hotSpotDebug
                  mouseZoom={true}
                  showFullscreenCtrl
                  showControls
                  showZoomCtrl
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
          </SwiperSlide>
        ))}
      </Swiper>
      {/* <Swiper >
        {items.map((item, index) => (
          <SwiperSlide>{item.imgUrl}</SwiperSlide>
        ))}
      </Swiper> */}
    </div>
  );
};

export default SlidesPreview;
