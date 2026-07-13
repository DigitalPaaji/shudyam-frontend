import BestProduct from "@/components/BestProduct";
import BestSeller from "@/components/BestSeller";
import Blogsection from "@/components/Blogsection";
import ClientVideos from "@/components/ClientVideos";
import Collection from "@/components/Collection";
import FeaturedProduct from "@/components/FeaturedProduct";
import FirstLoad from "@/components/FirstLoad";
import GiftSection from "@/components/GiftSection";
import HeroSection from "@/components/HeroSection";
import VideoStory from "@/components/VideoStory";
import Whyshudyam from "@/components/Whyshudyam";
import Image from "next/image";

export default function Home() {
  return (
    <>
    {/* <div className="overflow-x-hidden">
<FirstLoad />

    </div> */}
<HeroSection />

<Collection />

<BestProduct />
<VideoStory />
<BestSeller />
<Whyshudyam />
<FeaturedProduct />
<GiftSection />
<ClientVideos />
 <Blogsection />


    </>
  );
}
