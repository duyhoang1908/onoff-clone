import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/config";
import { addDocument } from "../../ultils/services";
import { useState } from "react";
import { registerSchema } from "../../schema";
import Button from "../Button/Button";

const Register = () => {
  const [emailError, setEmailError] = useState(false);
  const [isPending, setIsPending] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(registerSchema),
  });
  const handleRegister = async (data) => {
    setIsPending(true);
    await createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        updateProfile(auth.currentUser, {
          displayName: data.username,
        });
        addDocument("user", {
          displayName: data.username,
          email: userCredential.user.email,
          uid: userCredential.user.uid,
        });
        setEmailError(false);
        reset();
      })
      .catch((error) => {
        if (error.message === "Firebase: Error (auth/email-already-in-use).")
          setEmailError(true);
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
        <form onSubmit={handleSubmit(handleRegister)}>
          <div className="login__input">
            <label htmlFor="username">
              Tên người dùng <span>*</span>
            </label>
            <input type="text" name="username" {...register("username")} />
          </div>
          <p className="login__error">{errors.username?.message}</p>

          <div className="login__input">
            <label htmlFor="email">
              Email <span>*</span>
            </label>
            <input type="text" name="email" {...register("email")} />
          </div>
          <p className="login__error">{errors.email?.message}</p>
          <p
            style={{ display: emailError ? "block" : "none" }}
            className="login__error"
          >
            Tài khoản đã tồn tại
          </p>
          <div className="login__input">
            <label htmlFor="password">
              Mật khẩu <span>*</span>
            </label>
            <input
              type="password"
              name="comfirpassword"
              {...register("password")}
            />
          </div>
          <p className="login__error">{errors.password?.message}</p>

          <div className="login__input">
            <label htmlFor="confirmPassword">
              Nhập lại mật khẩu <span>*</span>
            </label>
            <input
              type="password"
              name="confirmPassword"
              {...register("confirmPassword")}
            />
          </div>
          <p className="login__error">{errors.confirmPassword?.message}</p>

          <div className="login__btn">
            <Button isPending={isPending} type="Đăng ký"/>
            <p>Đây là rằng buộc *</p>
          </div>
        </form>
      </div>
      <div className="login__change">
        <span>Khách hàng mới</span>
        <button>
          <Link to="/login">Đăng nhập</Link>
        </button>
      </div>
    </div>
  );
};

export default Register;
