"use client"
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import React, { useEffect, useRef, useState } from 'react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const FirstLoad = () => {
  const containerRef = useRef(null)
  const logoRef = useRef(null)
  const [show,setShow]=useState(true)

  useGSAP(() => {
   
gsap.to(logoRef.current,{
   scale: 400,
x:-2000,
  delay: 0.3,
  duration: 2,
  ease: "expo.in",
  transformOrigin: "center center",
  force3D: true,

})




  }, { scope: containerRef })



useEffect(()=>{
const int = setTimeout(() => {
    setShow(false)
}, 2300);
return ()=>clearTimeout(int)
},[ ]) 

if(!show ){
    return <></>
}
  return (
    <section ref={containerRef} className="fixed top-0 left-0 w-screen h-screen z-50 bg-gradient-to-r from-[#150102] via-[#570207] to-[#150102] min-h-[600px] overflow-hidden flex flex-col justify-center items-center">
      
     <img src="/logo.webp" alt="" className='relative z-20 h-56 invert'  ref={logoRef}/>

      
    
      <div className="absolute inset-0 z-10 bg-black/30 " />


    </section>
  )
}

export default FirstLoad