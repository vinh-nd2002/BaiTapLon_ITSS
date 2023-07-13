import React, { useCallback, useEffect, useState } from "react";
import { apiDeleteshoptomer, apiGetAllshoptomers } from "../../apis/user";
import icons from "./../../utils/icons";
import moment from "moment";
import { InputForm, Pagination } from "../../components";
import useDebounce from "../../hooks/useDebounce";
import Loading from "../../components/Loading";
import { showModal } from "../../stores/admin/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { apiDeleteShop, apiGetAllShops, apiUpdateShop } from "../../apis/shop";
import shopSlice, {
  deleteShop,
  getAllShops,
} from "../../stores/shop/shopSlice";
import { useForm } from "react-hook-form";

const {
  AiFillEye,
  AiFillEdit,
  BsFillTrashFill,
  AiOutlineSearch,
  AiOutlineUndo,
  AiOutlineCheck,
} = icons;

const ManageShop = () => {
  const { shops } = useSelector((state) => state.shop);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    shop_name: "",
    address: "",
    phone_number: "",
    description: "",
  });
  const [query, setQuery] = useState("");
  const [edit, setEdit] = useState(null);
  const [update, setUpdate] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(null);
  const dispatch = useDispatch();
  const fetchAllShops = async (params) => {
    dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
    const response = await apiGetAllShops(params);
    dispatch(showModal({ isShowModal: false, modalChildren: null }));

    if (response.success) {
      dispatch(getAllShops({ data: response.data }));
      setTotalItems(response.totalItems);
    }
  };

  useEffect(() => {
    if (edit) {
      setValue("shop_name", edit.shop_name);
      setValue("description", edit.description);
      setValue("phone_number", edit.phone_number);
      setValue("address", edit.address);
    }
  }, [edit]);

  useEffect(() => {
    const params = {};
    if (query) params.search = query;
    if (currentPage) params.page = currentPage;
    fetchAllShops(params);
  }, [currentPage, query, update, edit]);

  const setValueQuery = useCallback(
    (e) => {
      setQuery(e.target.value);
    },
    [query]
  );

  const setUpdateInfo = useCallback(
    (shop) => {
      setEdit(shop);
    },
    [edit]
  );

  const handleDeleteShop = async (id) => {
    try {
      dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
      const response = await apiDeleteShop(id);
      dispatch(showModal({ isShowModal: false, modalChildren: null }));
      if (response.success) {
        dispatch(deleteShop({ id: id }));
        Swal.fire("Ok!", "Đã xóa", "success");
      }
    } catch (error) {
      Swal.fire("Toang!", "Không thành công", "error");
    }
  };

  const rerenderAfterUpdate = useCallback(
    (e) => {
      setUpdate(!update);
    },
    [update]
  );

  const handleUpdateShop = async (data) => {
    try {
      dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
      const response = await apiUpdateShop(edit.id, data);
      dispatch(showModal({ isShowModal: false, modalChildren: null }));
      if (response.success) {
        setEdit(null);
        Swal.fire("Ok!", "Đã sửa thành công", "success");
        rerenderAfterUpdate();
      }
    } catch (error) {
      Swal.fire("Toang!", "Không thành công", "error");
    }
  };

  return (
    <div className="w-full pl-4">
      <h1 className="h-[75px] flex justify-between items-center text-3xl font-bold px-4">
        Quản lý Shop
      </h1>
      <div className="flex justify-end py-4 pr-4">
        <input
          type="text"
          placeholder="Nhập tìm kiếm vào đây nhé"
          value={query}
          onChange={(e) => setValueQuery(e)}
          className="w-1/2 py-2 px-4 outline-none border-main border-y border-l placeholder:italic placeholder:opacity-60"
        />
        <div className="h-[50px] w-[80px] text-white text-2xl flex justify-center items-center bg-[#F04646] cursor-pointer">
          <AiOutlineSearch />
        </div>
      </div>
      <div className="w-full px-4">
        <form onSubmit={handleSubmit(handleUpdateShop)}>
          <table className="w-full table-auto mb-6 text-left">
            <thead className="font-bold bg-main text-white border-white border-b-[2px] text-center">
              <tr>
                <th className="px-2 py-2">#</th>
                <th className="px-4 py-2">Logo</th>
                <th className="px-4 py-2">Tên shop</th>
                <th className="px-4 py-2">Điện thoại</th>
                <th className="px-4 py-2">Địa chỉ</th>
                <th className="px-4 py-2">Mô tả</th>
                <th className="px-4 py-2">Ngày tạo</th>
                <th className="px-4 py-2">Trạng thái</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {shops &&
                shops.map((shop, index) => (
                  <tr
                    key={shop.id}
                    className="border-y border-main hover:bg-gray-200 transition-colors cursor-pointer"
                  >
                    <td className="py-4 text-center">{index + 1}</td>
                    <td className="py-4">
                      <img
                        src={shop.shop_logo}
                        alt={shop.shop_name}
                        className="w-[50px] h-[40px]"
                      />
                    </td>

                    <td className="py-4">
                      {edit?.id === shop.id ? (
                        <InputForm
                          register={register}
                          errors={errors}
                          id="shop_name"
                          validate={{
                            required: "Bắt buộc",
                          }}
                          className="form-input w-full outline-none p-2 rounded-md text-black border border-main"
                          value={edit.shop_name}
                        />
                      ) : (
                        <span>
                          {shop.shop_name?.length >= 20
                            ? `${shop.shop_name?.slice(0, 20)} ...`
                            : shop.shop_name}
                        </span>
                      )}
                    </td>
                    <td className="py-4">
                      {edit?.id === shop.id ? (
                        <InputForm
                          register={register}
                          errors={errors}
                          id="phone_number"
                          validate={{
                            required: "Bắt buộc",
                            pattern: {
                              value:
                                /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
                              message: "Số điện thoại 10 ký tự!!",
                            },
                          }}
                          className="form-input w-full outline-none p-2 rounded-md text-black border border-main"
                          value={edit.phone_number}
                        />
                      ) : (
                        <span>
                          <td className="py-4">{shop.phone_number}</td>
                        </span>
                      )}
                    </td>
                    <td className="py-4">
                      {edit?.id === shop.id ? (
                        <InputForm
                          register={register}
                          errors={errors}
                          id="address"
                          validate={{
                            required: "Bắt buộc",
                          }}
                          value={edit.address}
                          className="form-input w-full outline-none p-2 rounded-md text-black border border-main"
                        />
                      ) : (
                        <span>
                          {shop.address?.length >= 20
                            ? `${shop.address?.slice(0, 20)} ...`
                            : shop.address}
                        </span>
                      )}
                    </td>
                    <td className="py-4">
                      {edit?.id === shop.id ? (
                        <InputForm
                          register={register}
                          errors={errors}
                          id="description"
                          validate={{
                            required: "Bắt buộc",
                          }}
                          value={edit.description}
                          className="form-input w-full outline-none p-2 rounded-md text-black border border-main"
                        />
                      ) : (
                        <span>
                          {shop.description?.length >= 20
                            ? `${shop.description?.slice(0, 20)} ...`
                            : shop.description}
                        </span>
                      )}
                    </td>

                    <td className="py-4 text-center">
                      {moment(shop.created_at).format("DD-MM-YYYY")}
                    </td>
                    <td className="py-4 text-center">{shop.is_verified}</td>
                    <td className="py-4">
                      <div className="flex justify-center gap-2 items-center">
                        <AiFillEye className="cursor-pointer" />
                        {edit?.id === shop.id ? (
                          <button type="submit">
                            <AiOutlineCheck />
                          </button>
                        ) : (
                          <AiFillEdit
                            className="cursor-pointer"
                            onClick={() => setUpdateInfo(shop)}
                          />
                        )}
                        <BsFillTrashFill
                          className="cursor-pointer"
                          onClick={() => handleDeleteShop(shop.id)}
                        />
                        <AiOutlineUndo
                          className="cursor-pointer"
                          // onClick={() => handleDeleteUser(cus.id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </form>
        <div className="my-4 flex justify-end">
          <Pagination totalItems={totalItems} setCurrentPage={setCurrentPage} />
        </div>
      </div>
    </div>
  );
};

export default ManageShop;
