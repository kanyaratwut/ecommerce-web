import React, { useState, useEffect } from "react";
import {
  createCategory,
  listCategory,
  removeCategory,
} from "../../api/Category";
import useEcomStore from "../../store/ecom-store";
import { toast } from "react-toastify";

const FormCategory = () => {
  const token = useEcomStore((state) => state.token);
  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);
  
  const [name, setName] = useState("");

  useEffect(() => {
    getCategory();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) return toast.warning("Category name is required");
    createCategory(token, { name })
      .then(async (res) => {
        toast.success(`Add Category ${res.data.name} Success`);
        getCategory();
      })
      .catch((err) => toast.error("Add Category Failed"));
  };

  const handleRemove = async (id) => {
    removeCategory(token, id)
      .then(async (res) => {
        toast.success(`Delete Category ${res.data.name} Success`);
        getCategory();
      })
      .catch((err) => toast.error("Delete Category Failed"));
  };

  return (
    <div className="container mx-auto p-4 bg-white shadow-md">
      <h1>Category Management</h1>
      <form className="my-4" onSubmit={handleSubmit}>
        <input
          onChange={(e) => setName(e.target.value)}
          className="border"
          type="text"
        />
        <button className="bg-blue-500">Add Category</button>
      </form>
      <hr />
      <ul className="list-none">
        {categories.map((item, index) => (
          <li key={index} className="flex justify-between my-2">
            <span>{item.name}</span>
            <button
              className="bg-red-500"
              onClick={() => handleRemove(item.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FormCategory;
