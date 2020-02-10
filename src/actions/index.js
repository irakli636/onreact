export const addCart = payload => ({
  type: "ADD_ITEM_TO_CART",
  payload
});

export const removeCart = payload => ({
  type: "REMOVE_ITEM_FROM_CART",
  payload
});

export const sortByPriceAscend = () => ({
  type: "SORT_BY_PRICE_ASCEND"
});

export const sortByPriceDescend = () => ({
  type: "SORT_BY_PRICE_DESCEND"
});
