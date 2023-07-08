import React, { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addProductsToCart } from "../stores/cart/cartSlice";
import { formatMoney } from "../utils/helpers";

const CartProduct = (props) => {
  const { shop: shopProps } = props;
  const dispatch = useDispatch();

  const addProductToCart = useCallback(
    (flag) => {
      let productAdd = {
        ...shopProps.product,
        quantity: flag === "plus" ? 1 : -1,
      };

      const shopAdd = {
        ...shopProps,
        product: productAdd,
      };
      dispatch(addProductsToCart({ shop: shopAdd }));
    },
    [shopProps, dispatch]
  );

  return (
    <div className="flex items-center hover:bg-gray-100 p-2 border-t">
      <div className="flex w-2/5">
        <div className="w-20">
          <img
            className="h-24"
            src={shopProps.product.thumb}
            alt={shopProps.product.name}
          />
        </div>
        <div className="flex flex-col justify-between ml-4 flex-grow">
          <span className="font-bold text-sm">{shopProps.product.name}</span>
        </div>
      </div>
      <div className="flex justify-center w-1/5">
        <span
          className="p-2 border-r border-gray-600 cursor-pointer"
          onClick={() => {
            addProductToCart("minus");
          }}
        >
          <AiOutlineMinus />
        </span>
        <input
          disabled
          type="text"
          value={shopProps.product.quantity}
          className="hover:bg-gray-100 py-1 w-[60px] text-center"
        />
        <span
          className="p-2 border-l  border-gray-600 cursor-pointer"
          onClick={() => {
            addProductToCart("plus");
          }}
        >
          <AiOutlinePlus />
        </span>
      </div>
      <span className="text-center w-1/5 font-semibold text-sm">
        {formatMoney(+shopProps.product.price)}
      </span>
      <span className="text-center w-1/5 font-semibold text-sm">
        {formatMoney(shopProps.product.price * shopProps.product.quantity)}
      </span>
    </div>
  );
};

export default CartProduct;
