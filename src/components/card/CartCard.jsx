import React from "react";
import { Trash2, Minus, Plus } from "lucide-react";
import { Link } from "react-router-dom";

import useEcomStore from "../../store/ecom-store";
import { numberFormat } from "../../utils/number";

const CartCard = () => {
  const carts = useEcomStore((state) => state.carts);
  const actionUpdateQuantity = useEcomStore(
    (state) => state.actionUpdateQuantity
  );
  const actionRemoveProduct = useEcomStore(
    (state) => state.actionRemoveProduct
  );
  const getTotalPrice = useEcomStore((state) => state.getTotalPrice);

  return (
    <div>
      <h1 className="text-2xl font-bold">ตะกร้าสินค้า</h1>

      <div className="border border-gray-200 p-2 ">
        {/* card */}
        {carts.map((cart, index) => (
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
                  <p className="text-sm">{cart.description}</p>
                </div>
              </div>
              <div
                className="text-red-600 p-2 cursor-pointer"
                onClick={() => actionRemoveProduct(cart.id)}
              >
                <Trash2 />
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="border border-gray-200 rounded-sm px-2 py-1 flex items-center">
                <button
                  className="px-2 py-1 bg-gray-200 rounded-sm hover:bg-gray-300 cursor-pointer"
                  onClick={() => actionUpdateQuantity(cart.id, cart.count - 1)}
                >
                  <Minus size={16} />
                </button>
                <span className="px-4">{cart.count}</span>
                <button
                  className="px-2 py-1 bg-gray-200 rounded-sm hover:bg-gray-300 cursor-pointer"
                  onClick={() => actionUpdateQuantity(cart.id, cart.count + 1)}
                >
                  <Plus size={16} />
                </button>
              </div>
              <div className="font-bold text-pink-500 ">
                {numberFormat(cart.price * cart.count)}
              </div>
            </div>
          </div>
        ))}

        {/* summary */}
        <div className="flex justify-between px-2">
          <span>รวม</span>
          <span>{numberFormat(getTotalPrice())}</span>
        </div>
        <Link to="/cart">
          <button className="mt-4 bg-green-500 text-white w-full py-2 rounded-md shadow-md hover:bg-green-700 cursor-pointer">
            ดำเนินการชำระเงิน
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CartCard;
