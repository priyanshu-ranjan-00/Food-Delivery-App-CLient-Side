import { createSlice, current } from "@reduxjs/toolkit";

// createSlice takes a config which consists of name, initial state( it's an object consisting of cart items), reducers
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    // items: ["veg roll", "burger", "ice cream"],
    items: [], // initially kept the card empty
  },
  // reeducers is an object, it consists of different actions which can be taken and
  //  to each action there is a corresponding reducer function
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload); // mutating the state here, modifying the state here itself, action.payload this is recieving the items dispatched from ItemList.js
    },
    removeItem: (state, action) => {
      // reducer function are inside the dispatch action:
      state.items.pop();
    },
    clearCart: (state) => {
      // console.log(state); // this will return proxyObject(no idea what it is -,-)
      console.log(current(state));
      
      // RTK says: either mutate the existing state or return a new state which is empty
      state.items.length = 0; //this logic will make items an empty array ==> will make state =[]
      //   (OR)
      // return {items: []};  // this new object {items: []} will replace the existing object or state in the cart
    },
  },
});

//exporting the actions
export const { addItem, removeItem, clearCart } = cartSlice.actions;

// exporting the reducer function
export default cartSlice.reducer;
