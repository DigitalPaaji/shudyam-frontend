"use client";

import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import {
  FiPause,
  FiPlay,
  FiVolume2,
  FiVolumeX,
} from "react-icons/fi";
import axios from "axios";

import "swiper/css";

import { base_url, img_url } from "./utile";
import { useRouter } from "next/navigation";

const ClientVideos = () => {
  const videoRefs = useRef([]);
  const swiperRef = useRef(null);

  const [allVideos, setAllVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState(null);
  const [mutedVideos, setMutedVideos] = useState({});

  const getMediaUrl = (path) => {
    if (!path) return "";

    if (
      path.startsWith("http://") ||
      path.startsWith("https://")
    ) {
      return path;
    }

    return `${img_url}${path}`;
  };
const route = useRouter()
  const fetchVideos = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${base_url}/cache/videos/random`
      );

      const data = response.data;

      // Supports:
      // { success: true, videos: [] }
      // or direct array response []
      const fetchedVideos = Array.isArray(data)
        ? data
        : data?.success
          ? data.videos || []
          : [];

      setAllVideos(fetchedVideos);

      videoRefs.current = [];
      setActiveVideo(null);
      setMutedVideos({});
    } catch (error) {
      console.error("Fetch videos error:", error);
      setAllVideos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();

    return () => {
      videoRefs.current.forEach((video) => {
        if (video) {
          video.pause();
        }
      });
    };
  }, []);

  const pauseOtherVideos = (selectedIndex) => {
    videoRefs.current.forEach((video, videoIndex) => {
      if (video && videoIndex !== selectedIndex) {
        video.pause();
        video.currentTime = 0;
      }
    });
  };

  // Desktop: play when mouse enters
  const handleMouseEnter = async (index) => {
    const selectedVideo = videoRefs.current[index];

    if (!selectedVideo) return;

    pauseOtherVideos(index);

    // Hover autoplay generally requires muted video
    selectedVideo.muted = true;

    setMutedVideos((previous) => ({
      ...previous,
      [index]: true,
    }));

    try {
      await selectedVideo.play();

      setActiveVideo(index);
      swiperRef.current?.autoplay?.stop();
    } catch (error) {
      console.error("Unable to play video:", error);
    }
  };

  // Desktop: pause when mouse leaves
  const handleMouseLeave = (index) => {
    const selectedVideo = videoRefs.current[index];

    if (!selectedVideo) return;

    selectedVideo.pause();

    setActiveVideo((currentIndex) =>
      currentIndex === index ? null : currentIndex
    );

    swiperRef.current?.autoplay?.start();
  };

  // Mobile: tap to play or pause
  const handleClickVideo = async (index) => {
    const selectedVideo = videoRefs.current[index];

    if (!selectedVideo) return;

    if (!selectedVideo.paused) {
      selectedVideo.pause();

      setActiveVideo(null);
      swiperRef.current?.autoplay?.start();

      return;
    }

    pauseOtherVideos(index);

    try {
      await selectedVideo.play();

      setActiveVideo(index);
      swiperRef.current?.autoplay?.stop();
    } catch (error) {
      console.error("Unable to play video:", error);
    }
  };

  const handleMute = (event, index) => {
    event.stopPropagation();

    const selectedVideo = videoRefs.current[index];

    if (!selectedVideo) return;

    const newMutedValue = !selectedVideo.muted;

    selectedVideo.muted = newMutedValue;

    setMutedVideos((previous) => ({
      ...previous,
      [index]: newMutedValue,
    }));
  };

  const handleVideoPlay = (index) => {
    setActiveVideo(index);
    swiperRef.current?.autoplay?.stop();
  };

  const handleVideoPause = (index) => {
    setActiveVideo((currentIndex) =>
      currentIndex === index ? null : currentIndex
    );
  };

  const handleVideoEnded = (index) => {
    const selectedVideo = videoRefs.current[index];

    if (selectedVideo) {
      selectedVideo.currentTime = 0;
    }

    setActiveVideo(null);
    swiperRef.current?.autoplay?.start();
  };

  if (loading) {
    return (
      <section className="overflow-hidden px-4 py-24 md:px-12 lg:px-24 xl:px-40">
        <div className="mb-9 text-center md:mb-12">
          <span className="mb-3 inline-block text-xs font-medium uppercase tracking-[0.28em] text-[#760209]/60">
            Real experiences
          </span>

          <h2 className="font-p text-3xl  text-p md:text-4xl lg:text-5xl">
            Hear It From Our Clients
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="aspect-[9/16] animate-pulse rounded-[14px] bg-gray-200"
            />
          ))}
        </div>
      </section>
    );
  }

  if (allVideos.length === 0) {
    return null;
  }

  return (
    <section className="overflow-hidden px-4 py-24 md:px-12 lg:px-24 xl:px-40">
      {/* Heading */}
      <div className="mb-9 text-center md:mb-12">
        <span className="mb-3 inline-block text-xs font-medium uppercase tracking-[0.28em] text-[#760209]/60">
          Real experiences
        </span>

        <h2 className="font-p text-3xl  text-p md:text-4xl lg:text-5xl">
          Hear It From Our Clients
        </h2>
      </div>

      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        modules={[Autoplay]}
        spaceBetween={14}
        slidesPerView={1.35}
        grabCursor
        speed={700}
        watchSlidesProgress
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          480: {
            slidesPerView: 1.8,
            spaceBetween: 16,
          },
          640: {
            slidesPerView: 2.4,
            spaceBetween: 16,
          },
          768: {
            slidesPerView: 3.2,
            spaceBetween: 18,
          },
          1024: {
            slidesPerView: 4.2,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 5,
            spaceBetween: 22,
          },
        }}
      >
        {allVideos.map((item, index) => {
          const isPlaying = activeVideo === index;
          const isMuted = mutedVideos[index] ?? true;

          return (
            <SwiperSlide key={item._id}>
              <article
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
                onClick={() => route.push(`/product/${item.product.slug}`)}
                className="group relative aspect-[9/16] cursor-pointer overflow-hidden rounded-[14px] bg-[#ead8cc] shadow-[0_18px_50px_rgba(41,8,5,0.10)]"
              >
                {/* Uploaded video */}
                <video
                  ref={(element) => {
                    videoRefs.current[index] = element;
                  }}
                  src={getMediaUrl(item.video)}
                  poster={getMediaUrl(item.product?.thumbnail)}
                  muted={isMuted}
                  playsInline
                  preload="metadata"
                  onPlay={() => handleVideoPlay(index)}
                  onPause={() => handleVideoPause(index)}
                  onEnded={() => handleVideoEnded(index)}
                  onError={() => {
                    console.error(
                      "Video loading failed:",
                      item.video
                    );
                  }}
                  className="absolute inset-0 h-full w-full object-cover"
                />

                {/* Dark gradient */}
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/70 transition-opacity duration-500 ${
                    isPlaying ? "opacity-30" : "opacity-100"
                  }`}
                />

                {/* Status badge */}
                {item.status && (
                  <div className="absolute left-2.5 top-2.5 z-20 rounded-full bg-[#760209] px-2.5 py-1 text-[9px] font-medium uppercase tracking-wider text-white shadow-md">
                    Client video
                  </div>
                )}

                {/* Product information */}
                <div
                  className={`pointer-events-none absolute inset-x-0 bottom-0 z-10 p-4 transition-all duration-300 ${
                    isPlaying
                      ? "translate-y-3 opacity-0"
                      : "translate-y-0 opacity-100"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {item.product?.thumbnail && (
                      <img
                        src={getMediaUrl(
                          item.product.thumbnail
                        )}
                        alt={
                          item.product?.name ||
                          "Product thumbnail"
                        }
                        className="h-9 w-9 shrink-0 rounded-full border-2 border-white/70 object-cover"
                      />
                    )}

                    <div className="min-w-0">
                      <p className="line-clamp-2 text-xs font-medium leading-4 text-white">
                        {item.product?.name ||
                          "Product video"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Play/Pause button */}
                <button
                  type="button"
                  aria-label={
                    isPlaying
                      ? "Pause video"
                      : "Play video"
                  }
                  onClick={(event) => {
                    event.stopPropagation();
                    handleClickVideo(index);
                  }}
                  className={`absolute left-1/2 top-1/2 z-20 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-white/85 text-[#760209] shadow-[0_8px_30px_rgba(0,0,0,0.18)] backdrop-blur-md transition duration-300 hover:scale-110 hover:bg-white ${
                    isPlaying
                      ? "opacity-0 group-hover:opacity-100"
                      : "opacity-100"
                  }`}
                >
                  {isPlaying ? (
                    <FiPause className="text-lg" />
                  ) : (
                    <FiPlay className="ml-0.5 text-lg" />
                  )}
                </button>

                {/* Volume button */}
                <button
                  type="button"
                  aria-label={
                    isMuted
                      ? "Unmute video"
                      : "Mute video"
                  }
                  onClick={(event) =>
                    handleMute(event, index)
                  }
                  className="absolute right-2.5 top-2.5 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition hover:bg-black/70"
                >
                  {isMuted ? (
                    <FiVolumeX className="text-sm" />
                  ) : (
                    <FiVolume2 className="text-sm" />
                  )}
                </button>

                {/* Border */}
                <div className="pointer-events-none absolute inset-0 rounded-[14px] border border-white/20" />
              </article>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default ClientVideos;