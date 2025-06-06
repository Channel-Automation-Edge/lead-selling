// ProgressBar.tsx
import React from 'react';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="flex w-full h-1.5 bg-gray-200 rounded-full overflow-hidden dark:bg-neutral-700" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
      <div
        className="flex flex-col justify-center rounded-full overflow-hidden bg-accentColor text-xs text-white text-center whitespace-nowrap transition-width duration-500 dark:bg-accentColor"
        style={{ width: `${progress}%`, transition: 'width 0.5s ease' }}
      ></div>
    </div>
  );
};

export default ProgressBar;
