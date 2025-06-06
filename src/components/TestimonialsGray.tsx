import React from "react";
import Marquee from "./ui/marquee";
import BlurFade from "./ui/blur-fade";
import { useAppContext } from '@/context/AppContext';

interface Review {
  name: string;
  id: string;
  body: string;
  img: string;
}

const ReviewCard: React.FC<Review> = ({ img, name, body }) => {
  return (
    <figure className="relative w-96 overflow-hidden rounded-xl p-4">
      <div className="absolute inset-0 bg-accentLight opacity-90"></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img className="rounded-full" width="32" height="32" alt="" src={img} />
            <figcaption className="text-sm font-medium text-gray-900">{name}</figcaption>
          </div>
        </div>
        <div className="flex items-center mt-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <svg key={index} className="w-4 h-4 text-accentColor" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 15l-5.878 3.09L5.5 10.18 1 6.18l5.932-.862L10 1l3.068 4.318L19 6.18l-4.5 4L15.878 18z" />
            </svg>
          ))}
        </div>
        <hr className="my-2 border-gray-300" />
        <blockquote className="text-sm text-gray-700">{body}</blockquote>
      </div>
    </figure>
  );
};

const TestimonialsGray: React.FC = () => {
  const { contractor } = useAppContext();

  if (!contractor.testimonials || contractor.testimonials.length === 0) {
    return null;
  }

  const sortedReviews = [...contractor.testimonials].sort((a, b) => a.id.localeCompare(b.id)); // Ascending order

  return (
    <div>
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden pointer-events-none">
        <div className="hidden text-center">
          <BlurFade delay={3 * 0.15} inView yOffset={0} className="section_header mb-[25px]">
            What our <span className="text-accentColor">satisfied</span> clients say about us
          </BlurFade>
          <p className="mt-2 md:mt-4 text-gray-500 dark:text-neutral-500"></p>
        </div>

        <BlurFade delay={1 * 0.15} inView yOffset={0}>
          {/* First Marquee: Ascending order */}
          <Marquee pauseOnHover className="[--duration:20s]">
            {sortedReviews.map((review: Review) => (
              <ReviewCard key={review.id} {...review} />
            ))}
          </Marquee>
        </BlurFade>
        <div className="hidden sm:block pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-gray-50 dark:from-background"></div>
        <div className="hidden sm:block pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-gray-50 dark:from-background"></div>
      </div>
    </div>
  );
};

export default TestimonialsGray;
