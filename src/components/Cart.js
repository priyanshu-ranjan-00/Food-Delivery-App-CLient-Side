import { useDispatch, useSelector } from "react-redux";
import ItemList from "./ItemList";
// import { clearCart } from "../utils/cartSlice";
import { clearCart } from "../utils/cartSlice";

const Cart = () => {
  // Reading the items in cart from redux store(store is made wiht help of appStore.js, also cartSlice.js is ultimately connected to appStore.js)

  // const store = useSelector((store) => store); //subscribing to the whole store, but it is not efficient( FAFO on google)
  // const cartItems = store.cart.items; // never subscribe like this always subscribe to a particular portion

  const cartItems = useSelector((store) => store.cart.items);

  const dispatch = useDispatch();
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  return (
    <div className="text-center w-6/12 m-auto my-4 p-3 rounded-lg shadow-md bg-gray-100  ">
      <h1 className="mt-3 text-2xl font-bold">Your Cart:</h1>

      <button
        className="p-2 m-3 bg-stone-600 rounded-md text-white
      hover:scale-95 "
        onClick={handleClearCart}
      >
        Clear Cart
      </button>
      {cartItems.length === 0 && (
        <h1 className="text-xl">
          Add Items to the Cart, those you can see here.
        </h1>
      )}
      <div>
        <ItemList items={cartItems} />
      </div>
    </div>
  );
};

export default Cart;
