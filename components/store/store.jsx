import { configureStore } from "@reduxjs/toolkit";
import categories from "./CategorySlice"
import toggleUser from "./toggleUser"
import user from "./userSlice"
import LocalCart from  "./AddtoCartLocal"
import wishlist from "./wishlistslice"
const store = configureStore({
    reducer:{
categories,
toggleUser,
user,
LocalCart,
wishlist,
    }
})

export default store
