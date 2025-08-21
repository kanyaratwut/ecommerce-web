import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import axios from "axios";
import { toast } from "react-toastify";

const ContentCarousel = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    handleGetImages();
  }, []);

  const handleGetImages = () => {
    axios
      .get("https://picsum.photos/v2/list?page=1&limit=15")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  return (
    <div>
      <Swiper
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={true}
        modules={[Pagination, Autoplay]}
        className="mySwiper max-h-80 rounded-md mb-4"
      >
        {data?.map((item, index) => (
          // ? optional chaining
          <SwiperSlide key={index}>
            <img src={item.download_url} alt={item.author} />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        slidesPerView={5}
        spaceBetween={10}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={true}
        pagination={true}
        modules={[Pagination, Autoplay, Navigation]}
        className="mySwiper rounded-md"
      >
        {data?.map((item, index) => (
          // ? optional chaining
          <SwiperSlide key={index}>
            <img
              src={item.download_url}
              alt={item.author}
              className="rounded-md"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ContentCarousel;
