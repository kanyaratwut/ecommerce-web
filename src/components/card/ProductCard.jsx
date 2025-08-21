import React, { use } from "react";
import { ShoppingCart } from "lucide-react";
import useEcomStore from "../../store/ecom-store";
import { numberFormat } from "../../utils/number";
import { motion } from "motion/react";

const ProductCard = ({ product }) => {
  const actionAddToCart = useEcomStore((state) => state.actionAddToCart);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.2,
      }}
    >
      <div className="border border-gray-200 rounded-md shadow-md p-2 w-48">
        <div>
          {/* การเขียนแบบ ternary ? : */}
          {product.images && product.images.length > 0 ? (
            <img
              src={product.images[0].url}
              className="rounded-md w-full h-32 object-cover hover:scale-110  hover:transition-all  hover:duration-300  hover:ease-in-out"
            />
          ) : (
            <div className="w-full h-32 bg-gray-200 rounded-md text-center flex items-center justify-center shadow">
              No Image
            </div>
          )}
        </div>

        <div className="py-2">
          <p className="text-xl truncate">{product.title}</p>
          <p className="text-sm text-gray-500 truncate">{product.description}</p>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-bold">
            {numberFormat(product.price)}
          </span>
          <button
            className="bg-pink-500 rounded-md p-2 text-white hover:bg-pink-600 shadow-md cursor-pointer"
            onClick={() => actionAddToCart(product)}
          >
            <ShoppingCart />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
