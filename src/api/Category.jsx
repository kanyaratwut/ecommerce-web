import axios from "axios";

export const createCategory = async (token, form) => {
  return await axios.post("https://ecommerce-api-rosy-alpha.vercel.app/api/category", form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const listCategory = async () => {
  return await axios.get("https://ecommerce-api-rosy-alpha.vercel.app/api/category");
};

export const removeCategory = async (token, id) => {
  return await axios.delete(`https://ecommerce-api-rosy-alpha.vercel.app/api/category/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
