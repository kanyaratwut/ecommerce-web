import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import zxcvbn from "zxcvbn"; //เช็คความยากของ Password
import { useNavigate } from "react-router-dom";

const registerSchema = z
  .object({
    email: z.string().email({ message: "Invalid email" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], //ถ้าไม่ตรงข้อความจะแสดงออกมาที่ confirmPassword
  });

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordScore, setPasswordScore] = useState(0);

  const validatePassword = () => {
    let password = watch().password;
    return zxcvbn(password ? password : "").score;
  };

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    setPasswordScore(validatePassword());
  }, [watch().password]); //[] ใน [] คือ dependency

  const onSubmit = async (data) => {
    // const passwordScore = zxcvbn(data.password).score;
    // console.log(passwordScore);
    // if (passwordScore < 3) {
    //   toast.warning("Password is too weak");
    //   return;
    // }

    //Send to Backend
    try {
      const res = await axios.post("https://ecommerce-api-rosy-alpha.vercel.app/api/register", data);
      toast.success(res.data);
      navigate("/login");
    } catch (error) {
      const err = error.response?.data?.message;
      toast.error(err);
    }
  };

  const arr = Array.from("a"); //แปลงเป็น array

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full shadow-md rounded-md bg-white p-8 max-w-md">
        <h1 className="text-2xl text-center my-4 font-bold">Register</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              {/* <div>Email</div> */}
              <input
                {...register("email")}
                className={`border border-gray-200 w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.email && "border-red-500 text-red-500"
                }`}
                placeholder="Email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div>
              {/* <div>Password</div> */}
              <input
                {...register("password")}
                type="password"
                className={`border border-gray-200 w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.password && "border-red-500 text-red-500"
                }`}
                placeholder="Password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
              {watch().password?.length > 0 && (
                <div className="flex mt-3">
                  {Array.from(Array(5).keys()).map((item, index) => {
                    //แปลงเป็น array Array(5) -- > [0,1,2,3,4]
                    return (
                      <span key={item} className="w-1/5 px-1">
                        <div
                          className={`rounded h-2 ${
                            passwordScore <= 2
                              ? "bg-red-500"
                              : passwordScore < 4
                              ? "bg-yellow-500"
                              : "bg-green-500"
                          }`}
                        ></div>
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
            <div>
              {/* <div>Confirm Password</div> */}
              <input
                {...register("confirmPassword")}
                type="password"
                className={`border border-gray-200 w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.confirmPassword && "border-red-500 text-red-500"
                }`}
                 placeholder="Confirm Password"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <button className="bg-blue-500 rounded-md w-full text-white py-2 font-bold shadow-md hover:bg-blue-600 cursor-pointer">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
