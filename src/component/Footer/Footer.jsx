import React from "react";
import { FaFacebookF,FaFacebookMessenger } from "react-icons/fa";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__list">
        <p>CÔNG TY CỔ PHẦN ONOFF</p>
        <p>ĐKKD: 0303930269, ngày cấp: 18/08/2005</p>
        <p>Sở Kế hoạch và đầu tư TP. Hồ Chí Minh</p>
        <p>
          Địa chỉ trụ sở chính: 366 Hai Bà Trưng, Phường Tân Định, Quận 1, TP Hồ
          Chí Minh
        </p>
        <img src="https://onoff.vn/media/images/bocongthuong.png" alt="" />
      </div>
      <div className="footer__list">
        <p>THÔNG TIN HỖ TRỢ</p>
        <span>Hướng dẫn thanh toán</span>
        <span>Hướng dẫn mua hàng</span>
        <span>Hướng dẫn chọn size</span>
        <span>Hướng dẫn đổi trả</span>
        <span>Hướng dẫn theo dõi đơn hàng</span>
        <span>Câu hỏi thường gặp</span>
      </div>
      <div className="footer__list">
        <p>THƯƠNG HIỆU</p>
        <span>Giới thiệu</span>
        <span>Blog</span>
        <span>Hệ thống cửa hàng</span>
        <span>Tuyển dụng</span>
        <span>Liên hệ</span>
        <br />
        <p>ƯU ĐÃI</p>
        <span>Thẻ quà tặng</span>
        <span>Khách hàng thân thiết</span>
      </div>
      <div className="footer__list">
        <p>LIÊN HỆ</p>
        <p>
          <i className="fa-solid fa-phone"></i> 0934441808 (số điện thoại cá nhân)
        </p>
        <p>
          <i className="fa-solid fa-phone"></i> 0946988885 (KD bán buôn MB)
        </p>
        <p>
          <i className="fa-solid fa-phone"></i> 0934441808 0931490049 (KD bán buôn
          MN)
        </p>
        <p>
          <i className="fa-solid fa-messages"></i> Live chat
        </p>
        <p>
          <i className="fa-solid fa-envelope"></i> hoangnhatbaduy2001@gmail.com
        </p>
        <p>ĐĂNG KÝ NHẬN MAIL TỪ ONOFF</p>
        <div className="footer__contact">
          <i className="fa-solid fa-envelope"></i>
          <input type="text" placeholder="Nhập email của bạn tại đây" />
          <button>Đăng ký</button>
        </div>
        <br />
        <div className="footer__media">
          <a href="https://www.facebook.com/duy.pipi.9/">
            <FaFacebookF style={{margin:"auto"}}/>
          </a>

          <a href="https://www.facebook.com/duy.pipi.9/">
            <FaFacebookMessenger style={{margin:"auto"}}/>
          </a>
        </div>
      </div>
      <div className="footer__list">
        <p>TÀI KHOẢN CỦA BẠN</p>
        <span>Tra cứu đơn hàng</span>
        <span>Lịch sử mua hàng</span>
        <br />
        <p>CHÍNH SÁCH</p>
        <span>Chính sách vận chuyển</span>
        <span>Chính sách đổi trả</span>
        <span>Chính sách bảo mật</span>
      </div>
    </footer>
  );
};

export default Footer;
