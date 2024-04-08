import { useState } from "react";
import ItemList from "./ItemList";

const RestaurantCategory = (props) => {
  //   console.log(props); //  checking if props recieved from RestaurantMenu.js or not
  const { menuData, showItems, functionToSetIndex } = props; // [showItems] is passed directly as props from RestaurantMenu

  //           Expanding accordion one at a time,& shrinking the older expanded one
  const handleClickOnAccordionHeader = () => {
    console.log("clicked");
    functionToSetIndex(); // calling the function which is inside RestaurantMenu
    console.log("hi from category");
  };

  //              Expanding the accordion
  //   const [showItems, setShowItems] = useState(false);  //this variable control: if we want to show the Accordion Body
  //   const handleClickOnAccordionHeader = () => {
  //     setShowItems(showItems === false ? true : false); // below line is also same
  //     setShowItems(!showItems);
  //   };

  return (
    <div className="w-full ">
      {/* header */}
      <div className="w-6/12 mx-auto my-4 p-3 rounded-lg shadow-md bg-gray-100 ">
        <div
          className="flex justify-between items-center hover:cursor-pointer"
          onClick={handleClickOnAccordionHeader}
        >
          <span className="font-bold">
            {menuData.title}
            {/* ({menuData.itemCards.length}) */}
          </span>
          <span>
            <img
              className="w-5"
              src="https://cdn-icons-png.flaticon.com/128/2985/2985150.png"
            />
          </span>
        </div>

        {/* // Accordion Body // for a particular category, consists of menu, price and item details */}
        {showItems === true ? <ItemList items={menuData?.itemCards} /> : null}
      </div>
    </div>
  );
};

export default RestaurantCategory;
