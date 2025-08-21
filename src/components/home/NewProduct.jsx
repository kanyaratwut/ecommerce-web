import React, { useEffect, useState } from "react";
import { listProductBy } from "../../api/product";
import ProductCard from "../card/ProductCard";
import SwiperShowProduct from "../../utils/SwiperShowProduct";
import { SwiperSlide } from "swiper/react";

const NewProduct = () => {
  const [newProduct, setNewProduct] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    listProductBy("updatedAt", "desc", 12)
      .then((res) => {
        console.log(res);
        setNewProduct(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <SwiperShowProduct>
      {newProduct?.map((product) => (
        <SwiperSlide>
          <ProductCard key={product._id} product={product} />
        </SwiperSlide>
      ))}
    </SwiperShowProduct>
  );
};

export default NewProduct;
