import React, { useEffect, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import useEcomStore from "../../store/ecom-store";
import { numberFormat } from "../../utils/number";

const SearchCard = () => {
  const getProducts = useEcomStore((state) => state.getProducts);
  const products = useEcomStore((state) => state.products);
  const actionSearchFilters = useEcomStore(
    (state) => state.actionSearchFilters
  );
  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);

  const [text, setText] = useState("");
  const [categorySelected, setCategorySelected] = useState([]);
  const [price, setPrice] = useState([1000, 30000]);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    getCategory();
  }, []);

  //Search Text
  useEffect(() => {
    const delay = setTimeout(() => {
      if (text) {
        actionSearchFilters({ query: text });
      } else {
        getProducts(20);
      }
    }, 300);

    return () => clearTimeout(delay); //clean up
  }, [text]);

  //Search Category
  const handleCheck = (e) => {
    const inCheck = e.target.value; //ค่าที่ติ๊ก
    const inState = [...categorySelected]; // []
    const findCheck = inState.indexOf(inCheck); // ถ้าไม่เจอจะ return -1

    if (findCheck === -1) {
      inState.push(inCheck);
    } else {
      inState.splice(findCheck, 1);
    }

    setCategorySelected(inState);

    if (inState.length > 0) {
      actionSearchFilters({ category: inState });
    } else {
      getProducts(20);
    }
  };

  //Search Price
  useEffect(() => {
    actionSearchFilters({ price: price });
  }, [ok]); // dependency []

  const handlePrice = (value) => {
    setPrice(value);
    setTimeout(() => {
      setOk(!ok); //toggle
    }, 300);
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">ค้นหาสินค้า</h1>
      {/* Search Bar */}
      <input
        onChange={(e) => setText(e.target.value)}
        className="border rounded-md w-full mb-4 px-2"
        placeholder="ค้นหาสินค้า..."
      />
      <hr />

      {/* Search Category */}
      <div className="mt-4">
        <h1>หมวดหมู่สินค้า</h1>
        <div>
          {categories.map((category, index) => (
            <div key={index} className="flex gap-2">
              <input
                className="border"
                type="checkbox"
                value={category.id}
                onChange={handleCheck}
              />
              <label>{category.name}</label>
            </div>
          ))}
        </div>
      </div>
      <hr />

      {/* Search Price */}
      <div className="mt-4">
        <h1>ค้นหาราคาสินค้า</h1>
        <div>
          <div className="flex justify-between">
            <span>Min: {numberFormat(price[0])}</span>
            <span>Max: {numberFormat(price[1])}</span>
          </div>
          <Slider
            onChange={handlePrice}
            range
            min={0}
            max={100000}
            defaultValue={[1000, 30000]}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchCard;
