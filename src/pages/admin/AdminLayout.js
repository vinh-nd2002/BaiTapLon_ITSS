import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import path from "./../../utils/path";
import AdminSideBar from "../../components/Admin/AdminSideBar";
import { Modal } from "../../components";
const AdminLayout = () => {
  const { isShowModal, modalChildren } = useSelector((state) => state.admin);
  const { isLoggedIn, role } = useSelector((state) => state.user);
  if (!isLoggedIn) return <Navigate to={`/${path.LOGIN}`} replace={true} />;

  if (+role !== 1) {
    return <Navigate to={`/${path.HOME}`} replace={true} />;
  }

  return (
    <div className="flex w-full min-h-screen relative">
      <div className="flex-none w-[20%] fixed top-0 bottom-0 text-white bg-slate-500">
        <AdminSideBar />
      </div>
      <div className="w-[20%]"></div>
      <div className="flex-auto relative">
        {isShowModal && (
          <div className="absolute w-full h-full flex justify-center items-center ">
            {modalChildren}
          </div>
        )}
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
