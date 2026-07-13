"use client"
import { base_url } from '@/components/utile'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import GetCartLocal from './GetCartLocal '
import GetCartItem from './GetCartItem'

const page = () => {
const {isUser} = useSelector(state=>state.user)
const dispatch =useDispatch()


  return (
    <div className='min-h-screen'>
        <div className="h-14 bg-gradient-to-r from-[#210102] via-[#62080d] to-[#210102] sm:h-16" />
        
     {isUser ? <GetCartItem /> : <GetCartLocal /> }


     
        </div>
  )
}



export default page





