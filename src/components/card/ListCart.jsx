import React from "react";
import { List } from "lucide-react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import useEcomStore from "../../store/ecom-store";
import { createUserCart } from "../../api/user";
import { numberFormat } from "../../utils/number";

const ListCart = () => {
  const cart = useEcomStore((state) => state.carts);
  const getTotalPrice = useEcomStore((state) => state.getTotalPrice);
  const user = useEcomStore((state) => state.user); //axios interceptor การ config กับตัว axios (ผูก toke ไว้กับ axios)
  const token = useEcomStore((state) => state.token);
  const navigate = useNavigate();

  const handleSaveCart = async () => {
    createUserCart(token, { cart })
      .then((res) => {
        toast.success("Add to Cart Success");
        navigate("/checkout");
      })
      .catch((err) => {
        toast.warning(err.response.data.message);
      });
  };

  return (
    <div className="bg-gray-100 rounded-sm p-4">
      <div className="flex items-center gap-4 mb-4">
        <List size={36} />
        <p className="text-2xl font-bold">รายการสินค้า {cart.length} รายการ</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-4 gap-y-4">
        <div className="col-span-2">
          {/* card */}
          {cart.map((cart, index) => (
            <div className="bg-white p-2 rounded-md shadow-md mb-2" key={index}>
              <div className="flex justify-between mb-2">
                <div className="flex gap-2 items-center">
                  {/* ternary */}
                  {cart.images && cart.images.length > 0 ? (
                    <img
                      src={cart.images[0].url}
                      className="w-16 h-16 rounded-md object-contain"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center text-center ">
                      No Image
                    </div>
                  )}

                  <div>
                    <p className="font-bold">{cart.title}</p>
                    <p className="text-sm">
                      {numberFormat(cart.price)} x {cart.count}
                    </p>
                  </div>
                </div>
                <div>
                  <div className="font-bold text-pink-500 ">
                    {numberFormat(cart.price * cart.count)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white p-4 rounded-md shadow-md space-y-4">
          <p className="font-bold text-2xl">ยอดรวม</p>
          <div className="flex justify-between items-center">
            <span>รวมสุทธิ</span>
            <span className="text-2xl">฿{numberFormat(getTotalPrice())}</span>
          </div>

          <div className="flex flex-col gap-2">
            {user ? (
              <Link>
                <button
                  className={`bg-red-500 w-full rounded-md py-2 text-white hover:bg-red-700 cursor-pointer disabled:opacity-50 disabled:cursor-default disabled:bg-gray-400`}
                  onClick={handleSaveCart}
                  disabled={cart.length === 0}
                >
                  สั่งซื้อ
                </button>
              </Link>
            ) : (
              <Link to={"/login"}>
                <button className="bg-blue-500 w-full rounded-md py-2 text-white hover:bg-blue-700 cursor-pointer">
                  Login
                </button>
              </Link>
            )}

            <Link to={"/shop"}>
              <button className="bg-gray-500 w-full rounded-md py-2 text-white hover:bg-gray-700 cursor-pointer">
                แก้ไขรายการ
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListCart;
