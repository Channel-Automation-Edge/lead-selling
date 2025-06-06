import React, { useMemo } from "react";
import Marquee from "./ui/marquee";
import BlurFade from "./ui/blur-fade";
import { useAppContext } from '@/context/AppContext';

interface Review {
  name: string;
  id: string;
  body: string;
  img: string;
}

// Array of stock profile photo URLs
const stockPhotos = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&auto=format&fit=crop&crop=faces&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&auto=format&fit=crop&crop=faces&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&auto=format&fit=crop&crop=faces&q=80",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&auto=format&fit=crop&crop=faces&q=80",
  "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=400&auto=format&fit=crop&crop=faces&q=80",
];

const ReviewCard: React.FC<Review> = ({ name, body, id }) => {
  // Use the ID to select a stock photo consistently
  const photoIndex = parseInt(id, 10) % stockPhotos.length;
  const stockPhoto = stockPhotos[photoIndex] || stockPhotos[0];
  
  return (
    <figure className="relative w-96 overflow-hidden rounded-xl p-6 shadow-lg mx-2 bg-white border border-gray-100">
      <div className="absolute top-0 left-0 h-2 w-full bg-accentColor"></div>
      <div className="relative z-10">
        <div className="flex items-center mb-4">
          <div className="mr-4">
            <img 
              className="rounded-full object-cover shadow-sm border-2 border-accentColor" 
              width="60" 
              height="60" 
              alt={`${name}'s profile`} 
              src={stockPhoto} 
            />
          </div>
          <div>
            <figcaption className="text-lg font-semibold text-gray-800">{name}</figcaption>
            <div className="flex items-center mt-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <svg key={index} className="w-4 h-4 text-accentColor" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09L5.5 10.18 1 6.18l5.932-.862L10 1l3.068 4.318L19 6.18l-4.5 4L15.878 18z" />
                </svg>
              ))}
            </div>
          </div>
        </div>
        <blockquote className="text-gray-700 italic relative">
          <svg className="absolute top-0 left-0 transform -translate-x-6 -translate-y-6 h-8 w-8 text-gray-200" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
            <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
          </svg>
          <p className="relative z-10 text-base">{body}</p>
        </blockquote>
      </div>
    </figure>
  );
};

const Testimonials: React.FC = () => {
  const { contractor } = useAppContext();

  if (!contractor?.testimonials || contractor.testimonials.length === 0) {
    return null;
  }

  // Create a memoized copy of sorted reviews to prevent unnecessary re-sorting
  const sortedReviews = useMemo(() => {
    return [...contractor.testimonials].sort((a, b) => a.id.localeCompare(b.id)); // Ascending order
  }, [contractor.testimonials]);

  return (
    <div>
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden pt-4 sm:pt-8 lg:pt-10">
        <BlurFade delay={1 * 0.15} inView yOffset={0}>
          {/* First Marquee: Ascending order */}
          <div className="relative w-full overflow-hidden">
            <Marquee pauseOnHover className="[--duration:30s] py-6">
              {sortedReviews.map((review: Review) => (
                <ReviewCard key={review.id} {...review} />
              ))}
            </Marquee>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-white to-transparent"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-white to-transparent"></div>
          </div>
        </BlurFade>
      </div>
    </div>
  );
};

export default Testimonials;
