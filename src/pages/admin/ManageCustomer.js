import React, { useCallback, useEffect, useState } from "react";
import icons from "../../utils/icons";
import moment from "moment";
import { InputForm, Pagination } from "../../components";
import Loading from "../../components/Loading";
import { showModal } from "../../stores/admin/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  deleteCustomer,
  getAllCustomers,
} from "../../stores/customer/customerSlice";
import { useForm } from "react-hook-form";
import {
  apiDeleteCustomer,
  apiGetAllCustomers,
  apiUpdateCustomer,
} from "../../apis/customer";

const {
  AiFillEye,
  AiFillEdit,
  BsFillTrashFill,
  AiOutlineSearch,
  AiOutlineUndo,
  AiOutlineCheck,
} = icons;

const ManageCustomer = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    name: "",
    address: "",
    phone_number: "",
  });
  const { customers } = useSelector((state) => state.customer);
  const [query, setQuery] = useState("");
  const [update, setUpdate] = useState(false);
  const [edit, setEdit] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(null);
  const dispatch = useDispatch();
  const fetchAllUsers = async (params) => {
    dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
    const response = await apiGetAllCustomers(params);

    dispatch(showModal({ isShowModal: false, modalChildren: null }));
    if (response.success) {
      setTotalItems(response.totalItems);
      dispatch(getAllCustomers({ data: response.data }));
    }
  };

  useEffect(() => {
    if (edit) {
      setValue("name", edit.name);
      setValue("address", edit.address);
      setValue("phone_number", edit.phone_number);
    }
  },[edit]);

  useEffect(() => {
    const params = {};
    if (currentPage) params.page = currentPage;
    if (query) params.search = query;
    fetchAllUsers(params);
  }, [currentPage, query, update, edit]);

  const setValueQuery = useCallback(
    (e) => {
      setQuery(e.target.value);
    },
    [query]
  );

  const setUpdateInfo = useCallback(
    (cus) => {
      setEdit(cus);
    },
    [edit]
  );

  const rerenderAfterUpdate = useCallback(
    (e) => {
      setUpdate(!update);
    },
    [update]
  );

  const handleDeleteUser = async (id) => {
    try {
      dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
      const response = await apiDeleteCustomer(id);
      dispatch(showModal({ isShowModal: false, modalChildren: null }));
      if (response.success) {
        dispatch(deleteCustomer({ id: id }));
        Swal.fire("Ok!", "Đã xóa", "success");
      }
    } catch (error) {
      Swal.fire("Toang!", "Không thành công", "error");
    }
  };

  const handleUpdateCustomer = async (data) => {
    try {
      dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
      const response = await apiUpdateCustomer(edit.id, data);
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
        Quản lý khách hàng
      </h1>

      <div className="flex justify-end py-4 pr-4">
        <input
          type="text"
          placeholder="Nhập tìm kiếm vào đây nhé"
          value={query}
          onChange={(e) => setValueQuery(e)}
          className="w-1/2 py-2 px-4 outline-none border-main border-y border-l placeholder:italic placeholder:opacity-60"
        />
        <div className="h-[50px] w-[80px] text-white text-2xl flex justify-center items-center bg-main cursor-pointer">
          <AiOutlineSearch />
        </div>
      </div>
      <div className="w-full px-4">
        <form onSubmit={handleSubmit(handleUpdateCustomer)}>
          <table className="w-full table-auto mb-6 text-left">
            <thead className="font-bold bg-main text-white border-white border-b-[2px] text-center">
              <tr>
                <th className="px-2 py-2">#</th>
                <th className="px-4 py-2">Tên</th>
                <th className="px-4 py-2">Username</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Địa chỉ</th>
                <th className="px-4 py-2">Điện thoại</th>
                <th className="px-4 py-2">Ngày tạo</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {customers &&
                customers.map((cus, index) => (
                  <tr
                    key={cus.id}
                    className="border-y border-main transition-colors cursor-pointer hover:bg-gray-200"
                  >
                    <td className="py-4 text-center">{index + 1}</td>
                    <td className="py-4">
                      {edit?.id === cus.id ? (
                        <InputForm
                          register={register}
                          errors={errors}
                          id="name"
                          validate={{
                            required: "Bắt buộc",
                          }}
                          className="form-input w-full outline-none p-2 rounded-md text-black border border-main"
                          value={edit.name}
                        />
                      ) : (
                        <span>{cus.name}</span>
                      )}
                    </td>

                    <td className="py-4 pl-2">{cus.user?.username}</td>
                    <td className="py-4">{cus.user?.email}</td>

                    <td className="py-4">
                      {edit?.id === cus.id ? (
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
                          {cus.address?.length >= 30
                            ? `${cus.address?.slice(0, 30)} ...`
                            : cus.address}
                        </span>
                      )}
                    </td>
                    <td className="py-4 text-center">
                      {edit?.id === cus.id ? (
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
                          <td className="py-4">{cus.phone_number}</td>
                        </span>
                      )}
                    </td>
                    <td className="py-4 text-center">
                      {moment(cus.created_at).format("DD-MM-YYYY")}
                    </td>
                    <td className="py-4">
                      <div className="flex justify-center gap-2 items-center">
                        <AiFillEye className="cursor-pointer" />
                        {edit?.id === cus.id ? (
                          <button type="submit">
                            <AiOutlineCheck />
                          </button>
                        ) : (
                          <AiFillEdit
                            className="cursor-pointer"
                            onClick={() => setUpdateInfo(cus)}
                          />
                        )}
                        <BsFillTrashFill
                          className="cursor-pointer"
                          onClick={() => handleDeleteUser(cus.id)}
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

export default ManageCustomer;
