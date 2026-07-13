import { createSlice } from "@reduxjs/toolkit";
const getInitialWishlist = () => {
  if (typeof window === "undefined") return [];

  try {
    const wishlist = localStorage.getItem("wishlist");
    return wishlist ? JSON.parse(wishlist) : [];
  } catch (error) {
    console.log("Wishlist localStorage error:", error);
    return [];
  }
};


const saveWishlist = (wishlist) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }
};


const wishlistSlice = createSlice({
    name: "wishlist",
  initialState: getInitialWishlist(),
      
    reducers: {
    toggleWishlist: (state, action) => {
      const productId = action.payload;

      const alreadyExists = state.includes(productId);

      const updatedWishlist = alreadyExists
        ? state.filter((item) => item !== productId)
        : [...state, productId];

      saveWishlist(updatedWishlist);

      return updatedWishlist;
    },

    addWishlist: (state, action) => {
      const productId = action.payload;

      if (state.includes(productId)) {
        return state;
      }

      const updatedWishlist = [...state, productId];

      saveWishlist(updatedWishlist);

      return updatedWishlist;
    },

    removeWishlist: (state, action) => {
      const productId = action.payload;

      const updatedWishlist = state.filter((item) => item !== productId);

      saveWishlist(updatedWishlist);

      return updatedWishlist;
    },

    clearWishlist: () => {
      saveWishlist([]);
      return [];
    },
}
})

export const {
  toggleWishlist,
  addWishlist,
  removeWishlist,
  clearWishlist,
} = wishlistSlice.actions;


export default wishlistSlice.reducer;
