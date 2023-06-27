import React, { useCallback, useState } from "react";
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

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [payload, setPayload] = useState({
    email: "",
    password: "",
    username: "",
    firstName: "",
    lastName: "",
    numberPhone: "",
  });
  const [isLogin, setIsLogin] = useState(true);

  const resetPayload = () => {
    setPayload({
      email: "",
      password: "",
      username: "",
      firstName: "",
      lastName: "",
      numberPhone: "",
    });
  };
  const handleSubmit = useCallback(async () => {
    const { username, firstName, lastName, numberPhone, ...data } = payload;
    if (isLogin === true) {
      const response = await apiLogin(data);
      console.log("login ==>>", response);
      if (response.success) {
        dispatch(loginReducer({ isLoggedIn: true, userData: response.data }));
        navigate(`/${path.HOME}`);
      } else {
        Swal.fire("Oops!", response.mes, "error");
      }
    } else {
      const response = await apiRegister({
        firstName,
        lastName,
        numberPhone,
        ...data,
      });
      if (response.status) {
        console.log(response);
        Swal.fire("Congratulation", response.mes, "success").then(() => {
          setIsLogin(true);
          resetPayload();
        });
      } else {
        Swal.fire("Oops!", response.mes, "error");
      }
    }
  }, [payload, isLogin]);

  return (
    <div className="relative w-full h-screen bg-zinc-900/90">
      <img
        className="absolute w-full h-full object-cover mix-blend-overlay"
        src={background}
        alt="background-auth"
      />
      <div className="absolute top-1/2 left-1/2 flex justify-center items-center h-full translate-x-[-50%] translate-y-[-50%]">
        <form className="max-w-[400px] w-full mx-auto bg-white px-8 py-4 ">
          <div className="flex justify-center items-center ">
            <img src={logo} alt="logo" className="h-[150px]" />
          </div>

          {!isLogin && (
            <div>
              <div className="flex justify-between gap-2">
                <div className="flex flex-col mb-2">
                  <InputField
                    type="text"
                    setValue={setPayload}
                    placeholder="Enter your first name"
                    value={payload.firstName}
                    nameKey="firstName"
                    label="First Name"
                  />
                </div>
                <div className="flex flex-col mb-2">
                  <InputField
                    type="text"
                    setValue={setPayload}
                    placeholder="Enter your last name"
                    value={payload.lastName}
                    nameKey="lastName"
                    label="Last Name"
                  />
                </div>
              </div>
              <div className="flex flex-col mb-2">
                <InputField
                  type="text"
                  setValue={setPayload}
                  placeholder="Enter your number phone"
                  value={payload.numberPhone}
                  nameKey="numberPhone"
                  label="Number Phone"
                />
              </div>
              <div className="flex flex-col mb-2">
                <InputField
                  type="text"
                  setValue={setPayload}
                  placeholder="Enter your username"
                  value={payload.username}
                  nameKey="username"
                />
              </div>
            </div>
          )}
          <div className="flex flex-col mb-2">
            <InputField
              type="text"
              placeholder="Enter your email"
              value={payload.email}
              nameKey="email"
              setValue={setPayload}
            />
          </div>
          <div className="flex flex-col ">
            <InputField
              type="password"
              setValue={setPayload}
              placeholder="Enter your password"
              value={payload.password}
              nameKey="password"
            />
          </div>
          {isLogin ? (
            <Button
              className="w-full py-3 mt-4 bg-main hover:bg-main relative text-white"
              title="Login"
              handleOnClick={handleSubmit}
            />
          ) : (
            <Button
              className="w-full py-3 mt-4 bg-main hover:bg-main relative text-white"
              title="Sign up"
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
                  {" "}
                  Forgot password?
                </span>
              </div>
            )}
            {isLogin ? (
              <p className="text-center mt-4 text-xs ">
                Not a member?
                <span
                  className=" ml-4 hover:underline cursor-pointer text-sm font-medium text-main hover:text-blue-600"
                  onClick={() => setIsLogin(false)}
                >
                  Sign up now!!!
                </span>
              </p>
            ) : (
              <p className="text-center mt-4 text-xs ">
                Already have an account?
                <span
                  className=" ml-4 hover:underline cursor-pointer text-sm font-medium text-main hover:text-blue-600"
                  onClick={() => setIsLogin(true)}
                >
                  Login now!!!
                </span>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
