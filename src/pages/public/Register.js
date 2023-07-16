import React, { useCallback, useEffect, useState } from "react";

import background from "./../../assets/background.jpeg";
import { Button, InputField } from "../../components";
import { apiRegisterCustomer, apiRegisterShop } from "../../apis/user";
import Swal from "sweetalert2";
import path from "./../../utils/path";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { validate } from "../../utils/helpers";
import { showModal } from "../../stores/app/appSlice";
import Loading from "../../components/Loading";

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [payload, setPayload] = useState({
    email: "",
    password: "",
    username: "",
    name: "",
    phone_number: "",
    shop_name: "",
    description: "",
    address: "",
    shop_logo:
      "https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg",
  });
  const [isCustomer, setIsCustomer] = useState(true);

  const resetPayload = () => {
    setPayload({
      email: "",
      password: "",
      username: "",
      name: "",
      phone_number: "",
      shop_name: "",
      description: "",
      address: "",
      shop_logo:
        "https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg",
    });
  };
  const [invalidFields, setInvalidFields] = useState([]);
  const handleSubmit = useCallback(async () => {
    const { shop_name, description, ...cus } = payload;
    const { name, ...shop } = payload;

    const isValids = isCustomer
      ? validate(cus, setInvalidFields)
      : validate(shop, setInvalidFields);
    console.log(isValids);
    if (isValids === 0) {
      dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
      let response = {};
      if (isCustomer) {
        response = await apiRegisterCustomer(cus);
      } else {
        response = await apiRegisterShop(shop);
      }
      console.log(response);
      dispatch(showModal({ isShowModal: false, modalChildren: null }));
      if (response.success) {
        Swal.fire("Congratulation", "Đăng ký thành công", "success").then(
          () => {
            navigate(`/${path.LOGIN}`);
          }
        );
      } else {
        Swal.fire(
          "Toang!",
          response.message ? response.message : "Đã xảy ra lỗi",
          "error"
        );
      }
    }
  }, [payload, isCustomer]);

  useEffect(() => {
    resetPayload();
  }, [isCustomer]);

  const handleChangeRole = (e) => {
    setIsCustomer(e.target.value === "true");
  };
  return (
    <div className="relative w-full h-screen bg-zinc-900/90">
      <img
        className="absolute w-full h-full object-cover mix-blend-overlay"
        src={background}
        alt="background-auth"
      />
      <div className="absolute top-1/2 left-1/2 flex justify-center items-center h-full translate-x-[-50%] translate-y-[-50%]">
        <form className="max-w-[400px] w-full mx-auto bg-white px-8 py-4 ">
          <div className="flex flex-col mb-1">
            <InputField
              type="text"
              placeholder="Nhập email"
              value={payload.email}
              nameKey="email"
              setValue={setPayload}
              invalidFields={invalidFields}
              setInvalidFields={setInvalidFields}
            />
          </div>
          <div className="flex flex-col ">
            <InputField
              type="password"
              setValue={setPayload}
              placeholder="Nhật mật khẩu"
              value={payload.password}
              nameKey="password"
              invalidFields={invalidFields}
              setInvalidFields={setInvalidFields}
            />
          </div>

          <div>
            <div className="flex flex-col mb-1">
              <InputField
                type="text"
                setValue={setPayload}
                placeholder="Nhập username"
                value={payload.username}
                nameKey="username"
                invalidFields={invalidFields}
                setInvalidFields={setInvalidFields}
              />
            </div>
            {isCustomer ? (
              <div className="flex flex-col mb-1">
                <InputField
                  type="text"
                  setValue={setPayload}
                  placeholder="Nhập tên của bạn"
                  value={payload.name}
                  label="Tên"
                  nameKey="name"
                  invalidFields={invalidFields}
                  setInvalidFields={setInvalidFields}
                />
              </div>
            ) : (
              <div>
                <div className="flex flex-col mb-1">
                  <InputField
                    type="text"
                    setValue={setPayload}
                    placeholder="Nhập tên shop"
                    value={payload.shop_name}
                    label="Tên shop"
                    nameKey="shop_name"
                    invalidFields={invalidFields}
                    setInvalidFields={setInvalidFields}
                  />
                </div>

                <div className="flex flex-col mb-1">
                  <InputField
                    type="text"
                    setValue={setPayload}
                    placeholder="Nhập mô tả"
                    value={payload.description}
                    label="Mô tả"
                    nameKey="description"
                    invalidFields={invalidFields}
                    setInvalidFields={setInvalidFields}
                  />
                </div>
              </div>
            )}

            <div className="flex flex-col mb-1">
              <InputField
                type="text"
                setValue={setPayload}
                placeholder="Nhập số điện thoại"
                value={payload.phone_number}
                nameKey="phone_number"
                label="Số điện thoại"
                invalidFields={invalidFields}
                setInvalidFields={setInvalidFields}
              />
            </div>
            <div className="flex flex-col mb-1">
              <InputField
                type="text"
                setValue={setPayload}
                placeholder="Nhập số địa chỉ"
                value={payload.address}
                nameKey="address"
                label="Địa chỉ"
                invalidFields={invalidFields}
                setInvalidFields={setInvalidFields}
              />
            </div>
          </div>

          <Button
            className="w-full py-2 mt-2 bg-main hover:bg-main relative text-white"
            title="Đăng ký"
            handleOnClick={handleSubmit}
          />

          <div>
            <div className="flex justify-between mt-2">
              <div className="flex">
                <input
                  type="radio"
                  id="cus"
                  name="role"
                  value="true"
                  onChange={handleChangeRole}
                />
                <label htmlFor="cus">Khách hàng</label>
              </div>
              <div className="flex">
                <input
                  type="radio"
                  id="shop"
                  name="role"
                  value="false"
                  onChange={handleChangeRole}
                />
                <label htmlFor="shop">Shop</label>
              </div>
            </div>
            <p className="text-center mt-2 text-xs ">
              Bạn đã có tài khoản?
              <span
                className=" ml-4 hover:underline cursor-pointer text-sm font-medium text-main hover:text-blue-600"
                onClick={() => navigate(`/${path.LOGIN}`)}
              >
                Đăng nhập ngay!!!
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
