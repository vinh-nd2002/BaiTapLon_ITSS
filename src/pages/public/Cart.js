import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, CartProduct, InputField } from "../../components";
// import { formatMoney } from "../../utils/helpers";
import { getCurrent } from "../../stores/users/userAction";
import { apiCreateDelivery } from "../../apis/delivery";
import { apiCreateOrder } from "../../apis/order";
import { useNavigate } from "react-router-dom";
import path from "../../utils/path";
import Swal from "sweetalert2";
import { validate } from "../../utils/helpers";
import { checkout } from "../../apis/invoice";
import { checkoutSuccess } from "../../stores/cart/cartSlice";
import { showModal } from "../../stores/app/appSlice";
import Loading from "../../components/Loading";

const Cart = () => {
  const { shops } = useSelector((state) => state.cart);
  const { isLoggedIn, current } = useSelector((state) => state.user);
  const [selectedShop, setSelectedShop] = useState(null);
  const [buy, setBuy] = useState(null);
  const [show, setShow] = useState(null);
  const [invalidFieldsOrder, setInvalidFieldsOrder] = useState([]);
  const [deliveryInfo, setDeliveryInfo] = useState({
    address: current?.customer?.address || "",
    numberPhone: current?.customer?.phone_number || "",
    receiver_name: current?.customer?.name || "",
    note: "",
  });

  const [invoiceInfo, setInvoiceInfo] = useState({
    id: null,
    payment_method: null,
    total_amount: null,
    total_amount_decreased: null,
    total_amount_payable: null,
  });

  const [isOrder, setIsOrder] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState(null);

  const handleChangePaymentMethod = (e) => {
    setPaymentMethod(e.target.value);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getCurrent());
    }
  }, [dispatch]);

  const handleChange = (e) => {
    setSelectedShop(e.target.value);
    setBuy(shops.find((shop) => +shop.id === +e.target.value));
  };

  const reset = () => {
    setDeliveryInfo({
      address: "",
      numberPhone: "",
      receiver_name: "",
      note: "",
    });
    setInvoiceInfo({
      id: null,
      payment_method: null,
      total_amount: null,
      total_amount_decreased: null,
      total_amount_payable: null,
    });
    setPaymentMethod(null);
    setIsOrder(true);
    setShow(null);
    setBuy(null);
  };

  const handleSubmitOrder = useCallback(async () => {
    const isValids = validate(deliveryInfo, setInvalidFieldsOrder);

    if (!paymentMethod) {
      setShow(true);
    } else {
      setShow(null);
    }
    if (isValids === 0) {
      if (!isLoggedIn) {
        Swal.fire("Toang!", "Bạn chưa đăng nhập", "error");
        navigate(`/${path.LOGIN}`);
      }

      dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
      const response = await apiCreateDelivery({
        ...deliveryInfo,
        shipping_fee: 30000,
      });

      if (response.success) {
        const order_items = buy.products.map((product) => {
          return {
            product_coupon_id: null,
            product_id: product.id,
            quantity: product.quantity,
          };
        });
        const orderForm = {
          shop_id: buy.id,
          delivery_info_id: response.data.id,
          note: deliveryInfo.note,
          payment_method: paymentMethod,
          payment_status: "unpaid",
          customer_coupon_id: current.customer.id,
          order_items: order_items,
        };
        const invoice = await apiCreateOrder(orderForm);
        if (invoice.success) {
          dispatch(showModal({ isShowModal: false, modalChildren: null }));
          Swal.fire(
            "Chúc mừng!",
            "Cảm ơn bạn. Vui lòng xác nhận thông tin thanh toán ^^",
            "success"
          );
          const {
            id,
            total_amount,
            payment_method,
            total_amount_decreased,
            total_amount_payable,
          } = invoice.data;
          setIsOrder(false);
          setInvoiceInfo({
            id,
            total_amount,
            payment_method,
            total_amount_decreased,
            total_amount_payable,
          });
        }
      }
    }
  }, [deliveryInfo, paymentMethod, invoiceInfo]);

  const handleSubmitCheckout = async () => {
    dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
    const response = await checkout(invoiceInfo.id);
    if (response.success) {
      dispatch(checkoutSuccess({ id: buy.id }));
      reset();
      dispatch(showModal({ isShowModal: false, modalChildren: null }));
      Swal.fire("Chúc mừng!", "Bạn đã mua hàng thành công", "success");
    }
  };

  const renderForm = () => {
    if (isOrder) {
      return (
        <form>
          <div className="flex flex-col mb-2">
            <InputField
              type="text"
              setValue={setDeliveryInfo}
              placeholder="Nhập tên người nhận"
              value={deliveryInfo.receiver_name}
              nameKey="receiver_name"
              label="Người nhận"
              invalidFields={invalidFieldsOrder}
              setInvalidFields={setInvalidFieldsOrder}
            />
          </div>
          <div className="flex flex-col mb-2">
            <InputField
              type="text"
              placeholder="Nhập số điện thoại"
              value={deliveryInfo.numberPhone}
              nameKey="numberPhone"
              label="Điện thoại"
              setValue={setDeliveryInfo}
              invalidFields={invalidFieldsOrder}
              setInvalidFields={setInvalidFieldsOrder}
            />
          </div>
          <div className="flex flex-col ">
            <InputField
              type="text"
              setValue={setDeliveryInfo}
              placeholder="Nhập địa chỉ"
              value={deliveryInfo.address}
              nameKey="address"
              label="Địa chỉ nhận"
              invalidFields={invalidFieldsOrder}
              setInvalidFields={setInvalidFieldsOrder}
            />
          </div>
          <div className="flex flex-col ">
            <InputField
              type="text"
              setValue={setDeliveryInfo}
              placeholder="Ghi chú thêm"
              value={deliveryInfo.note}
              nameKey="note"
              label="Ghi chú"
              invalidFields={invalidFieldsOrder}
              setInvalidFields={setInvalidFieldsOrder}
            />
          </div>
          <h4 className="mt-2">Phương thức thanh toán</h4>
          {show && (
            <small className="text-[10px] italic text-main">Bắt buộc!</small>
          )}
          <div className="flex justify-between mt-2">
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

          <Button
            className="w-full py-3 mt-4 bg-main hover:bg-main text-white"
            title="Đặt hàng"
            handleOnClick={handleSubmitOrder}
          />
        </form>
      );
    } else {
      return (
        <form className="border ">
          <h2 className="text-sm text-white text-center py-2 bg-main">
            Thông tin người nhận hàng
          </h2>
          <div className="p-2">
            <div className="flex flex-col mb-2">
              <label>Tên người nhận</label>
              <input
                type="text"
                className="outline-none border px-2 py-1 bg-slate-300"
                defaultValue={deliveryInfo.receiver_name}
              />
            </div>
            <div className="flex flex-col mb-2">
              <label>Điện thoại</label>
              <input
                type="text"
                className="outline-none border px-2 py-1 bg-slate-300"
                defaultValue={deliveryInfo.receiver_name}
              />
            </div>
            <div className="flex flex-col ">
              <label>Địa chỉ nhận</label>
              <input
                type="text"
                className="outline-none border px-2 py-1 bg-slate-300"
                defaultValue={deliveryInfo.receiver_name}
              />
            </div>
            <div className="flex justify-between mt-2 mr-2">
              <span>Thanh toán: </span>
              <span>{paymentMethod === "card" ? "Thẻ" : "Tiền mặt"}</span>
            </div>
          </div>
          <h2 className="text-sm text-white text-center py-2 bg-main">
            Thông tin hóa đơn
          </h2>
          <div className="p-2">
            <div className="flex flex-col mb-2">
              <label>Tổng tiền</label>
              <input
                type="text"
                className="outline-none border px-2 py-1 bg-slate-300"
                defaultValue={invoiceInfo.total_amount}
              />
            </div>
            <div className="flex flex-col mb-2">
              <label>Tiền giảm</label>
              <input
                type="text"
                className="outline-none border px-2 py-1 bg-slate-300"
                defaultValue={invoiceInfo.total_amount_decreased}
              />
            </div>
            <div className="flex flex-col ">
              <label>Tiền phải trả</label>
              <input
                type="text"
                className="outline-none border px-2 py-1 bg-slate-300"
                defaultValue={invoiceInfo.total_amount_payable}
              />
            </div>

            <Button
              className="w-full py-3 mt-4 bg-main hover:bg-main text-white"
              title="Thanh toán"
              handleOnClick={handleSubmitCheckout}
            />
          </div>
        </form>
      );
    }
  };

  return (
    <div className="w-main">
      <div className="flex shadow-md my-10">
        <div className="w-3/4 bg-white p-4">
          <h1 className="font-semibold text-2xl">Thông tin giỏ hàng</h1>
          {!shops && <div className="h-[500px]">Không có sản phẩm nào</div>}
          {shops &&
            shops.map((shop, index) => {
              return (
                <div key={shop.id} className="border my-2">
                  <div className="flex justify-between px-4">
                    <div className="flex items-center gap-4 mt-4">
                      <img
                        src={
                          shop.logo ||
                          "https://incucdep.com/wp-content/uploads/2014/12/logo-thoi-trang.jpg"
                        }
                        className="w-[50px] h-[50px] rounded-full border "
                        alt={shop.shop_name}
                      />
                      <h2 className="font-semibold ">
                        Shop:{" "}
                        <span className="text-xl text-main">
                          {shop.shop_name}
                        </span>
                      </h2>
                    </div>
                    <input
                      type="radio"
                      name="shop"
                      value={shop.id}
                      checked={+shop.id === +selectedShop}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="flex my-3  px-4">
                    <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                      Product Details
                    </h3>
                    <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">
                      Quantity
                    </h3>
                    <h3 className="font-semibold  text-gray-600 text-xs uppercase w-1/5 text-center">
                      Price
                    </h3>
                    <h3 className="font-semibold  text-gray-600 text-xs uppercase w-1/5 text-center">
                      Total
                    </h3>
                  </div>
                  {shop.products &&
                    shop.products.map((product, index) => {
                      const shopItem = {
                        id: shop.id,
                        product: { ...product },
                      };
                      return <CartProduct shop={shopItem} key={index} />;
                    })}
                </div>
              );
            })}
        </div>
        {buy && (
          <div id="summary" className="w-1/4 px-8 py-10">
            {isOrder ? (
              <h1 className="font-semibold text-2xl pb-8">{buy.shop_name}</h1>
            ) : (
              <h1 className="font-semibold text-2xl pb-8">Xác nhận đơn hàng</h1>
            )}
            {renderForm()}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
