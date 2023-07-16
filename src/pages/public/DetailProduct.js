import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById, getProducts } from "../../apis";
import {
  Breadcrumbs,
  Button,
  SelectQuantity,
  ProductExtraItem,
  ProductInformation,
  ListProducts,
} from "../../components";
import Slider from "react-slick";
import { formatMoney, renderStarFromNumber } from "../../utils/helpers";
import { productsExtraList } from "../../utils/contants";
import { addProductsToCart } from "../../stores/cart/cartSlice";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

var settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
  cssEase: "linear",
};

const DetailProduct = () => {
  const { pid, category } = useParams();

  const [product, setProduct] = useState({});
  const [suggestionProducts, setSuggestionProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [imageShow, setImageShow] = useState();

  const dispatch = useDispatch();

  const fetchProductById = async (pid) => {
    const response = await getProductById(pid);
    console.log(response);
    if (response.success) {
      setProduct(response.data);
      setImageShow(response.data.thumbnail);
    }
  };

  const fetchProductsByCategory = async (category) => {
    const response = await getProducts();
    if (response.success) {
      setSuggestionProducts(response.data);
    }
  };

  const handleQuantity = useCallback(
    (number) => {
      if (!Number(number) || Number(number) < 1) {
        return;
      } else setQuantity(number);
    },
    [quantity]
  );
  useEffect(() => {
    if (pid) {
      fetchProductById(pid);
      fetchProductsByCategory();
    }
    window.scrollTo(0, 0);
  }, [pid]);

  const handleChangeQuantity = useCallback(
    (flag) => {
      if (flag === "minus" && quantity === 1) return;
      if (flag === "minus") {
        setQuantity((prev) => +prev - 1);
      } else setQuantity((prev) => +prev + 1);
    },
    [quantity]
  );

  const addProductToCart = () => {
    let productAdd = {
      id: product.id,
      quantity,
      price: product.price,
      thumb: product.thumbnail,
      name: product.name,
    };
    const shop = {
      ...product.shop,
      product: productAdd,
    };

    dispatch(addProductsToCart({ shop: shop }));
    Swal.fire("Thông báo!", "Bạn đã thêm sản phẩm vào giỏ hàng", "success");
  };

  return (
    <div className="w-full mt-[-1px]">
      {product && (
        <div className="h-[80px] bg-gray-200 flex justify-center items-center">
          <div className="w-main">
            <h2 className="font-semibold">{product?.title}</h2>
            <Breadcrumbs title={product?.title} category={category} />
          </div>
        </div>
      )}
      {product && (
        <div className="w-main m-auto mt-4 flex justify-between gap-4">
          <div className="w-[40%] flex flex-col gap-4">
            <img
              src={imageShow ? imageShow : ""}
              alt={product.name}
              className="w-full h-[480px] object-contain border px-2"
            />
            <div className="w-full">
              <Slider {...settings}>
                {product.product_images?.map((ele) => (
                  <div
                    className="flex justify-center items-center w-1/3 px-1"
                    key={ele.id}
                  >
                    <div className="border border-gray-400">
                      <img
                        src={ele.image_url}
                        alt="sub-product-images"
                        className="m-auto object-contain h-[140px] cursor-pointer"
                        onClick={() => setImageShow(ele.image_url)}
                      />
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
          <div className="w-[40%] flex flex-col gap-2 p-6">
            <h3 className="font-semibold text-[30px]">
              {formatMoney(+product.price)} VND
            </h3>

            <div className="flex justify-start items-center gap-2">
              {renderStarFromNumber(product?.totalRatings, 16)}
              <div className="flex justify-between gap-2">
                <div>
                  <span className="text-xs text-gray-500">Sold: </span>
                  <span className="text-main text-sm">
                    {product.sold_quantity}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-gray-500">
                    <span>Quantity: </span>:
                  </span>
                  <span className="text-main text-sm">
                    {product.stock_quantity}
                  </span>
                </div>
              </div>
            </div>
            <div className="pl-6">
              <ul className="list-item list-square text-gray-500">
                {/* {product.description.split(",").map((ele) => (
                  <li key={ele} className="leading-6">
                    {ele}
                  </li>
                ))} */}
                <li className="leading-6">{product.description}</li>
                <li className="leading-6">{product.description}</li>
                <li className="leading-6">{product.description}</li>
              </ul>
            </div>
            <div>
              <SelectQuantity
                handleChangeQuantity={handleChangeQuantity}
                quantity={quantity}
                handleQuantity={handleQuantity}
              />
              <Button
                handleOnClick={addProductToCart}
                title="Add to CART"
                className="w-full bg-main text-white py-2 "
              />
            </div>
          </div>
          <div className="w-[20%] ">
            <div className="mt-6 ml-6">
              {productsExtraList.map((ele) => (
                <ProductExtraItem
                  key={ele.id}
                  icon={ele.icon}
                  title={ele.title}
                  sub={ele.sub}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      <div className="w-main m-auto mt-6">
        <ProductInformation />
      </div>
      <div className="h-[400px] w-main m-auto">
        <div className=" items-center border-main border-b-2 mb-4">
          <h3
            className="flex justify-center items-center font-medium capitalize w-[250px] text-center p-5  border-t-[1px] bg-main text-white 
            "
          >
            gợi ý sản phẩm
          </h3>
        </div>
        {suggestionProducts && <ListProducts products={suggestionProducts} />}
      </div>
    </div>
  );
};

export default DetailProduct;
