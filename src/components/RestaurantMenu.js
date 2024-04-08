import { useParams } from "react-router-dom";
import { CDN_URL } from "../utils/constants";
import ShimmerMenu from "./ShimmerMenu";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import { useState } from "react";

const RestaurantMenu = () => {
  // console.log(useParams());
  const { resId } = useParams();

  // declaring state variable for RestaurantCategory component (index is used while mapping)
  const [showIndex, setShowIndex] = useState(0);

  const resInfo = useRestaurantMenu(resId);

  const { name, cuisines, costForTwoMessage, cloudinaryImageId } =
    resInfo?.data.cards[0]?.card?.card?.info || {};

  // const { itemCards } = resInfo?.data.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[3]?.card?.card || {};

  // console.log(
  //   resInfo?.data.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards
  // );
  const categories =
    resInfo?.data.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c.card?.["card"]?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

  // console.log(categories);

  return resInfo === null ? (
    <ShimmerMenu />
  ) : (
    <div className="mt-4 flex flex-col items-center text-center">
      <div className="flex flex-col items-center text-center">
        <img
          className="w-56 rounded-2xl"
          src={CDN_URL + cloudinaryImageId}
        ></img>
        <div>
          <h1 className="font-bold text-2xl text-gray-800 pt-2">{name}</h1>
          <p className="text-xl text-gray-700 pt-2">{cuisines.join(", ")}</p>
          <p className="text-lg text-gray-600 pt-2">
            Just {costForTwoMessage} different items
          </p>
        </div>
      </div>

      {/* // Accordion of categories:: will map through categories which is list of all information in the menu page */}
      {categories.map((category, index) => {
        return (
          // Controlled Component, various props are passed to RestaurantCategory.js
          <RestaurantCategory
            key={category?.card?.card.title}
            menuData={category?.card?.card}
            showItems={index === showIndex ? true : false}
            functionToSetIndex={() => {
              // setShowIndex(index);   // expands the clicked one but doesn't shrink if clicked again, फिर भी shrinks the old one
              setShowIndex(index !== showIndex ? index : null); // if double clicked shrinks
              console.log("index value is:" + index + " hi from menu");
            }}
          />
        );
      })}

      {/* <h2 className="text-xl text-gray-700 p-4 bg-white">Menu:</h2>
      <ul>
        {itemCards?.map((item) => (
          <li key={item.card.info.id}>
            {item?.card?.info?.name} : ₹
            {item?.card?.info?.price / 100 ||
              item?.card?.info?.defaultPrice / 100}
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default RestaurantMenu;
