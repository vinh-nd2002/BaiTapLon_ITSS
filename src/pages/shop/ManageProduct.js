import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiDeleteProductById, apiGetShopById } from "../../apis";
import { getShopDetails } from "../../stores/shop/shopSlice";
import icons from "../../utils/icons";
import { SelectOption } from "../../components";
import { productsShop } from "../../stores/product/productSlice";
import Swal from "sweetalert2";
import { formatMoney, renderStarFromNumber } from "../../utils/helpers";
const { AiFillEdit, BsFillTrashFill, AiOutlineSearch } = icons;
const ManageProduct = () => {
  const { current } = useSelector((state) => state.user);
  const [isShow, setIsShow] = useState(false);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const fetchShopDetails = async (id) => {
    const response = await apiGetShopById(id);
    if (response.success) {
      setProducts(response.data.products);
      dispatch(getShopDetails({ data: response.data }));
    }
  };
  useEffect(() => {
    fetchShopDetails(current.shop.id);
  }, []);

  const handleClickOption = async (e, product) => {
    e.preventDefault();
    const response = await apiDeleteProductById(product.id);
    if (response.success) {
      setProducts((prev) => prev.id !== product.id);
      Swal.fire("Thông báo!", "Đã xóa thành công", "success");
    } else {
      Swal.fire("Toang!", "Đã có lỗi xảy ra", "error");
    }
  };

  const renderProducts = () => {
    if (products) {
      return products?.map((product) => (
        <div className="w-1/5 gap-2" key={product.id}>
          <div
            className="w-full my-4 p-2 h-[300px]"
            onMouseEnter={(e) => {
              e.stopPropagation();
              setIsShow(true);
            }}
            onMouseLeave={(e) => {
              e.stopPropagation();
              setIsShow(false);
            }}
          >
            {product && (
              <div className="border border-gray-400 w-full py-[5px] h-full flex flex-col">
                <div className="relative w-full h-3/4">
                  {isShow && (
                    <div className=" absolute bottom-0 right-0 left-0 flex justify-center items-center gap-4 animate-slide-top ">
                      <SelectOption
                        icon={<BsFillTrashFill />}
                        handleClickOption={handleClickOption}
                        product={product}
                      />
                      <SelectOption
                        icon={<AiFillEdit />}
                        handleClickOption={() => {}}
                      />
                    </div>
                  )}

                  <img
                    src={
                      product.thumbnail ||
                      "https://t3.ftcdn.net/jpg/04/34/72/82/360_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg"
                    }
                    alt={product.name}
                    className="object-contain h-3/4 flex justify-center items-center"
                  />
                </div>
                <div className="flex flex-col gap-2 px-[15px] h-1/4 flex-1">
                  <span className="line-clamp-1 text-[10px]">
                    {product.name}
                  </span>
                  <span className="text-xs text-main">
                    {formatMoney(product.price)} VND
                  </span>
                  {renderStarFromNumber(product.totalRatings, 10)}
                </div>
              </div>
            )}
          </div>
        </div>
      ));
    } else {
      return (
        <div className="text-xl h-[20px] text-black">Không có sản phẩm nào</div>
      );
    }
  };
  return (
    <div className="w-full pl-4">
      <h1 className="h-[75px] flex justify-between items-center text-3xl font-bold px-4">
        Quản lý sản phẩm
      </h1>

      {/* <div className="flex justify-end py-4 pr-4">
        <input
          type="text"
          placeholder="Nhập tìm kiếm vào đây nhé"
          // value={query}
          // onChange={(e) => setValueQuery(e)}
          className="w-1/2 py-2 px-4 outline-none border-main border-y border-l placeholder:italic placeholder:opacity-60"
        />
        <div className="h-[50px] w-[80px] text-white text-2xl flex justify-center items-center bg-main cursor-pointer">
          <AiOutlineSearch />
        </div>
      </div> */}
      <div className="px-4 flex flex-wrap">
        {renderProducts()}
        <div className="my-4 flex justify-end">
          {/* <Pagination totalItems={totalItems} setCurrentPage={setCurrentPage} /> */}
        </div>
      </div>
    </div>
  );
};

export default ManageProduct;
