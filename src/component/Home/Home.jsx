import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.scss";
import { special, media } from "../../context/data";
import "./responsive.scss";
import { useState } from "react";
import Loading from "../Loading/Loading";
import { getProducts } from "../../ultils/services";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchProduct = async () => {
      getProducts("woman").then(res => {
        setProducts(res)
        setIsLoading(false)
      })
    };
    fetchProduct();
  }, []);
  return (
    <div className="home">
      <Link to="/">
        <div className="banner"></div>
      </Link>

      <div className="special">
        {special.map((item) => {
          return (
            <div key={item.id} className="special__item">
              <img src={item.src} alt="" />
              <div className="special__contact">
                <h2>{item.name}</h2>
                <button className="view__btn">
                  <Link
                    to={
                      item.id === 1 ? "man" : item.id === 3 ? "woman" : "child"
                    }
                  >
                    XEM NGAY
                  </Link>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="product">
        <h2 className="product__title">Sản phẩm mới</h2>
        <div className="product__list">
          {isLoading ? (
            <Loading />
          ) : (
            products.map((product) => {
              return (
                <div key={product.id} className="product__item">
                  <Link to={`/${product.sex}/${product.id}`}>
                    <div className="product__item__img">
                      <img src={product.src[1]} alt="" />
                      <img src={product.src[0]} alt="" />
                    </div>
                    <p className="product__name">{product.name}</p>
                    <p className="product__price--sale">{product.price}đ</p>
                    <p className="product__price">{product.price}đ</p>
                  </Link>
                </div>
              );
            })
          )}
        </div>
      </div>

      <div className="media">
        <h2 className="media__title">Felling good</h2>
        <p className="media__subtitle">
          Thương hiệu đồ lót mang tới trải nghiệm thoải mái mỗi ngày cho mọi
          người.
        </p>
        <div className="media__list">
          {media.map((item) => {
            return (
              <div key={item.id} className="media__item">
                <div className="media__item__box">
                  <img src={item.src} alt="" />
                  <div className="media__item__box__text">
                    <h2>{item.name}</h2>
                    <p>{item.description}</p>
                  </div>
                </div>

                <div className="media__btn">
                  {item.btn.map((btns, index) => {
                    return <button key={index}>{btns}</button>;
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="footer__banner">
        <img
          src="https://onoff.vn/static/version1646303740/frontend/Of/default/en_US/images/store.jpg"
          alt=""
        />
      </div>
    </div>
  );
};

export default Home;
