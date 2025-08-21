import axios from "axios";

export const createProduct = async (token, form) => {
  return await axios.post("https://ecommerce-api-rosy-alpha.vercel.app/api/product", form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const listProduct = async (count = 20) => {
  return await axios.get(`https://ecommerce-api-rosy-alpha.vercel.app/api/products/${count}`);
};

export const readProduct = async (token, id) => {
  return await axios.get(`https://ecommerce-api-rosy-alpha.vercel.app/api/product/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteProduct = async (token, id) => {
  return await axios.delete(`https://ecommerce-api-rosy-alpha.vercel.app/api/product/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateProduct = async (token, id, form) => {
  return await axios.put(`https://ecommerce-api-rosy-alpha.vercel.app/api/product/${id}`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const uploadFiles = async (token, form) => {
  return await axios.post(
    "https://ecommerce-api-rosy-alpha.vercel.app/api/images",
    { images: form },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const removeFiles = async (token, public_id) => {
  return await axios.post(
    "https://ecommerce-api-rosy-alpha.vercel.app/api/removeimages",
    { public_id },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const searchFilters = async (arg) => {
  return await axios.post(`https://ecommerce-api-rosy-alpha.vercel.app/api/search/filters`, arg);
};

export const listProductBy = async (sort, order, limit) => {
  return await axios.post(`https://ecommerce-api-rosy-alpha.vercel.app/api/productby`, {
    sort,
    order,
    limit,
  });
};
