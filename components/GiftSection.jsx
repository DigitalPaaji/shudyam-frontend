import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const GiftSection = () => {
  return (
    <div className='bg-linear-to-r from-[#760209] to-[#150102] text-center flex flex-col gap-10 justify-center py-28 items-center px-4 md:px-0'>

      <p className='text-[#FFEFC1] font-p text-2xl md:text-4xl lg:text-5xl '>A Gift Worth Remembering</p>
       <Image src="/images/gift.webp" alt="gift" width={400} height={400} />
 
<p className='text-[#FFEFC1]  md:w-5/6 lg:w-4/6'>Shudyam combines heritage craftsmanship with modern functionality to create cookware that performs beautifully, lasts for years, and brings authenticity back to every meal. Crafted with care, designed with purpose, and made to be passed down through generations.</p>
<p  className='text-[#FFEFC1]'>Perfect for weddings, housewarmings, festive celebrations, and corporate gifting.</p>
<Link href={"/products"} className=' bg-[#FFEFC1] text-p px-5 py-2 rounded-full font-semibold'>Shop Gift Sets</Link>



    </div>
  )
}

export default GiftSection