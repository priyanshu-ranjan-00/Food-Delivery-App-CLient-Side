//    Custom Hooks for calling menu API

import { useEffect, useState } from "react";
import { MENU_API } from "./constants";

const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);

  //function for fetching data
  useEffect(() => {
    fetchMenuData();
  }, []);

  const fetchMenuData = async () => {
    const menuData = await fetch(MENU_API + resId);
    const json = await menuData.json();
    setResInfo(json);
  };
  return resInfo;
};

export default useRestaurantMenu;
