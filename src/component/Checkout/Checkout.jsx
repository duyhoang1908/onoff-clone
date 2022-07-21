import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaUserAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkoutSchema } from "../../schema";
import { cartSelector, userSelector } from "../../store/selector";
import { buyProducts } from "../../ultils/services";
import "./checkout.scss";
import { cartSlice } from "../../store/Slice/cartSlice";
import Button from "../Button/Button";

const Checkout = () => {
  const cart = useSelector(cartSelector);
  const user = useSelector(userSelector);
  const [dataCitys, setDataCitys] = useState([]);
  const [dataDistricts, setDataDistricts] = useState([]);
  const [dataAddress, setDataAddress] = useState([]);
  const [isPending, setIsPending] = useState(false)

  const history = useNavigate()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(checkoutSchema),
  });

  useEffect(() => {
    const fecthDataDress = () => {
      axios
        .get("https://provinces.open-api.vn/api/?depth=2")
        .then((res) => {
          setDataAddress(res.data);
          const citys = res.data.map((item) => ({
            label: item.name,
            value: item.codename,
          }));
          setDataCitys(citys);
          setDataDistricts(res.data[0].districts);
        })
        .catch((error) => console.log(error));
    };
    fecthDataDress();
  }, []);

  const handleConfirm = async(data) => {
    setIsPending(true)
    const collection = {
      cart: cart.cart,
      uid: user.uid,
      username:user.displayName,
      phone: data.phone,
      city: data.city,
      districts: data.districts,
      address: data.address,
      totalPrice: cart.price
    };
    await buyProducts(collection)
    dispatch(cartSlice.actions.resetCart())
    history("/profile")
    setIsPending(true)
    reset()
  };

  const handleOnChange = (e) => {
    const cityFiltered = dataAddress.filter((i) => i.name === e.target.value);
    console.log(cityFiltered[0].districts);
    setDataDistricts(cityFiltered[0].districts);
  };

  return (
    <div className="checkout">
      <div className="checkout__form">
        <h1>Thông tin của bạn</h1>
        <form onSubmit={handleSubmit(handleConfirm)}>
          <div className="form__groups">
            <div
              className="form"
              style={{
                border: errors.phone ? "2px solid red" : "1px solid #000",
                color: errors.phone ? "red" : "#000",
              }}
            >
              <FaUserAlt />
              <input
                type="text"
                placeholder="Nhập số điện thoại"
                {...register("phone")}
              />
            </div>
          </div>
          <div className="form__groups">
            <div className="form">
              <FaUserAlt />
              <select
                {...register("city")}
                onChange={handleOnChange}
                defaultValue={dataCitys[0]?.label}
              >
                <option>Tỉnh, Thành phố</option>
                {dataCitys.map((city) => {
                  return (
                    <option value={city.label} key={city.codename}>
                      {city.label}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form">
              <FaUserAlt />
              <select {...register("districts")}>
              <option>Quận, Huyện</option>
                {dataDistricts.map((district) => {
                  return (
                    <option value={district.name} key={district.code}>
                      {district.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="form__groups">
            <div
              className="form"
              style={{
                border: errors.address ? "2px solid red" : "1px solid #000",
                color: errors.address ? "red" : "#000",
              }}
            >
              <FaUserAlt />
              <input
                type="text"
                placeholder="Nhập địa chỉ cụ thể: số nhà, số đường ..."
                {...register("address")}
              />
            </div>
          </div>
          <Button isPending={isPending} type="Xác nhận"/>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
