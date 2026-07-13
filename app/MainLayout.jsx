"use client"
import store from '@/components/store/store'
import React from 'react'
import { Provider } from 'react-redux'
import { Slide, ToastContainer } from 'react-toastify'
import  { GoogleOAuthProvider } from "@react-oauth/google"
const MainLayout = ({children}) => {
  return (
    <div>
        <GoogleOAuthProvider  clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <ToastContainer
position="top-center"
autoClose={2500}
hideProgressBar
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition={Slide}
/>
        <Provider store={store}>
        {children}
        </Provider>
        </GoogleOAuthProvider>
        </div>
  )
}

export default MainLayout