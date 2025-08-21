import React, { useState, useEffect } from "react";
import { getOrdersAdmin, changeOrderStatus } from "../../api/admin";
import useEcomStore from "../../store/ecom-store";
import { toast } from "react-toastify";
import { numberFormat } from "../../utils/number";
import { dateFormat } from "../../utils/dateFormat";

const TableOrders = () => {
  const token = useEcomStore((state) => state.token);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    handleGetOrders(token);
  }, []);

  const handleGetOrders = (token) => {
    getOrdersAdmin(token)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  const handleChangeOrderStatus = (token, orderId, orderStatus) => {
    changeOrderStatus(token, orderId, orderStatus)
      .then((res) => {
        toast.success("Update Status Success");
        handleGetOrders(token);
      })
      .catch((err) => {
        console.log(err);
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
    <div className="container mx-auto p-4 bg-white shadow-md">
      <div>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200 border border-gray-200">
              <th>ลำดับ</th>
              <th>ผู้ใช้งาน</th>
              <th>วันที่</th>
              <th>สินค้า</th>
              <th>รวม</th>
              <th>สถานะ</th>
              <th>จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order, index) => {
              return (
                <tr key={index} className="border border-gray-200">
                  <td className="text-center">{index + 1}</td>
                  <td>
                    <p>{order.orderedBy.email}</p>
                    <p>{order.orderedBy.address}</p>
                  </td>
                  <td>{dateFormat(order.createdAt)}</td>
                  <td className="px-2 py-4">
                    {order.products?.map((product, idx) => {
                      return (
                        <li key={idx}>
                          {product.product.title} &nbsp;
                          <span className="text-sm text-gray-600">
                            {product.count} x {product.product.price}
                          </span>
                        </li>
                      );
                    })}
                  </td>
                  <td>{numberFormat(order.cartTotal)}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded-full ${getStatusColor(
                        order.orderStatus
                      )}`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>
                  <td>
                    <select
                      onChange={(e) =>
                        handleChangeOrderStatus(token, order.id, e.target.value)
                      }
                      value={order.orderStatus}
                      className="border border-gray-200 rounded-md px-2 py-1"
                    >
                      <option>Not Process</option>
                      <option>Processing</option>
                      <option>Completed</option>
                      <option>Cancelled</option>
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableOrders;
