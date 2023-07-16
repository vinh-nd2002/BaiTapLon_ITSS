import React, { useState } from "react";
import Button from "./Button";
const InvoiceModal = ({ invoice, deliveryInfo, handleSubmitCheckout }) => {
  const { order } = invoice;
  const [paymentMethod, setPaymentMethod] = useState(null);

  const handleChangePaymentMethod = (e) => {
    setPaymentMethod(e.target.value);
  };

  return (
    <div className="bg-white w-[600px] px-[20px] absolute top-1/2 left-1/2 m-auto translate-x-[-50%] translate-y-[-50%] text-black rounded-md">
      <div className="flex flex-col gap-2 my-[50px] font-bold">
        <h2>Thông tin hóa đơn</h2>
        <table className="w-full table-auto mb-6 text-left">
          <thead className="font-bold bg-main text-white border-white border-b-[2px] text-center">
            <tr>
              <th className="px-2 py-2">#</th>
              <th className="px-4 py-2">Sản phẩm</th>
              <th className="px-4 py-2">Số lượng</th>
              <th className="px-4 py-2">Giá tiền</th>
              <th className="px-4 py-2">Tổng tiền</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {order?.order_items &&
              order.order_items.map((item, index) => (
                <tr
                  key={item.product.id}
                  className="border-y border-main transition-colors cursor-pointer"
                >
                  <td className="py-4 text-center">{index + 1}</td>
                  <td className="py-4">
                    <span>{item.product.name}</span>
                  </td>
                  <td className="py-4">
                    <span>{item.quantity}</span>
                  </td>
                  <td className="py-4 text-center">
                    <span>
                      <td className="py-4">{item.product.price}</td>
                    </span>
                  </td>
                  <td className="py-4 text-center">
                    {item.quantity * item.product.price}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="flex justify-between gap-4 px-10">
          <h2>Thông tin giao hàng</h2>
          <div className="flex flex-col text-sm">
            <div className="flex justify-between gap-4">
              <span className="font-normal">Người nhận:</span>
              <span> {deliveryInfo.receiver_name}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="font-normal">Số điện thoại:</span>
              <span> {deliveryInfo.numberPhone}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="font-normal">Địa chỉ:</span>
              <span> {deliveryInfo.address}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="font-normal">Ghi chú:</span>
              <span> {deliveryInfo.note}</span>
            </div>
          </div>
        </div>
        <div className="flex justify-between gap-4 px-10 my-2">
          <h2>Thông tin thanh toán</h2>
          <div className="flex flex-col text-sm">
            <div className="flex justify-between gap-4">
              <span className="font-normal">Tổng tiền:</span>
              <span> {invoice.total_amount}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="font-normal">Giảm giá:</span>
              <span> {invoice.total_amount_decreased}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="font-normal">Thanh toán:</span>
              <span> {invoice.total_amount_payable}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 px-10 my-2">
          <h2>Thông tin thanh toán</h2>
          <div className="flex justify-between gap-4">
            <div className="flex">
              <input
                type="radio"
                id="card"
                name="payment"
                defaultValue="card"
                onChange={handleChangePaymentMethod}
              />
              <label htmlFor="card">Thẻ</label>
            </div>
            <div className="flex">
              <input
                type="radio"
                id="cod"
                name="payment"
                defaultValue="cod"
                onChange={handleChangePaymentMethod}
              />
              <label htmlFor="cod">Tiền mặt</label>
            </div>
          </div>
        </div>
        <button
          className="w-full bg-main p-4 text-white"
          onClick={() => handleSubmitCheckout()}
        >
          Xác nhận thanh toán
        </button>
      </div>
    </div>
  );
};

export default InvoiceModal;
