import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import moment from "moment";
import path from "./../../utils/path";
import { apiGetOrders } from "../../apis";
const Profile = () => {
  const [orders, setOrders] = useState([]);
  const [orderDetails, setOrderDetails] = useState(null);
  const fetchOrders = async () => {
    const response = await apiGetOrders();
    console.log(response);
    setOrders(response.data);
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  const { isLoggedIn, current } = useSelector((state) => state.user);
  if (!isLoggedIn || !current)
    return <Navigate to={`/${path.LOGIN}`} replace={true} />;

  const renderOrderItems = (order) => {
    return order.order_items.map((item) => (
      <Fragment key={item.id}>
        <tr>
          <th className="px-4 py-2">Tên sản phẩm</th>
          <th className="px-4 py-2">Giá</th>
          <th className="px-4 py-2">Số lượng</th>
          <th className="px-4 py-2">Mô tả</th>
        </tr>
        <tr>
          <td className="py-4">
            <span>{item.product.name}</span>
          </td>
          <td className="py-4 pl-2">{item.product.price}</td>
          <td className="py-4">{item.quantity}</td>

          <td className="py-4">
            <span>{item.product.description}</span>
          </td>
        </tr>
      </Fragment>
    ));
  };

  return (
    <div>
      <h1 className="mt-4 font-semibold text-2xl">Thông tin khách hàng</h1>
      <div className="flex justify-between">
        <div className="w-1/3 flex flex-col py-4 px-6">
          <div className="flex items-center justify-center">
            <img
              src="https://i.pinimg.com/originals/e0/7a/22/e07a22eafdb803f1f26bf60de2143f7b.png"
              alt="avatar"
              className="w-[200px] h-[200px] rounded-full my-2 "
            />
          </div>
          <h2 className="flex justify-between my-2 font-bold">
            <span>Username:</span>
            <span className="text-main">{current.username}</span>
          </h2>
          {current.customer && (
            <div>
              <h2 className="flex justify-between my-2 font-bold">
                <span>Tên:</span>{" "}
                <span className="text-main">{current?.customer.name}</span>
              </h2>
              <h2 className="flex justify-between my-2 font-bold">
                <span> Địa chỉ:</span>
                <span className="text-main">{current?.customer.address}</span>
              </h2>
              <h2 className="flex justify-between my-2 font-bold">
                <span>Số điện thoại:</span>
                <span className="text-main">
                  {current?.customer.phone_number}
                </span>
              </h2>
            </div>
          )}
          <h2 className="flex justify-between my-2 font-bold">
            <span>Email:</span>
            <span className="text-main">{current.email}</span>
          </h2>
          <h2 className="flex justify-between my-2 font-bold">
            <span>Ngày tạo:</span>
            <span className="text-main">
              {moment(current.created_at).format("YYYY-MM-DD hh:mm:ss")}
            </span>
          </h2>
        </div>
        <div className="w-2/3">
          Lịch sử mua hàng
          <table className="w-full table-auto mb-6 text-left">
            <thead className="font-bold bg-main text-white border-white border-b-[2px] text-center">
              <tr>
                <th className="px-2 py-2">#</th>
                <th className="px-4 py-2">Người nhận</th>
                <th className="px-4 py-2">Số điện thoại</th>
                <th className="px-4 py-2">Địa chỉ</th>
                <th className="px-4 py-2">Ghi chú</th>
                <th className="px-4 py-2">Ngày đặt</th>
                <th className="px-4 py-2">Trạng thái</th>
              </tr>
            </thead>
            {orderDetails && renderOrderItems(orderDetails)}
            <tbody className="text-sm">
              {orders &&
                orders.map((order, index) => (
                  <Fragment key={order.id}>
                    <tr
                      className="border-y border-main transition-colors cursor-pointer hover:bg-gray-200"
                      onClick={() => setOrderDetails(order)}
                    >
                      <td className="py-4 text-center">{index + 1}</td>
                      <td className="py-4">
                        <span>{order.delivery_info.receiver_name}</span>
                      </td>

                      <td className="py-4 pl-2">
                        {order.delivery_info.numberPhone}
                      </td>
                      <td className="py-4">{order.delivery_info.address}</td>

                      <td className="py-4">
                        <span>{order.delivery_info.note}</span>
                      </td>
                      <td className="py-4 text-center">
                        {moment(order.created_at).format("DD-MM-YYYY")}
                      </td>
                      <td className="py-4">{order.order_status}</td>
                    </tr>
                  </Fragment>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Profile;
