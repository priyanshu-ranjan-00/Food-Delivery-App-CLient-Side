import { useEffect, useState } from "react";

const useOnlineStatus = () => {
  //defining a variable internetStatus
  const [internetStatus, setInternetStatus] = useState(true);

  // check if user is online or not, then update the value of variable
  useEffect(() => {
    window.addEventListener("offline", () => {
      setInternetStatus(false);
      console.log("offline");
    });
    window.addEventListener("online", () => {
      setInternetStatus(true);
      console.log("online");
    });
  }, []);

  //boolean value
  return internetStatus;
};

export default useOnlineStatus;
