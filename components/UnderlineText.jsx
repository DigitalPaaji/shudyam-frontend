import Image from 'next/image'
import React from 'react'

const UnderlineText = ({text,styles}) => {
  return (
    <span className={`text-p relative text-xl font-semibold ${styles}`}>{text}
    <Image src="vector.svg" alt="" width={20} height={10}  className=' absolute -bottom-1 -right-2 w-18'/>
    
    </span>
  )
}

export default UnderlineText