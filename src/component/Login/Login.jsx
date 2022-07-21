import React, { useState } from "react";
import "./Login.scss";
import { auth } from "../../firebase/config";
import {
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { userSlice } from "../../store/Slice/userSlice";
import { loginSchema } from "../../schema";
import Button from "../Button/Button";

const Login = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const [loginError, setLoginError] = useState(false);
  const [ isPending, setIsPending] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(loginSchema),
  });

  const handleLoginWithEmail = (data) => {
    setIsPending(true)
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        setLoginError(true);
        const data = {
          uid:userCredential.user.uid,
          displayName: userCredential.user.displayName,
          email: userCredential.user.email
        }
        dispatch(userSlice.actions.setUser(data))
        reset();
        history("/");
      })
      .catch((error) => {
        if (error.message === "Firebase: Error (auth/wrong-password).")
          setLoginError(true);
      });
      setIsPending(false)
  };

  return (
    <div className="login">
      <div className="login__content">
        <h1 className="login__title">TÀI KHOẢN</h1>
        <span className="login__span">Khách hàng đã đăng ký tài khoản</span>
        <p>
          Bạn đã có tài khoản, xin mời đăng nhập bằng địa chỉ email đăng ký.
        </p>
        <form onSubmit={handleSubmit(handleLoginWithEmail)}>
          <div className="login__input">
            <label htmlFor="email">
              Email <span>*</span>
            </label>
            <input type="text" name="email" {...register("email")} />
          </div>
          <p className="login__error">{errors.email?.message}</p>

          <div className="login__input">
            <label htmlFor="password">
              Mật khẩu <span>*</span>
            </label>
            <input type="password" name="password" {...register("password")} />
          </div>
          <p className="login__error">{errors.password?.message}</p>
          <p
            style={{ display: loginError ? "block" : "none" }}
            className="login__error"
          >
            Tài khoản hoặc mật khẩu không chính xác
          </p>
          <div className="login__btn">
            <Button isPending={isPending} type="Đăng nhập"/>
          </div>
        </form>
      </div>
      <div className="login__change">
        <span>Khách hàng mới</span>
        <button>
          <Link to="/register">Đăng ký</Link>
        </button>
      </div>
    </div>
  );
};

export default Login;
