import Image from 'next/image'
import React from 'react'
import HeadLine from './HeadLine'
import { LuHeater, LuMessagesSquare } from 'react-icons/lu'
import { PiSunDimDuotone } from 'react-icons/pi'
import { BiLogoReact } from 'react-icons/bi'

const Whyshudyam = () => {
  return (
    <div className='px-4 md:px-12 lg:px-24 xl:px-40 py-24'>
 <div className='grid  md:grid-cols-2 gap-14'>

<div>
<Image src={"/images/craft1.png"} alt='craft'  width={500} height={500} className='rounded-md w-full h-[30rem] object-cover' />
</div>

<div className='flex flex-col gap-3 justify-center'>
<div className='flex items-center text-3xl gap-2 text-p font-p'>
    Why <Image src="/logo.webp" alt="" width={100} height={100}  className=' w-24'/>
</div>
<p className='text-xl md:text-3xl lg:text-4xl leading-tight font-p text-p '>
Crafted for Better Cooking, Designed for Generations
    
</p>

<p className='leading-tight font-p text-p text-sm text-justify'>Shudhyam combines heritage craftsmanship with modern functionality to create cookware that performs beautifully, lasts for years, and brings authenticity back to every meal. Crafted with care, designed with purpose, and made to be passed down through generations.</p>
{
[
{icon:LuMessagesSquare,text:"Hand-finished by skilled artisans." },
{icon: LuHeater ,text:"Consistent cooking, every time." },
{icon: PiSunDimDuotone ,text:"Traditional metals trusted for generations." },
{icon: BiLogoReact ,text:"Made to be cherished and passed on." },

].map((item,ind)=><div key={ind} className='flex items-center gap-3 text-p text-sm'>
    
    <item.icon />
    <p>{item.text}</p>
    </div>)
}



<button className='bg-p w-fit text-white  px-3 py-1.5 rounded-md cursor-pointer'>Shop Collection</button>



</div>
 </div>




    </div>
  )
}

export default Whyshudyam