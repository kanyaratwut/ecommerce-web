import React, { useState, useEffect } from "react";
import { getOrders } from "../../api/user";
import { toast } from "react-toastify";
import useEcomStore from "../../store/ecom-store";
import { numberFormat } from "../../utils/number";
import { dateFormat } from "../../utils/dateFormat";

const HistoryCard = () => {
  const token = useEcomStore((state) => state.token);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    handleGetOrders(token);
  }, []);

  const handleGetOrders = async (token) => {
    getOrders(token)
      .then((res) => {
        setOrders(res.data.orders);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Not Process":
        return "bg-gray-200 text-gray-800";
      case "Processing":
        return "bg-blue-200 text-blue-800";
      case "Completed":
        return "bg-green-200 text-green-800";
      case "Cancelled":
        return "bg-red-200 text-red-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">ประวัติการสั่งซื้อ</h1>
      <div className="space-y-4">
        {/* card */}
        {orders.length > 0 &&
          orders?.map((order, index) => {
            return (
              <div className="bg-white p-4 rounded-md shadow-md" key={index}>
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <p className="text-sm">Order Date</p>
                    <p className="font-bold">{dateFormat(order.createdAt)}</p>
                  </div>
                  <div
                    className={`px-2 py-1 rounded-full  ${getStatusColor(
                      order.orderStatus
                    )}`}
                  >
                    {order.orderStatus}
                  </div>
                </div>

                <div>
                  <table className="border border-gray-200 w-full">
                    <thead>
                      <tr className="bg-gray-200">
                        <th>สินค้า</th>
                        <th>ราคา</th>
                        <th>จำนวน</th>
                        <th>รวม</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order?.products.map((product, index) => {
                        return (
                          <tr key={index}>
                            <td className="text-center">{product.product.title}</td>
                            <td className="text-center">
                              {numberFormat(product.product.price)}
                            </td>
                            <td className="text-center">{product.count}</td>
                            <td className="text-center">
                              {numberFormat(
                                product.count * product.product.price
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div>
                  <div className="text-right">
                    <p>ราคาสุทธิ</p>
                    <p>{numberFormat(order.cartTotal)}</p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default HistoryCard;
