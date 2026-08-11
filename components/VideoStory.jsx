"use client";

import Link from "next/link";
import React, { useEffect, useRef } from "react";

const VideoStory = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Video is visible
          video.muted = false;
          video.play().catch(() => {
            // Browser may block autoplay with sound
            video.muted = true;
            video.play().catch(() => {});
          });
        } else {
          // Video is outside viewport
          video.muted = true;
        }
      },
      {
        threshold: 0.5,
      }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="py-24">
      <div className="flex flex-col items-center justify-center gap-10 bg-gradient-to-r from-[#760209] to-[#150102] px-3 py-20 md:px-10">

        <h3 className="text-center font-p text-2xl text-white lg:text-4xl">
          A Legacy That Belongs In Every Kitchen
        </h3>

        <p className="text-center text-sm text-white md:w-5/6 md:text-md lg:w-3/5">
          For centuries, Indian households relied on brass and brass vessels
          for healthier cooking and richer flavors. At Shudyam, we preserve
          that tradition while creating cookware designed for modern homes.
          Every piece is crafted to bring authenticity, durability, and joy
          back to cooking.
        </p>

        <video
          ref={videoRef}
          src="/video/aboutus1.mp4"
          className="md:w-2/3"
          autoPlay
          loop
          muted
          playsInline
          controls
        />

        <Link
          href="/about-us"
          className="cursor-pointer rounded-full bg-[#FFF9E6] px-10 py-1.5 font-medium text-p"
        >
          Read About Us
        </Link>

      </div>
    </div>
  );
};

export default VideoStory;


// import Link from 'next/link'
// import React from 'react'

// const VideoStory = () => {
//   return (
//     <div className='py-24    '>
// <div className='bg-gradient-to-r from-[#760209] to-[#150102]  px-3 md:px-10 py-20 flex flex-col gap-10 justify-center items-center'>

// <h3 className='text-white font-p text-2xl text-center   lg:text-4xl'>A Legacy That Belongs In Every Kitchen</h3>

// <p className='text-white text-center text-sm md:text-md  md:w-5/6 lg:w-3/5'>For centuries, Indian households relied on brass and brass vessels for healthier cooking and richer flavors. At Shudyam, we preserve that tradition while creating cookware designed for modern homes. Every piece is crafted to bring authenticity, durability, and joy back to cooking.</p>


// <video src="/video/aboutus.mp4" className=' md:w-2/3'  autoPlay
//   loop
//   muted
//   playsInline ></video>




// <Link href={"/about-us"} className='text-p bg-[#FFF9E6] font-medium px-10 py-1.5 cursor-pointer rounded-full'>Read About Us</Link>

// </div>


//     </div>
//   )
// }

// export default VideoStory