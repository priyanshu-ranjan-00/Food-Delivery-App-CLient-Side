import RestaurantCard, { withVegLabel } from "./RestaurantCard";
import { useContext, useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  const [searchText, setSearchText] = useState("");

  // for higher order components
  const VegRestaurantsList = withVegLabel(RestaurantCard);

  // console.log("Body rendered");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const restraData = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );

    //          Upperone is of Bengaluru. for Ranchi:
    // const restraData = await fetch(
    //   "https://www.swiggy.com/dapi/restaurants/list/v5?lat=23.3440997&lng=85.309562&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    // );
    const restraJSON = await restraData.json();

    // console.log(
    //   restraJSON?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
    //     ?.restaurants
    // );

    setListOfRestaurants(
      restraJSON?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );
    setFilteredRestaurants(
      restraJSON.data.cards[1]?.card.card.gridElements?.infoWithStyle
        .restaurants
    );
  };

  // Recieving the function setUserName from App.js for input where we are writing and it is dynamically changing the UI.
  // LoggedInUser is just for the giving the initial value to the input, change variable (loggedInUser) name and find out.
  const {loggedInUser, setUserName } = useContext(UserContext);

  // checking if internet is working or not , using it from custom hook useOnlineStatus which is inside src/utils/useOnlineStatus.js
  const internetStatus = useOnlineStatus();
  if (internetStatus === false) return <h1>You went offline</h1>;

  if (listOfRestaurants?.length === 0) {
    return <Shimmer />;
  }

  return (
    <div className="body">
      <div className="filter">
        <div className="filter-search">
          <input
            type="text"
            className="search-box border p-1 border-black rounded-md mx-2"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />

          <button
            onClick={() => {
              // Filtering the restaurants on the basis of searchText

              const filteredRestras = listOfRestaurants.filter(
                (x) =>
                  x.info.areaName
                    .toLowerCase()
                    .includes(searchText.toLowerCase()) ||
                  x.info.name.toLowerCase().includes(searchText.toLowerCase())
              );
              console.log(filteredRestras);

              //   setListOfRestaurants(filteredRestras);
              setFilteredRestaurants(filteredRestras);
            }}
          >
            Search
          </button>
        </div>

        <div>
          <button
            className="filter-btn"
            onClick={() => {
              console.log("clicked");
              filteredList = listOfRestaurants.filter(
                (x) => x.info.avgRating > 4.3
              );
              setListOfRestaurants(filteredList);
              console.log(listOfRestaurants);
            }}
          >
            Top Rated Restaurants
          </button>
        </div>

        <div>
          <label className="font-semibold mx-2">User:</label>
          <input
            className="border border-black p-1 rounded-md"
            value={loggedInUser} 
            onChange={(e) => {
              setUserName(e.target.value);
              console.log(e.target.value);
            }}
          />
        </div>
      </div>

      <div className="res-container flex justify-evenly flex-wrap gap-3">
        {filteredRestaurants.map((x) =>
          x.info ? (
            <Link to={"/restaurants/" + x.info.id} key={x.info.id}>
              {/* if the restaurant has veg menu it is true in the api, then we will show with an extra label else the existing component*/}
              {x.info.veg ? (
                <VegRestaurantsList vegHotelData={x} />
              ) : (
                <RestaurantCard hotelData={x} />
              )}
            </Link>
          ) : null
        )}
      </div>
    </div>
  );
};

export default Body;
