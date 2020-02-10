import { combineReducers } from "redux";
import inventoryFixture from "../fixture/inventory";
import cartFixture from "../fixture/cart";
// {
//     id: 15,
//     name: "Blog",
//     category: "Service",
//     price: 200,
//     inventory: 1000
//   },
const defaultStore = {
  inventory: inventoryFixture,
  cart: []
};

// const defaultStore = {
//   inventory: inventoryFixture,
//   cart: cartFixture
// };

const shop = (state = defaultStore, action) => {
  const itemId = action.payload;
  const newInventory = [...state.inventory];
  const newCart = [...state.cart];
  const inventoryItem = newInventory.find(i => i.id === itemId);
  const cartItem = newCart.find(i => i.id === itemId);
  switch (action.type) {
    case "ADD_ITEM_TO_CART":
      inventoryItem.inventory--;
      if (cartItem) {
        const itemIndex = newCart.findIndex(i => i.id === itemId);
        newCart[itemIndex].inventory++;
      } else {
        const newCartItem = {
          ...inventoryItem,
          inventory: 1
        };
        newCart.push(newCartItem);
      }

      return {
        inventory: newInventory,
        cart: newCart
      };
    case "REMOVE_ITEM_FROM_CART":
      inventoryItem.inventory++;
      if (cartItem.inventory === 1) {
        const itemIndex = newCart.findIndex(i => i.id === itemId);
        newCart.splice(itemIndex, 1);
      } else {
        cartItem.inventory--;
      }
      return {
        inventory: newInventory,
        cart: newCart
      };
    case "SORT_BY_PRICE_ASCEND":
      newInventory.sort((a, b) =>
        a.price > b.price ? 1 : b.price > a.price ? -1 : 0
      );
      return {
        inventory: newInventory,
        cart: newCart
      };
    case "SORT_BY_PRICE_DESCEND":
      console.log("descend");
      newInventory.sort((b, a) =>
        a.price > b.price ? 1 : b.price > a.price ? -1 : 0
      );
      return {
        inventory: newInventory,
        cart: newCart
      };
    default:
      return state;
  }
};

export default combineReducers({
  shop
});
