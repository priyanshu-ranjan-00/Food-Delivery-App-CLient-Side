import React, { lazy, Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import UserContext from "./utils/UserContext";
// import Cart from "./components/Cart"; //instead of this will be importing Cart component using lazy function
import { Provider } from "react-redux";
import appStore from "./utils/appStore";

//  chunking/ code splitting/ dynamic bundling / lazy loading/ on demand loading
const Cart = lazy(() => import("./components/Cart")); // this import is a function which takes the path

const AppLayout = () => {
  // Authentication, doing it for showing use of Context
  const [userName, setUserName] = useState();

  useEffect(() => {
    //Dummy Example: Make an API call and send username and password, then got the data as name only
    const data = {
      name: "Priyanshu Ranjan",
    };
    setUserName(data.name);
  }, []);

  return (
    // appStore is passed as props in Provider such that whole app knows that there is a appStore connected to it
    <Provider store={appStore}>
      <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
        <div className="app">
          <Header />
          <Outlet />
        </div>
      </UserContext.Provider>
    </Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/restaurants/:resId",
        element: <RestaurantMenu />,
      },
      {
        path: "/cart",
        element: (
          <Suspense fallback={<h1>Cart is loading...</h1>}>
            <Cart />
          </Suspense>
        ),
      },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);
