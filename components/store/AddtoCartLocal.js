import { createSlice } from "@reduxjs/toolkit";

const getInitialCart = () => {
  if (typeof window === "undefined") return [];

  try {
    const savedCart = localStorage.getItem("Cart");
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
    console.error("Failed to read cart:", error);
    return [];
  }
};

const saveCart = (cart) => {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem("Cart", JSON.stringify(cart));
  } catch (error) {
    console.error("Failed to save cart:", error);
  }
};

const initialState = {
  cart: getInitialCart(),
  totalItems: 0,
  totalPrice: 0,
};

const calculateCartTotals = (state) => {
  state.totalItems = state.cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  state.totalPrice = state.cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    addToCart: (state, action) => {
      const {
        productid,
        variantid,
        quantity = 1,
        price,
      
      } = action.payload;

      const existingItem = state.cart.find(
        (item) =>
          item.productid === productid &&
          item.variantid === variantid
      );

      if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.total = existingItem.quantity * existingItem.price;
      } else {
        state.cart.push({
          productid,
          variantid,
          quantity,
          price,
          total: price * quantity,
          
        });
      }

      calculateCartTotals(state);
      saveCart(state.cart);
    },

    increaseQuantity: (state, action) => {
      const { productid, variantid } = action.payload;

      const item = state.cart.find(
        (cartItem) =>
          cartItem.productid === productid &&
          cartItem.variantid === variantid
      );

      if (item) {
        item.quantity += 1;
        item.total = item.price * item.quantity;
      }

      calculateCartTotals(state);
      saveCart(state.cart);
    },

    decreaseQuantity: (state, action) => {
      const { productid, variantid } = action.payload;

      const itemIndex = state.cart.findIndex(
        (cartItem) =>
          cartItem.productid === productid &&
          cartItem.variantid === variantid
      );

      if (itemIndex === -1) return;

      const item = state.cart[itemIndex];

      if (item.quantity > 1) {
        item.quantity -= 1;
        item.total = item.price * item.quantity;
      } else {
        state.cart.splice(itemIndex, 1);
      }

      calculateCartTotals(state);
      saveCart(state.cart);
    },

    updateQuantity: (state, action) => {
      const {
        productid,
        variantid,
        quantity,
      } = action.payload;

      const item = state.cart.find(
        (cartItem) =>
          cartItem.productid === productid &&
          cartItem.variantid === variantid
      );

      if (item && quantity >= 1) {
        item.quantity = quantity;
        item.total = item.price * quantity;
      }

      calculateCartTotals(state);
      saveCart(state.cart);
    },

    removeFromCart: (state, action) => {
      const { productid, variantid } = action.payload;

      state.cart = state.cart.filter(
        (item) =>
          !(
            item.productid === productid &&
            item.variantid === variantid
          )
      );

      calculateCartTotals(state);
      saveCart(state.cart);
    },

    clearCart: (state) => {
      state.cart = [];
      state.totalItems = 0;
      state.totalPrice = 0;

      saveCart([]);
    },

    loadCart: (state) => {
      state.cart = getInitialCart();
      calculateCartTotals(state);
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  updateQuantity,
  removeFromCart,
  clearCart,
  loadCart,
} = cartSlice.actions;

export default cartSlice.reducer;