import React from 'react'

const VideoStory = () => {
  return (
    <div className='py-24    '>
<div className='bg-gradient-to-r from-[#760209] to-[#150102]  px-3 md:px-10 py-20 flex flex-col gap-10 justify-center items-center'>

<h3 className='text-white font-p text-2xl text-center   lg:text-4xl'>A Legacy That Belongs In Every Kitchen</h3>

<p className='text-white text-center text-sm md:text-md  md:w-5/6 lg:w-3/5'>For centuries, Indian households relied on brass and copper vessels for healthier cooking and richer flavors. At Shudhyam, we preserve that tradition while creating cookware designed for modern homes. Every piece is crafted to bring authenticity, durability, and joy back to cooking.</p>


<video src="/video/aboutus.mp4" className='w-2/3'  autoPlay
  loop
  muted
  playsInline ></video>




<button className='text-p bg-[#FFF9E6] font-medium px-10 py-1.5 cursor-pointer rounded-full'>Read About Us</button>

</div>


    </div>
  )
}

export default VideoStory