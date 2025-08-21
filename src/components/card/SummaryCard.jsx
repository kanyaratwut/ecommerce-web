import React, { useState, useEffect, use } from "react";
import { listUserCart, saveAddress } from "../../api/user";
import useEcomStore from "../../store/ecom-store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { numberFormat } from "../../utils/number";

const SummaryCard = () => {
  const navigate = useNavigate();
  const token = useEcomStore((state) => state.token);
  const [products, setProducts] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);

  useEffect(() => {
    handleGetUserCart();
  }, []);

  const handleGetUserCart = async () => {
    listUserCart(token)
      .then((res) => {
        setProducts(res.data.products);
        setCartTotal(res.data.cartTotal);
      })
      .catch((err) => console.log(err));
  };

  const hadleSaveAddress = async () => {
    if (!address) return toast.warning("กรุณากรอกที่อยู่ในการจัดส่ง");
    saveAddress(token, address)
      .then((res) => {
        toast.success("บันทึกที่อยู่สําเร็จ");
        setAddressSaved(true);
      })
      .catch((err) => toast.error("บันทึกที่อยู่ไม่สําเร็จ"));
  };

  const handleGotoPayment = () => {
    if (!addressSaved) return toast.warning("กรุณาบันทึกที่อยู่ในการจัดส่ง");
    navigate("/user/payment");
  };

  return (
    <div className="mx-auto w-full">
      <div className="flex  gap-4">
        <div className="w-2/4">
          <div className="bg-white  p-4 rounded-md border border-gray-100 shadow-md space-y-4">
            <h1 className="text-lg font-bold">ที่อยู่ในการจัดส่ง</h1>
            <textarea
              required
              className="w-full h-24 border border-gray-300 rounded-md p-2"
              placeholder="กรุณากรอกที่อยู่ในการจัดส่ง"
              onChange={(e) => setAddress(e.target.value)}
            ></textarea>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 hover:scale-105 cursor-pointer hover:translate-y-1 hover:duration-200"
              onClick={hadleSaveAddress}
            >
              บันทึกที่อยู่
            </button>
          </div>
        </div>

        <div className="w-2/4">
          <div className="bg-white  p-4 rounded-md border border-gray-100 shadow-md space-y-4">
            <h1 className="text-lg font-bold">คำสั่งซื้อของคุณ</h1>
            {/* Item List */}

            {products?.map((product, index) => (
              <div key={index}>
                <div className="flex justify-between items-end">
                  <div>
                    <p>{product.product.title}</p>
                    <p className="text-sm text-gray-500">
                      จำนวน : {product.count} x {numberFormat(product.product.price)}
                    </p>
                  </div>
                  <div>
                    <p className="text-red-500 font-bold">
                      ฿{numberFormat(product.product.price * product.count)}
                    </p>
                  </div>
                </div>
                <hr className="border border-gray-200" />
              </div>
            ))}

            <div>
              <div className="flex justify-between">
                <p>ค่าจัดส่ง :</p>
                <p>0.00</p>
              </div>
              <div className="flex justify-between">
                <p>ค่าส่วนลด :</p>
                <p>0.00</p>
              </div>
              <hr className="border border-gray-200" />
            </div>

            <div>
              <div className="flex justify-between">
                <p className="font-bold">ยอดรวมสุทธิ :</p>
                <p className="text-red-500 font-bold text-lg">
                  ฿{numberFormat(cartTotal)}
                </p>
              </div>
            </div>

            <div>
              <button
                className={`w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 hover:scale-105 cursor-pointer hover:translate-y-1 hover:duration-200 `}
                onClick={handleGotoPayment}
              >
                ดำเนินการชำระเงิน
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
