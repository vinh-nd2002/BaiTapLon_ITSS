import React from "react";
import { useSelector } from "react-redux";
import { CartProduct } from "../../components";

const Cart = () => {
  const { shops } = useSelector((state) => state.cart);

  return (
    <div className="w-main">
      <div className="flex shadow-md my-10">
        <div className="w-3/4 bg-white px-10 py-10">
          <h1 className="font-semibold text-2xl">Shopping Cart</h1>

          {shops &&
            shops.map((shop) => {
              return (
                <div key={shop.id} className="border my-2">
                  <div className="flex items-center gap-4 ml-5 pt-2">
                    <img
                      src="https://incucdep.com/wp-content/uploads/2014/12/logo-thoi-trang.jpg"
                      className="w-[50px] h-[50px] rounded-full border "
                      alt={shop.shop_name}
                    />
                    <h2 className="font-semibold text-xl text-main">
                      {shop.shop_name}
                    </h2>
                  </div>

                  <div className="flex my-3  px-4">
                    <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                      Product Details
                    </h3>
                    <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">
                      Quantity
                    </h3>
                    <h3 className="font-semibold  text-gray-600 text-xs uppercase w-1/5 text-center">
                      Price
                    </h3>
                    <h3 className="font-semibold  text-gray-600 text-xs uppercase w-1/5 text-center">
                      Total
                    </h3>
                  </div>
                  {shop.products &&
                    shop.products.map((product, index) => {
                      const shopItem = {
                        id: shop.id,
                        product: { ...product },
                      };
                      return <CartProduct shop={shopItem} key={index} />;
                    })}
                </div>
              );
            })}
        </div>
        <div id="summary" className="w-1/4 px-8 py-10">
          <h1 className="font-semibold text-2xl border-b pb-8">
            Order Summary
          </h1>
          <div className="flex justify-between mt-10 mb-5">
            <span className="font-semibold text-sm uppercase">Items 3</span>
            <span className="font-semibold text-sm">590$</span>
          </div>
          <div>
            <label className="font-medium inline-block mb-3 text-sm uppercase">
              Shipping
            </label>
            <select className="block p-2 text-gray-600 w-full text-sm">
              <option>Standard shipping - $10.00</option>
            </select>
          </div>
          <div className="py-10">
            <label
              htmlFor="promo"
              className="font-semibold inline-block mb-3 text-sm uppercase"
            >
              Promo Code
            </label>
            <input
              type="text"
              id="promo"
              placeholder="Enter your code"
              className="p-2 text-sm w-full"
            />
          </div>
          <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">
            Apply
          </button>
          <div className="border-t mt-8">
            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
              <span>Total cost</span>
              <span>$600</span>
            </div>
            <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
