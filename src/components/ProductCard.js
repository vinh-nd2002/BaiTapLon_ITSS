import React, { useState } from "react";
import { formatMoney, renderStarFromNumber } from "./../utils/helpers";
import bestSellerLabel from "./../assets/best-seller.png";
import newLabel from "./../assets/new.png";
import flashSaleLabel from "./../assets/flash_sale.png";
import SelectOption from "./SelectOption";

import icons from "./../utils/icons";
import { Link, useNavigate } from "react-router-dom";
import path from "../utils/path";
import { useDispatch } from "react-redux";
import { addProductsToCart } from "../stores/cart/cartSlice";
import Swal from "sweetalert2";

const { BsFillHandbagFill, AiFillEye } = icons;

const ProductCard = ({ product, labelTab, flashSale }) => {
  const [isShow, setIsShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const category = product.category.name;
  const handleClickOption = (e, product) => {
    e.preventDefault();
    const shop = {
      ...product.shop,
      product: {
        id: product.id,
        name: product.name,
        quantity: 1,
        price: product.price,
        thumb: product.thumbnail,
      },
    };
    dispatch(addProductsToCart({ shop: shop }));
    Swal.fire("Thông báo!", "Bạn đã thêm sản phẩm vào giỏ hàng", "success");
  };

  return (
    <div className="w-full px-[10px] mb-[10px]">
      {product && (
        <Link
          to={`/${path.DETAIL_PRODUCT}/${category.toLowerCase()}/${
            product.id
          }/${product.slug}`}
          onMouseEnter={(e) => {
            e.stopPropagation();
            setIsShow(true);
          }}
          onMouseLeave={(e) => {
            e.stopPropagation();
            setIsShow(false);
          }}
        >
          <div className="border border-gray-400 w-full py-[5px] ">
            <div className="relative w-full ">
              {isShow && (
                <div className=" absolute bottom-0 right-0 left-0 flex justify-center items-center gap-4 animate-slide-top ">
                  <SelectOption
                    icon={<BsFillHandbagFill />}
                    handleClickOption={handleClickOption}
                    product={product}
                  />
                  <SelectOption
                    icon={<AiFillEye />}
                    handleClickOption={() =>
                      navigate(
                        `/${path.DETAIL_PRODUCT}/${category.toLowerCase()}/${
                          product.id
                        }/${product.slug}`
                      )
                    }
                  />
                </div>
              )}

              <img
                src={
                  // product.thumbnail
                  "https://bloganchoi.com/wp-content/uploads/2019/12/vay-xep-ly-3.jpg" ||
                  "https://t3.ftcdn.net/jpg/04/34/72/82/360_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg"
                }
                alt={product.name}
                className="h-[200px] object-contain"
              />
              {labelTab && (
                <img
                  src={
                    flashSale
                      ? flashSaleLabel
                      : labelTab
                      ? bestSellerLabel
                      : newLabel
                  }
                  alt="new"
                  className={`absolute object-cover top-[-5px] ${
                    flashSale
                      ? "w-[60px] "
                      : labelTab
                      ? "left-[-10px] w-[70px]"
                      : "left-0 w-[40px] top-0 "
                  }`}
                />
              )}
            </div>
            <div className="flex flex-col items-start px-[15px] ">
              <span className="line-clamp-1 text-[10px]">{product.name}</span>
              <span className="text-xs text-main">
                {formatMoney(product.price)} VND
              </span>
              {renderStarFromNumber(product.totalRatings, 10)}
            </div>
          </div>
        </Link>
      )}
    </div>
  );
};

export default ProductCard;
