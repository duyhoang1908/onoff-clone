import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .required("Không được bỏ trống")
    .email("Email không chính xác"),
  password: Yup.string().required("Không được bỏ trống"),
});

export const registerSchema = Yup.object().shape({
  username: Yup.string().required("Không được bỏ trống"),
  email: Yup.string()
    .required("Không được bỏ trống")
    .email("Email không chính xác"),
  password: Yup.string()
    .required("Không được bỏ trống")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Tối thiểu 8 ký tự bao gồm 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt"
    ),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Mật khẩu không khớp"
  ),
});

export const checkoutSchema = Yup.object().shape({
  phone: Yup.string().required("Không được bỏ trống"),
  // district: Yup.string().required("Vui lòng chọn quận / huyện"),
  // city: Yup.string().required("Vui lòng chọn thành phố"),
  address:Yup.string().required("Không được bỏ trống")
});
