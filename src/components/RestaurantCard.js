import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  const { hotelData } = props;

  if (!hotelData.info) {
    return null;
  }

  const { name, cuisines, costForTwo, avgRating, areaName, cloudinaryImageId } =
    hotelData.info;

  return (
    <div
      className="res-card max-w-64 h-full p-4 overflow-hidden rounded-3xl box-border hover:cursor-pointer hover:scale-95 hover:shadow-2xl"
      style={{ backgroundColor: "#f0f0f0" }}
    >
      <img
        className="card-image w-auto rounded-2xl "
        alt="food-img"
        src={CDN_URL + cloudinaryImageId}
      />
      <h3 className="text-2xl font-bold mt-3 mb-2">{name}</h3>
      <h4 className="text-lg font-bold mt-1 mb-1">{areaName}, Ranchi</h4>
      <h4 className="text-lg font-bold mt-1 mb-1">{cuisines.join(", ")}</h4>
      <h4> {costForTwo}</h4>
      <h4>{avgRating} ⭐ </h4>
      <h4>{hotelData.info.sla.deliveryTime} minutes</h4>
    </div>
  );
};

// Higher Order Components: takes a component as input and returns another component as output, so first return is for returning the component and it another return is for returning a piece of jsx code.
//     RestaurantCard ===> RestaurantCardPromoted

export const withVegLabel = (RestaurantCard) => {
  return (props) => {
    // recieving the props from Body.js: " <VegRestaurantsList vegHotelData={x}/> "  and destructuring it such that it can be passed to the component RestaurantCard. Another way to use, don't destructure just use as : "<RestaurantCard {...props} />"
    const { vegHotelData } = props;
    return (
      <div>
        <label className="absolute bg-stone-700 px-2 text-white font-bold m-4 rounded-lg z-1">
          Veg
        </label>
        <RestaurantCard hotelData={vegHotelData} />
      </div>
    );
  };
};

export default RestaurantCard;
