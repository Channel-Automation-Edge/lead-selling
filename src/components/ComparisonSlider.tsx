import { useState } from 'react';

interface ComparisonSliderProps {
  beforeImage: string;
  afterImage: string;
  containerWidth?: string;
  containerHeight?: string;
}

export const ComparisonSlider = ({
  beforeImage,
  afterImage,
  containerWidth = 'w-full',
  containerHeight = 'aspect-[70/65]',
}: ComparisonSliderProps) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);

  // Hide overlay on first interaction
  const handleOverlayClick = () => {
    setShowOverlay(false);
  };


  const handleMove = (clientX: number, element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const handleMouseDown = () => {
    setIsDragging(true);
    setShowOverlay(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    handleMove(e.clientX, e.currentTarget);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch event handlers
  const handleTouchStart = () => {
    setIsDragging(true);
    setShowOverlay(false);
  };
  
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    // e.preventDefault();
    handleMove(e.touches[0].clientX, e.currentTarget);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };
  

  return (
    <div className={`${containerWidth} relative`} onMouseUp={handleMouseUp} onTouchEnd={handleTouchEnd}>
      <div
        className={`relative ${containerWidth} ${containerHeight} m-auto overflow-hidden select-none border border-gray-200 rounded-lg touch-none`}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        {/* After Image */}
        <div className="relative w-full h-full rounded-lg">
          <img
            alt="After"
            src={afterImage}
            draggable="false"
            className="w-full h-full object-cover absolute top-0 left-0 rounded-lg"
          />
        </div>

        {/* Before Image with clip path */}
        <div
          className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-lg"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <div className="relative w-full h-full">
            <img
              alt="Before"
              src={beforeImage}
              draggable="false"
              className="w-full h-full object-cover absolute top-0 left-0 rounded-lg"
            />
          </div>
        </div>

        {/* Slider Control */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-lg touch-none"
          style={{
            left: `calc(${sliderPosition}% - 1px)`,
          }}
        >
          <div className="absolute -left-5 top-[calc(50%-25px)] w-10 h-10 rounded-full border-2 border-white bg-transparent flex items-center justify-center shadow-lg hover:scale-110 transition-transform touch-none">
            <div className="flex space-x-1">
              <svg 
                className="w-4 h-4 text-white"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <svg 
                className="w-4 h-4 text-white"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Overlay for drag instruction */}
      {showOverlay && (
          <div 
            className="absolute inset-0 flex items-center justify-center bg-black/30 animate-pulse rounded-lg cursor-pointer touch-none"
            onClick={handleOverlayClick}
          >
            <div className="text-center text-white mt-20">
              <p className="font-medium">Drag to compare</p>
              <p className="text-sm mt-1">← Click anywhere to start →</p>
            </div>
          </div>
        )}
    </div>
  );
};