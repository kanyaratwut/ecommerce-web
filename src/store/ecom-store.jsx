import axios from "axios";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "react-toastify";
import _ from "lodash";

import { listCategory } from "../api/Category";
import { listProduct, searchFilters } from "../api/product";

const ecomStore = (set, get) => ({
  user: null,
  token: null,
  categories: [],
  products: [],
  carts: [],
  logout: () => {
    set({
      user: null,
      token: null,
      categories: [],
      products: [],
      carts: [],
    });
  },
  actionAddToCart: (product) => {
    const carts = get().carts; // ดึงค่า carts จาก store
    const updateCart = [...carts, { ...product, count: 1 }]; //... operater space

    //Uniqe สินค้าเดียวกันไม่ควรเพิ่มซ้ำได้
    const uniqe = _.unionWith(updateCart, _.isEqual);

    set({
      carts: uniqe,
    });
  },
  actionUpdateQuantity: (productId, newQuantity) => {
    set((state) => ({
      //state คือค่าเดิม
      carts: state.carts.map((cart) =>
        cart.id === productId
          ? { ...cart, count: Math.max(1, newQuantity) } //หาค่า max เพื่อให้เราไม่ต้องเช็คว่ามีค่าน้อยกว่า 1 หรือยัง
          : cart
      ),
    }));
  },
  actionRemoveProduct: (productId) => {
    set((state) => ({
      //state คือค่าเดิม
      carts: state.carts.filter((cart) => cart.id !== productId),
    }));
  },
  getTotalPrice: () => {
    return get().carts.reduce(
      (total, cart) => {
        return total + cart.price * cart.count;
      },
      0 // ค่าเริ่มต้น
    );
  },
  actionLogin: async (form) => {
    const res = await axios.post("https://ecommerce-api-rosy-alpha.vercel.app/api/login", form);
    set({
      user: res.data.payload,
      token: res.data.token,
    });
    return res;
  },
  getCategory: async () => {
    listCategory()
      .then((res) => {
        set({ categories: res.data });
      })
      .catch((err) => toast.error("Failed"));
  },
  getProducts: async (count) => {
    listProduct(count)
      .then((res) => {
        set({ products: res.data });
      })
      .catch((err) => toast.error("Failed"));
  },
  actionSearchFilters: async (arg) => {
    searchFilters(arg)
      .then((res) => {
        set({ products: res.data });
      })
      .catch((err) => toast.error("Failed"));
  },
  clearCart: () => {
    set({ carts: [] });
  },
});

const usePersist = {
  name: "ecom-store",
  storage: createJSONStorage(() => localStorage),
};

const useEcomStore = create(persist(ecomStore, usePersist));

export default useEcomStore;
