import React, { useState, useEffect } from "react";
import useEcomStore from "../../store/ecom-store";
import { createProduct, deleteProduct } from "../../api/product";
import { toast } from "react-toastify";
import UploadFile from "./UploadFile";
import { Link } from "react-router-dom";

import { Pencil } from "lucide-react";
import { Trash2 } from "lucide-react";

import { numberFormat } from "../../utils/number";
import { dateFormat } from "../../utils/dateFormat";

const initalState = {
  title: "",
  description: "",
  price: "",
  quantity: "",
  categoryId: "",
  images: [],
};

const FormProduct = () => {
  const token = useEcomStore((state) => state.token);
  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);
  const getProducts = useEcomStore((state) => state.getProducts);
  const products = useEcomStore((state) => state.products);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    quantity: "",
    categoryId: "",
    images: [],
  });
  // const [form, setForm] = useState(initalState); //เรียกตัวแปรมาใช้มันไม่ rerender

  useEffect(() => {
    getCategory();
    getProducts(20);
  }, []);

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    createProduct(token, form)
      .then((res) => {
        toast.success(`เพิ่มข้อมูล ${res.data.title} สําเร็จ`);
        setForm(initalState);
        getProducts(20);
      })
      .catch((err) => toast.error("เพิ่มข้อมูลไม่สําเร็จ"));
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`คุณต้องการลบ ${title} ใช่หรือไม่`)) {
      deleteProduct(token, id)
        .then((res) => {
          toast.success(`ลบสินค้าสําเร็จ`);
          getProducts(20);
        })
        .catch((err) => {
          toast.error("ลบข้อมูลไม่สําเร็จ");
        });
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white shadow-md">
      <h1 className="text-2xl font-bold">Product Mangement</h1>
      <form onSubmit={handleSubmit}>
        <h1 className="my-4 text-xl">เพิ่มข้อมูลสินค้า</h1>
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
          เพิ่มสินค้า
        </button>
        <hr />
        <br />
        <table className="table w-full border-pink-900">
          <thead className="bg-pink-200 h-12 border-pink-900">
            <tr>
              <th scope="col">ลำดับ</th>
              <th scope="col">รูปภาพ</th>
              <th scope="col">ชื่อสินค้า</th>
              <th scope="col">รายละเอียด</th>
              <th scope="col">ราคา</th>
              <th scope="col">จำนวน</th>
              <th scope="col">จำนวนที่ขายได้</th>
              <th scope="col">วันที่อัพเดต</th>
              <th scope="col">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => {
              return (
                <tr key={index} className="h-30">
                  <th scope="row">{index + 1}</th>
                  <td className="flex justify-center items-center">
                    {product.images.length > 0 && product.images[0].url ? (
                      <img
                        src={product.images[0].url}
                        alt=""
                        className="w-24 h-24 object-cover rounded-lg shadow-md"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-lg shadow-md flex items-center justify-center bg-gray-200">
                        No Image
                      </div>
                    )}
                  </td>
                  <td className="text-center">{product.title}</td>
                  <td className="text-center">{product.description}</td>
                  <td className="text-center">{numberFormat(product.price)}</td>
                  <td className="text-center">{product.quantity}</td>
                  <td className="text-center">{product.sold}</td>
                  <td className="text-center">{dateFormat(product.updatedAt)}</td>
                  <td className="flex gap-2 justify-center items-center h-24">
                    <p className="bg-yellow-500 text-center rounded-md p-1  shadow-md text-white hover:scale-105 hover:-translate-y-1 hover:duration-200 hover:bg-yellow-600">
                      <Link to={`/admin/product/${product.id}`}>
                        <Pencil />
                      </Link>
                    </p>
                    <p
                      className="bg-red-500 text-center rounded-md p-1  shadow-md cursor-pointer text-white hover:scale-105 hover:-translate-y-1 hover:duration-200 hover:bg-red-600"
                      onClick={() => handleDelete(product.id)}
                    >
                      <Trash2 />
                    </p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default FormProduct;
