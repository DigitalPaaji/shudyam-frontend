import React from 'react'

const HeadLine = ({text,styles}) => {
  return (
   <h3 className={` text-xl md:text-3xl lg:text-5xl leading-tight font-p text-p   ${styles}`}>{text}</h3>
  )
}

export default HeadLine