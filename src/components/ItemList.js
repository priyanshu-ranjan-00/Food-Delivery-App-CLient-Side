import { CDN_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";

const ItemList = ({ items }) => {
  //   console.log(items); // to check if we are recieving props from RestaurantCategory.js or not

  //          Writing in the redux store (appStore.js/cartSLice.js)
  const dispatch = useDispatch();
  const handleAddItem = (i) => {
    // as someone clicks the add button, `dispatch an action` which add items to cart
    // dispatch(addItem("Pizza")); // whatever is passed here, will go to addItem action in cartSlice.js and will be added into items of cartSlice.js
    dispatch(addItem(i))
  };

  return (
    <div>
      {items.map((i) => (
        <div key={i.card.info.id} className="p-1">
          <div className="p-1 flex justify-between min-h-20 items-center border-b-2 border-gray-300">
            <div
              key={i.card.info.id}
              className="w-10/12 flex flex-col items-start"
            >
              <p className="text-left text-lg font-semibold ">
                {i.card.info.name}
              </p>
              <p className="text-left font-bold text-base text-gray-700 px-2">
                ₹{i.card.info.price / 100 || i.card.info.defaultPrice / 100}
              </p>

              <p className="text-left px-2">{i.card.info.description}</p>
            </div>

            <div className=" w-2/12">
              <div className=" absolute z-10">
                <button
                  className="px-2 py-1 mx-7 rounded-lg bg-gray-700 text-white shadow-2xl hover:scale-95 "
                  // onClick={handleAddItem}
                  onClick={() => handleAddItem(i)}  // passing i and using it in above handleAddItem function code
                >
                  Add +
                </button>
              </div>
              <div>
                {i?.card?.info?.imageId && (
                  <img
                    src={CDN_URL + i?.card?.info?.imageId}
                    className="rounded-lg"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default ItemList;
