import React, { useState, useEffect } from "react";
import useEcomStore from "../../store/ecom-store";
import {
  createProduct,
  readProduct,
  updateProduct,
  listProduct,
} from "../../api/product";
import { toast } from "react-toastify";
import UploadFile from "./UploadFile";
import { useParams, useNavigate } from "react-router-dom";

const initalState = {
  title: "",
  description: "",
  price: "",
  quantity: "",
  categoryId: "",
  images: [],
};

const FormEditProduct = () => {
  const token = useEcomStore((state) => state.token);
  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState(initalState);

  useEffect(() => {
    getCategory();
    fetchProduct(token, id);
  }, []);

  const fetchProduct = async (token, id) => {
    readProduct(token, id)
      .then((res) => {
        setForm(res.data);
      })
      .catch((err) => toast.error(err.data));
  };
  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateProduct(token, id, form)
      .then((res) => {
        toast.success(`แก้ไขข้อมูล ${res.data.title} สําเร็จ`);
        setTimeout(() => {
          navigate("/admin/product");
        }, 1000);
      })
      .catch((err) => toast.error("แก้ไขข้อมูลไม่สําเร็จ"));
  };

  return (
    <div className="container mx-auto p-4 bg-white shadow-md">
      <h1 className="text-2xl font-bold">Product Mangement</h1>
      <form onSubmit={handleSubmit}>
        <h1 className="my-4 text-xl">แก้ไขข้อมูลสินค้า</h1>
        <div className="flex gap-2">
          <input
            className="border px-2 py-1 focus:outline-none"
            value={form.title}
            onChange={handleOnChange}
            placeholder="Title"
            name="title"
          />
          <input
            className="border px-2 py-1 focus:outline-none"
            value={form.description}
            onChange={handleOnChange}
            placeholder="Description"
            name="description"
          />
          <input
            className="border px-2 py-1 focus:outline-none"
            type="number"
            value={form.price}
            onChange={handleOnChange}
            placeholder="Price"
            name="price"
          />
          <input
            className="border px-2 py-1 focus:outline-none"
            type="number"
            value={form.quantity}
            onChange={handleOnChange}
            placeholder="Quantity"
            name="quantity"
          />
          <select
            className="border px-2 py-1 focus:outline-none"
            name="categoryId"
            onChange={handleOnChange}
            required
            value={form.categoryId}
          >
            <option value="" disabled>
              Please Select
            </option>
            {categories.map((category, index) => (
              <option key={index} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <UploadFile form={form} setForm={setForm} />

        <button className="bg-pink-500 p-2 rounded-md text-white hover:scale-105 hover:-translate-y-1 hover:duration-200 hover:bg-pink-600 mb-2 cursor-pointer">
          แก้ไขสินค้า
        </button>
        <br />
      </form>
    </div>
  );
};

export default FormEditProduct;
