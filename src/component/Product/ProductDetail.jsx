import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Loading from "../Loading/Loading";
import "./productDetail.scss";
import { useDispatch, useSelector } from "react-redux";
import { cartSlice } from "../../store/Slice/cartSlice";
import { userSelector } from "../../store/selector";
import { getProductDetail } from "../../ultils/services";

const ProductDetail = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const history = useNavigate();
  const [step, setStep] = useState(0);
  const [count, setCount] = useState(1);
  const [size, setSize] = useState("");
  const [err, setErr] = useState(false);
  const [products, setProducts] = useState({});
  const [loading, isLoading] = useState(true);
  useEffect(() => {
    const fetchProduct = () => {
      getProductDetail(params.sex, params.code).then(res => {
        setProducts(res)
        isLoading(false)
      })
    };
    fetchProduct();
  }, [params]);
  const nextSlider = () => {
    if (step < products.src.length - 1) setStep(step + 1);
    else setStep(0);
  };

  const prevSlider = () => {
    if (step === 0) setStep(products.src.length - 1);
    else setStep(step - 1);
  };

  const handleSetData = (size, count) => {
    if (Object.keys(user).length !== 0) {
      const data = {
        name: products.name,
        code: products.code,
        size: size,
        count: count,
        price: products.price,
        src: products.src,
        uid:user.uid
      };
      dispatch(cartSlice.actions.setCart(data));
    } else history("/login");
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="clothes">
          {!!Object.values(products).length && (
            <>
              <div className="clothes__header">
                <Link to="/">TRANG CHỦ</Link>
                <Link to="/woman">SẢN PHẨM NỮ</Link>
                <p>{products.name}</p>
              </div>

              <div className="clothes__container">
                <div className="rightbar">
                  <div className="rightbar__list">
                    {products.src.map((item, index) => {
                      return (
                        <div
                          style={{
                            border: index === step ? "4px solid #337ab7" : "",
                          }}
                          key={index}
                          className="right__list__img"
                        >
                          <img
                            onClick={() => setStep(index)}
                            src={item}
                            alt=""
                          />
                        </div>
                      );
                    })}
                  </div>
                  <div className="rightbar__show">
                    <div className="rightbar__show__box">
                      <button
                        onClick={nextSlider}
                        className="slider__btn--next"
                      >
                        <FaAngleRight size={50} style={{ opacity: "0.8" }} />
                      </button>
                      <button
                        onClick={prevSlider}
                        className="slider__btn--prev"
                      >
                        <FaAngleLeft size={50} style={{ opacity: "0.8" }} />
                      </button>
                      <div
                        style={{ transform: `translateX(${step * -100}%)` }}
                        className="rightbar__show__slider"
                      >
                        {products.src.map((item, index) => {
                          return <img key={index} src={item} alt="" />;
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="leftbar">
                  <div className="leftbar__header">
                    <h2>{products.name}</h2>
                    <div className="clothes__info">
                      <p>SKU#: {products.code}</p>
                      <p>Đã bán: {products.sold}</p>
                    </div>
                  </div>

                  <div className="clothes__content">
                    <div className="clothes__price">
                      <p>{products.price} đ</p>
                      <span>{products.price} đ</span>
                    </div>

                    <div className="clothes__size">
                      <div className="clothes__content__title">
                        KÍCH CỠ: {size}
                      </div>
                      <div className="clothes__size__option">
                        <span onClick={(e) => setSize("S")}>S</span>
                        <span onClick={(e) => setSize("M")}>M</span>
                        <span onClick={(e) => setSize("L")}>L</span>
                        <span onClick={(e) => setSize("XL")}>XL</span>
                        <p>
                          <i className="fa-solid fa-chart-column"></i> bảng size
                        </p>
                      </div>

                      <p
                        style={{ display: err ? "block" : "none" }}
                        className="clothes__err"
                      >
                        <i className="fa-solid fa-triangle-exclamation"></i> Vui
                        lòng chọn size!
                      </p>
                    </div>

                    <div className="clothes__count">
                      <div className="clothes__content__title">SỐ LƯỢNG:</div>
                      <div className="clothes__count__option">
                        <button
                          onClick={() => {
                            if (count > 1) setCount(count - 1);
                          }}
                          className="prev__count"
                        >
                          -
                        </button>
                        <p>{count}</p>
                        <button
                          onClick={() => setCount(count + 1)}
                          className="next__count"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="clothse__notice">
                      <p>
                        <i className="fa-solid fa-car-side"></i> [07-10/09] MIỄN
                        PHÍ VẬN CHUYỂN <span>cho mọi đơn hàng</span>
                      </p>
                      <p>
                        <i className="fa-solid fa-arrow-rotate-right"></i> HOÀN
                        TIỀN 100%{" "}
                        <span>cho các sản phẩm không đúng với đơn hàng</span>
                      </p>
                      <p>
                        <i className="fa-solid fa-file-invoice-dollar"></i> KIỂM
                        TRA HÀNG TRƯỚC KHI THANH TOÁN
                      </p>
                      <p>
                        <i className="fa-solid fa-arrow-right-arrow-left"></i>{" "}
                        MIỄN PHÍ ĐỔI TRẢ{" "}
                        <span>trong vòng 15 ngày kể từ ngày mua hàng.</span>
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        if (size) {
                          handleSetData(size, count);
                        } else setErr(true);
                      }}
                      className="addcart__btn"
                    >
                      THÊM VÀO GIỎ HÀNG
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ProductDetail;
