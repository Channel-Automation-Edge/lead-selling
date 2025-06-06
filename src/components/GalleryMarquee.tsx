/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils";
import { Marquee } from "./magicui/marquee";

const images = [
  { img: "https://project-starfish.s3.us-east-005.backblazeb2.com/window+feature/Awning+Carousel+4.png" },
  { img: "https://project-starfish.s3.us-east-005.backblazeb2.com/window+feature/Awning+Carousel+6.png" },
  { img: "https://project-starfish.s3.us-east-005.backblazeb2.com/window+feature/Sliding+French+Carousel+3.png" },
  { img: "https://project-starfish.s3.us-east-005.backblazeb2.com/window+feature/baybow-3.png" },
  { img: "https://project-starfish.s3.us-east-005.backblazeb2.com/window+feature/baybow-5.png" },
  { img: "https://project-starfish.s3.us-east-005.backblazeb2.com/window+feature/why+choose+double+hung_764x430.png" }
];

const firstColumn = images.slice(0, 3);
const secondColumn = images.slice(3);

const ImageCard = ({ img }: { img: string }) => {
  return (
    <figure
      className={cn(
        "relative h-80 w-64 cursor-pointer overflow-hidden rounded-xl border-2", // Changed to h-80 (320px) tall
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <img 
        className="h-full w-full object-cover"
        alt="Window feature"
        src={img}
      />
    </figure>
  );
};

export function GalleryMarquee() {
  return (
    <div className="relative min-h-screen flex h-96 w-full flex-row items-center justify-center gap-4 overflow-hidden [perspective:2000px]">
      <div
        className="flex flex-row items-center gap-4"
        style={{
          transform:
            "translateX(-50px) translateY(0px) translateZ(-100px) rotateX(10deg) rotateY(-5deg)",
        }}
      >
        {/* First Column */}
        <Marquee pauseOnHover vertical className="[--duration:20s]">
          {firstColumn.map((image, index) => (
            <div key={index} className="my-4">
              <ImageCard {...image} />
            </div>
          ))}
        </Marquee>

        {/* Second Column */}
        <Marquee reverse pauseOnHover vertical className="[--duration:20s]">
          {secondColumn.map((image, index) => (
            <div key={index} className="my-4">
              <ImageCard {...image} />
            </div>
          ))}
        </Marquee>
      </div>

      {/* Gradient overlays */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-[#A6DA9E]"></div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#A6DA9E]"></div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#A6DA9E]"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[#A6DA9E]"></div>
    </div>
  );
}