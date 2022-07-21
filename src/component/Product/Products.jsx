import React, { useEffect, useState, Fragment,useDeferredValue } from "react";
import { Link, useParams } from "react-router-dom";
import { filterProductsWithType, getProducts } from "../../ultils/services";
import Loading from "../Loading/Loading";
import "./products.scss";

const Products = () => {
  const [isSubList, setIsSubList] = useState(false);
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState("");
  const [loading, isLoading] = useState(true);
  const deferedValue = useDeferredValue(products)

  const params = useParams();
  useEffect(() => {
    isLoading(true);
    const fetchProduct = () => {
      getProducts(params.sex).then(res => {
        setProducts(res)
        setTimeout(() => {
          isLoading(false)
        },1500)
      })
    };
    fetchProduct();
    return () => clearTimeout()
  }, [params]);
  const handleSort = (e) => {
    if (e === "2") {
      setSort(e);
      const newProducts = products.sort((a, b) => {
        return a.price - b.price;
      });
      setProducts(newProducts);
    }
    else if (e === "3") {
      setSort(e);
      const newProducts = products.sort((a, b) => {
        return b.price - a.price;
      });
      setProducts(newProducts);
    }
  };

  const filterProducts = (type) =>{
    filterProductsWithType(params.sex, type).then((res) => {
      setProducts(res)
    })
  }

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <div className="product">
          <div className="product__link">
            <Link to="/" className="product__link__home">
              TRANG CHỦ
            </Link>
            <p>
              {params.sex === "man"
                ? "SẢN PHẨM NAM"
                : params.sex === "woman"
                ? "SẢN PHẨM NỮ"
                : "SẢN PHẨM TRẺ EM"}
            </p>
          </div>

          <div className="product__content">
            <div className="product__sidebar">
              <div
                onClick={() => {
                  setIsSubList(!isSubList);
                }}
                className="product__sidebar__list"
              >
                <p>DANH MỤC</p> <i className="fa-solid fa-angle-down"></i>
              </div>
              <form
                style={{ display: isSubList ? "block" : "none" }}
                className="product__sidebar__sublist"
              >
                <p>
                  <input type="radio" name="type" id="ao" onChange={e => filterProducts(e.target.id)} />
                  <label htmlFor="ao">Áo</label>
                </p>
                <p>
                  <input type="radio" name="type" id="quan" onChange={e => filterProducts(e.target.id)}/>
                  <label htmlFor="quan">Quần</label>
                </p>
                <p>
                  <input type="radio" name="type" id="tat" onChange={e => filterProducts(e.target.id)}/>
                  <label htmlFor="tat">Bít tất</label>
                </p>
              </form>
              <div className="product__sidebar__list">
                <p>MÀU SẮC</p> <i className="fa-solid fa-angle-down"></i>
              </div>
              <div className="product__sidebar__list">
                <p>KÍCH CỠ</p> <i className="fa-solid fa-angle-down"></i>
              </div>
              <div className="product__sidebar__list">
                <p>CHẤT LIỆU</p> <i className="fa-solid fa-angle-down"></i>
              </div>
            </div>

            <div className="product__right">
              <div className="product__right__header">
                <h1>
                  {params.sex === "man"
                    ? "SẢN PHẨM NAM"
                    : params.sex === "woman"
                    ? "SẢN PHẨM NỮ"
                    : "SẢN PHẨM TRẺ EM"}
                </h1>
                <span>
                  <p>Sắp xếp theo</p>
                  <select
                    value={sort}
                    onChange={(e) => {
                      handleSort(e.target.value);
                    }}
                  >
                    <option value="1">Lựa chọn</option>
                    <option value="2">Giá tăng dần</option>
                    <option value="3">Giá giảm dần</option>
                  </select>
                </span>
              </div>

              <div className="product__right__content">
                {deferedValue.map((item) => {
                  return (
                    <div key={item.id} className="right__content__item">
                      <Link to={`/${item.sex}/${item.code}`}>
                        <div className="right__content__item__img">
                          <img src={item.src[1]} alt="" />
                          <img src={item.src[0]} alt="" />
                        </div>
                        <p className="right__content__item__name">
                          {item.name}
                        </p>
                        <p className="right__content__item__price--sale">
                          {item.price}đ
                        </p>
                        <p className="right__content__item__price">
                          {item.price}đ
                        </p>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Products;
