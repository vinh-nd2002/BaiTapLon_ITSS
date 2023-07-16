import React, { Fragment, useEffect, useState } from "react";
import { apiAcceptOrder, apiGetOrders } from "../../apis";
import moment from "moment";
import { AiOutlineCheck } from "react-icons/ai";
import Swal from "sweetalert2";

const ManageOrder = () => {
  const [orders, setOrders] = useState([]);
  const [orderDetails, setOrderDetails] = useState(null);
  const fetchOrders = async () => {
    const response = await apiGetOrders();
    setOrders(response.data);
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdate = async (order) => {
    const response = await apiAcceptOrder(order.id);
    if (response.success) {
      fetchOrders();
      Swal.fire("Thông báo!", "Đã xác nhận đơn hàng^^", "success");
    } else {
      Swal.fire("Toang!", "Đã có lỗi xảy ra", "error");
    }
  };

  return (
    <div className="p-6">
      <h1 className="h-[75px] flex justify-between items-center text-3xl font-bold px-4">
        Quản lý đơn hàng
      </h1>
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
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
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
                  <td className="py-4 text-center">{order.order_status}</td>
                  <td className="py-4 flex justify-center items-center">
                    {order.order_status === "pending" && (
                      <AiOutlineCheck onClick={() => handleUpdate(order)} />
                    )}
                  </td>
                </tr>
              </Fragment>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageOrder;
