import React, { useCallback, useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { AiFillFacebook } from "react-icons/ai";

import background from "./../../assets/background.jpeg";
import logo from "./../../assets/logo.png";
import { Button, InputField } from "../../components";
import { apiLogin } from "../../apis/user";
import Swal from "sweetalert2";
import path from "./../../utils/path";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginReducer } from "./../../stores/users/userSlice";
import { validate } from "../../utils/helpers";
import { showModal } from "../../stores/app/appSlice";
import Loading from "../../components/Loading";
import { getCurrent } from "../../stores/users/userAction";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [payload, setPayload] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [isLogin, setIsLogin] = useState(true);
  const [isCustomer, setIsCustomer] = useState(true);

  const resetPayload = () => {
    setPayload({
      email: "",
      password: "",
      username: "",
    });
  };
  const [invalidFields, setInvalidFields] = useState([]);
  const handleSubmit = useCallback(async () => {
    const { username, ...data } = payload;
    // const { username, firstName, lastName, numberPhone, ...data } = payload;

    const isValids = isLogin
      ? validate(data, setInvalidFields)
      : validate(payload, setInvalidFields);
    if (isValids === 0) {
      if (isLogin === true) {
        dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
        const response = await apiLogin(data);
        console.log(response);
        dispatch(showModal({ isShowModal: false, modalChildren: null }));
        if (response.success) {
          localStorage.setItem("accessToken", response.data);
          localStorage.setItem("isLoggedIn", true);
          dispatch(
            loginReducer({
              isLoggedIn: response.success,
              accessToken: response.data,
              role: response.user.role_user.role_id,
            })
          );
          if (response.user.role_user.role_id === 1) {
            navigate(`/${path.ADMIN}/${path.ADMIN_DASHBOARD}`);
          } else if (response.user.role_user.role_id === 2) {
            dispatch(getCurrent());
            navigate(`/${path.SHOP}/${path.SHOP_DASHBOARD}`);
          } else {
            navigate(`/${path.HOME}`);
          }
        } else {
          Swal.fire("Oops!", "Thông tin không đúng", "error");
        }
      }
    }
  }, [payload, isLogin]);

  useEffect(() => {
    resetPayload();
  }, [isLogin]);

  useEffect(() => {}, [isCustomer]);

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
          <div
            className="flex justify-center items-center cursor-pointer"
            onClick={() => navigate(`/${path.HOME}`)}
          >
            <img src={logo} alt="logo" className="h-[150px]" />
          </div>
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

          {!isLogin && (
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
                  {console.log(isCustomer)}
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
          )}

          {isLogin ? (
            <Button
              className="w-full py-2 mt-2 bg-main hover:bg-main relative text-white"
              title="Đăng nhập"
              handleOnClick={handleSubmit}
            />
          ) : (
            <Button
              className="w-full py-2 mt-2 bg-main hover:bg-main relative text-white"
              title="Đăng ký"
              handleOnClick={handleSubmit}
            />
          )}

          <div>
            {isLogin ? (
              <div className="flex justify-between py-4 gap-2">
                <p className="border border-gray-400 shadow-lg hover:shadow-xl px-10 py-2 relative flex items-center cursor-pointer">
                  <AiFillFacebook className="mr-2 text-blue-600" />
                  <span className="text-sm">Facebook</span>
                </p>
                <p className="border border-gray-400 shadow-lg hover:shadow-xl px-10 py-2 relative flex items-center cursor-pointer">
                  <FcGoogle className="mr-2 " />
                  <span className="text-sm">Google</span>
                </p>
              </div>
            ) : (
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
            )}
            {isLogin && (
              <div className="flex items-center">
                <span className="mr-2 cursor-pointer text-xs hover:underline hover:text-blue-600">
                  Quên mật khẩu?
                </span>
              </div>
            )}
            {isLogin ? (
              <p className="text-center mt-2 text-xs ">
                Bạn chưa có tài khoản?
                <span
                  className=" ml-4 hover:underline cursor-pointer text-sm font-medium text-main hover:text-blue-600"
                  // onClick={() => setIsLogin(false)}
                  onClick={() => navigate(`/${path.REGISTER}`)}
                >
                  Đăng ký ngay!!!
                </span>
              </p>
            ) : (
              <p className="text-center mt-2 text-xs ">
                Bạn đã có tài khoản?
                <span
                  className=" ml-4 hover:underline cursor-pointer text-sm font-medium text-main hover:text-blue-600"
                  onClick={() => setIsLogin(true)}
                >
                  Đăng nhập ngay!!!
                </span>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
