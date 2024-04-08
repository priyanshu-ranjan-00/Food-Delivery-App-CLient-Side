import { useContext, useEffect, useState } from "react";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

const Header = () => {
  const [btnName, setBtnName] = useState("Login");

  // accessing UserContext
  const data = useContext(UserContext);
  const { loggedInUser } = data;


  //              Reading from the redux store(appStore.js/cartSLice.js)
  // Subscribing to the store using a selector (it's just a hook), we are using this to show(reading the store) the number of items in header besides the card nav items
  const cartItems = useSelector((store) => store.cart.items); //  useSelector hook gives access to the store, cart is coming from reducer object in appStore.js
  // console.log(cartItems);

  return (
    <div className="header p-4 bg-stone-200 h-16 flex justify-between items-center font-mono">
      <div className="logo p-2 rounded-md font-mono">
        <img src={LOGO_URL} />
      </div>

      <div className="nav-items">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
          <li className="font-sem">
            <Link to="/cart">Cart:({cartItems.length}) </Link>
          </li>

          <li>
            <button
              className="login"
              onClick={() => {
                btnName === "Login"
                  ? setBtnName("Logout")
                  : setBtnName("Login");
              }}
            >
              {btnName}
            </button>
          </li>

          <li className="font-semibold">{loggedInUser}</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
