import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaSearch, FaUser,FaMapMarkerAlt,FaShoppingBag } from "react-icons/fa";
import "./Navigation.scss";
import "./responsive.scss";
import { useDispatch, useSelector } from "react-redux";
import { cartSelector, userSelector } from "../../store/selector";
import { cartSlice } from "../../store/Slice/cartSlice";

const Navigation = () => {
  const dispatch = useDispatch()
  const user = useSelector(userSelector)
  const [navBar, isNavBar] = useState(false)
  const {cartModal, cart} = useSelector(cartSelector)
  const handleSetCartModal = () => {
    dispatch(cartSlice.actions.setCartModal(!cartModal))
  }
  return (
    <div className="nav">
      <div onClick={() => isNavBar(!navBar)} className="nav__bar">
        <FaBars />
      </div>
      <div className="nav__logo">
        <Link to="/">
          <img
            src="https://onoff-clone.netlify.app/static/media/logo.ae12c6c9.svg"
            alt="logo"
          />
        </Link>
      </div>
      <div className="nav__list mobile--hiden">
        <ul>
          <li>
            <Link to="man">NAM</Link>
          </li>
          <li>
            <Link to="woman">NỮ</Link>
          </li>
          <li>
            <Link to="child">TRẺ EM</Link>
          </li>
        </ul>
      </div>
      <div className="nav__search mobile--hiden">
        <input type="text" placeholder="Tìm kiếm" />
        <FaSearch />
      </div>
      <div className="nav__user mobile--hiden">
        <FaMapMarkerAlt  size={20}/>
        <Link style={{marginLeft:"5px", color: "#000", display:"flex" }} to="profile">
          <p><FaUser size={20}/></p>
          <p style={{fontSize:"14px"}}>{user?.displayName}</p>
        </Link>
      </div>
      <div onClick={handleSetCartModal} className="nav__cart">
        <span>{cart.length}</span>
        <FaShoppingBag size={20}/>
      </div>

      
      <div className="navbar"  style={{transform: navBar?"translateX(0)":""}}>
        <ul>
          <li>
            <Link onClick={() => isNavBar(!navBar)} to="man">NAM</Link>
          </li>
          <li>
            <Link onClick={() => isNavBar(!navBar)}  to="woman">NỮ</Link>
          </li>
          <li>
            <Link onClick={() => isNavBar(!navBar)}  to="child">TRẺ EM</Link>
          </li>
        </ul>
      </div>


      <div className="nav__footer">
        <Link to="/"><i className="fa-solid fa-house-chimney"></i></Link>
        <Link to="/"><i className="fa-solid fa-magnifying-glass"></i></Link>
        <Link to="/"><i className="fa-solid fa-location-dot"></i></Link>
        <Link to="login"><i className="fa-solid fa-user"></i></Link>
      </div>
    </div>
  );
};

export default Navigation;
