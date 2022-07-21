import React from "react";
import { useEffect } from "react";
import { userSelector } from "../../store/selector";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { userSlice } from "../../store/Slice/userSlice";
import { FaBell, FaListAlt, FaTicketAlt, FaUserAlt } from "react-icons/fa";
import "./profile.scss";
import { getListProductWithUid } from "../../ultils/services";

const Profile = () => {
  const user = useSelector(userSelector);
  const history = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    if (Object.keys(user).length === 0) history("/login");
    else {
      getListProductWithUid(user.uid).then((res) => {
        setData(res);
      });
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout();
  }, [user, history]);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => dispatch(userSlice.actions.setUser({})))
      .catch((error) => console.log(error));
  };
  return (
    <div className="profile">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="profile__body">
          <div className="profile__infor">
            <p>{user?.displayName}</p>
            <div className="profile__infor__list">
              <FaUserAlt />
              <p>Tài khoản của tôi</p>
            </div>
            <div className="profile__infor__list">
              <FaListAlt />
              <p>Đơn mua</p>
            </div>
            <div className="profile__infor__list">
              <FaBell />
              <p>Thông báo</p>
            </div>
            <div className="profile__infor__list">
              <FaTicketAlt />
              <p>Phiếu giảm giá</p>
            </div>
            <div className="profile__infor__list">
              <FaTicketAlt />
              <p onClick={handleSignOut}>Đăng xuất</p>
            </div>
          </div>
          <div className="profile__history">
            <h3 className="profile__history__title">Lịch sử đơn hàng</h3>
            <div className="profile__history__body">
              {data.length === 0 ? <div>Bạn chưa có đơn hàng nào</div> : data.map((product) => (
                <div key={product.id}>
                  <div className="profile__history__status">
                    <p>Mã đơn hàng:{product.id}</p>
                    <p>Trạng thái đơn hàng: {product.confirm ? "Đã xác nhận" : "Chưa xác nhận"}</p>
                  </div>
                  <div className="profile__history__list">
                    <p>Giá trị đơn hàng: {product.totalPrice} đ</p>
                    {product.cart.map((item, index) => {
                      return (
                        <div key={index} className="history__body__item">
                          <img src={item.src[0]} alt="" />
                          <div className="item__info">
                            <p className="item__info__name">{item.name}</p>
                            <p className="item__info__price">{item.price} đ</p>
                            <p>Size: {item.size}</p>
                            <p>Số lượng: {item.count}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
