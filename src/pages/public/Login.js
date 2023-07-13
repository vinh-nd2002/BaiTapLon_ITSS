import React, { useCallback, useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { AiFillFacebook } from "react-icons/ai";

import background from "./../../assets/background.jpeg";
import logo from "./../../assets/logo.png";
import { Button, InputField } from "../../components";
import { apiLogin, apiRegister } from "../../apis/user";
import Swal from "sweetalert2";
import path from "./../../utils/path";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginReducer } from "./../../stores/users/userSlice";
import { validate } from "../../utils/helpers";
import { showModal } from "../../stores/app/appSlice";
import Loading from "../../components/Loading";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [payload, setPayload] = useState({
    email: "",
    password: "",
    username: "",
    // firstName: "",
    // lastName: "",
    // numberPhone: "",
  });
  const [isLogin, setIsLogin] = useState(true);

  const resetPayload = () => {
    setPayload({
      email: "",
      password: "",
      username: "",
      // firstName: "",
      // lastName: "",
      // numberPhone: "",
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
        dispatch(showModal({ isShowModal: false, modalChildren: null }));
        if (response.success) {
          localStorage.setItem("accessToken", response.token);
          localStorage.setItem("isLoggedIn", true);
          dispatch(
            loginReducer({
              isLoggedIn: response.success,
              accessToken: response.token,
              role: response.user.role,
            })
          );
          if (response.user.role === 1) {
            navigate(`/${path.ADMIN}/${path.DASHBOARD}`);
          } else {
            navigate(`/${path.HOME}`);
          }
          //  if(response.user.role === 2 ){
          //   navigate(`/${path.ADMIN}/${path.DASHBOARD}`);
          // }
        } else {
          Swal.fire("Oops!", "Thông tin không đúng", "error");
        }
      } else {
        dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
        const response = await apiRegister(payload);
        dispatch(showModal({ isShowModal: false, modalChildren: null }));
        if (response.success) {
          Swal.fire("Congratulation", "Đăng ký thành công", "success").then(
            () => {
              setIsLogin(true);
            }
          );
        } else {
          Swal.fire("Oops!", "Đã xảy ra lỗi", "error");
        }
      }
    }
  }, [payload, isLogin]);

  useEffect(() => {
    resetPayload();
  }, [isLogin]);

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

          {!isLogin && (
            <div>
              <div className="flex flex-col mb-2">
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
            </div>
          )}
          <div className="flex flex-col mb-2">
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
          {isLogin ? (
            <Button
              className="w-full py-3 mt-4 bg-main hover:bg-main relative text-white"
              title="Đăng nhập"
              handleOnClick={handleSubmit}
            />
          ) : (
            <Button
              className="w-full py-3 mt-4 bg-main hover:bg-main relative text-white"
              title="Đăng ký"
              handleOnClick={handleSubmit}
            />
          )}

          <div>
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
            {isLogin && (
              <div className="flex items-center">
                <span className="mr-2 cursor-pointer text-xs hover:underline hover:text-blue-600">
                  Quên mật khẩu?
                </span>
              </div>
            )}
            {isLogin ? (
              <p className="text-center mt-4 text-xs ">
                Bạn chưa có tài khoản?
                <span
                  className=" ml-4 hover:underline cursor-pointer text-sm font-medium text-main hover:text-blue-600"
                  onClick={() => setIsLogin(false)}
                >
                  Đăng ký ngay!!!
                </span>
              </p>
            ) : (
              <p className="text-center mt-4 text-xs ">
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
