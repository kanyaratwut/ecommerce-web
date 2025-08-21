import React, { useEffect, useState } from "react";
import { listProductBy } from "../../api/product";
import ProductCard from "../card/ProductCard";
import SwiperShowProduct from "../../utils/SwiperShowProduct";
import { SwiperSlide } from "swiper/react";

const BestSeller = () => {
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    listProductBy("sold", "desc", 12)
      .then((res) => {
        console.log(res);
        setBestSeller(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <SwiperShowProduct SwiperShowProduct>
      {bestSeller?.map((product) => (
        <SwiperSlide>
          <ProductCard key={product._id} product={product} />
        </SwiperSlide>
      ))}
    </SwiperShowProduct>
  );
};

export default BestSeller;
