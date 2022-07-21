import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { cartSelector, userSelector } from "../../store/selector";
import "./Cart.scss";
import { cartSlice } from "../../store/Slice/cartSlice";
import { useState } from "react";
import Button from "../Button/Button";

const Cart = () => {
  const { cart, cartModal } = useSelector(cartSelector);
  const user = useSelector(userSelector);

  const [money, setMoney] = useState();
  const [isPending, setIsPending] = useState(false);

  const dispatch = useDispatch();
  const history = useNavigate();

  useEffect(() => {
    const total = cart.reduce((a, b) => {
      return a + b.price * b.count;
    }, 0);
    setMoney(total);
  }, [cart]);

  const handleSetCartModal = () => {
    dispatch(cartSlice.actions.setCartModal(false));
  };

  const handleOrder = () => {
    setIsPending(true);
    if (user) {
      if (cart.length) {
        dispatch(cartSlice.actions.setPrice(money));
        handleSetCartModal();
        history("/checkout");
        setIsPending(false);
        return;
      }
      handleSetCartModal();
      history("/");
      setIsPending(false);
      return;
    }
    handleSetCartModal();
    setIsPending(false);
    history("/login");
  };

  const hanldeDeleteItem = (infor) => {
    dispatch(cartSlice.actions.deleteItem(infor));
  };

  return (
    <div
      className="cart"
      style={{ transform: cartModal ? "translateX(0)" : "translateX(100%)" }}
    >
      <div className="cart__header">
        <p>GIỎ HÀNG CỦA BẠN</p>
        <FaTimes onClick={handleSetCartModal} style={{ cursor: "pointer" }} />
      </div>
      <div className="cart__body">
        {cart.map((item, index) => {
          return (
            <div key={index} className="cart__product">
              <img src={item.src[0]} alt="" />
              <div className="cart__product__info">
                <p className="cart__info__name">{item.name}</p>
                <p className="cart__info__price">{item.price}</p>
                <p>Size: {item.size}</p>
                <p>Số lượng: {item.count}</p>
              </div>
              <div
                onClick={() =>
                  hanldeDeleteItem({
                    code: item.code,
                    size: item.size,
                  })
                }
                className="cart__product__cancel"
              >
                <FaTrash />
              </div>
            </div>
          );
        })}
      </div>

      <div className="cart__total">
        <div className="cart__price">
          <p>Tổng tiền hàng</p>
          <p>{money} đ</p>
        </div>
        <Button onClick={handleOrder} isPending={isPending} type="ĐẶT HÀNG" />
      </div>
    </div>
  );
};

export default Cart;
