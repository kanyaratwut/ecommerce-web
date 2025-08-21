import React, { useEffect, useState } from "react";
import {
  getListAllUsers,
  changeUserStatus,
  changeUserRole,
} from "../../api/admin";
import useEcomStore from "../../store/ecom-store";
import { toast } from "react-toastify";

import { dateFormat } from "../../utils/dateFormat";

const TableUser = () => {
  const token = useEcomStore((state) => state.token);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    handleGetListAllUsers(token);
  }, []);

  const handleGetListAllUsers = (token) => {
    getListAllUsers(token)
      .then((res) => {
        console.log(res);
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  const handleChangeUserStatus = (userId, userStatus) => {
    console.log(userStatus);
    const value = {
      id: userId,
      enabled: !userStatus,
    };

    changeUserStatus(token, value)
      .then((res) => {
        toast.success("Update Status Success");
        handleGetListAllUsers(token);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  const handleChangeUserRole = (userId, userRole) => {
    const value = {
      id: userId,
      role: userRole,
    };

    changeUserRole(token, value)
      .then((res) => {
        toast.success("Update Role Success");
        handleGetListAllUsers(token);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };
  return (
    <div className="container mx-auto p-4 bg-white shadow-md">
      <table className="w-full">
        <thead>
          <tr>
            <th>ลำดับ</th>
            <th>Email</th>
            <th>วันที่แก้ไขล่าสุด</th>
            <th>สิทธิ์</th>
            <th>สถานะ</th>
            <th>จัดการ</th>
          </tr>
        </thead>

        <tbody>
          {users?.map((user) => (
            <tr key={user.id}>
              <td className="text-center">{user.id}</td>
              <td className="text-center">{user.email}</td>
              <td className="text-center">{dateFormat(user.updatedAt)}</td>
              <td className="text-center">
                <select
                  value={user.role}
                  onChange={(e) => handleChangeUserRole(user.id, e.target.value)}
                  className="border  border-gray-300 rounded-md py-1 px-2"
                >
                  <option>user</option>
                  <option>admin</option>
                </select>
              </td>
              <td className="text-center">
                {user.enabled ? "Active" : "Inactive"}
              </td>
              <td className="text-center h-10">
                <button
                  className="bg-yellow-500 hover:bg-yellow-700 text-white py-1 px-2 rounded cursor-pointer text-sm"
                  onClick={() => handleChangeUserStatus(user.id, user.enabled)}
                >
                  {user.enabled ? "Inactive" : "Active"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableUser;
