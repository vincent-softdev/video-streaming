import React from 'react';

interface VideoPlayerProps {
  src: string | null
  className?: string
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, className = '' }) => {
  if (src) {
    return (
      <video width="320" height="240" controls className={`mb-4 ${className}`}>
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  }

  return (
    <div className={`mb-4 border rounded flex items-center justify-center bg-gray-200 ${className}`}>
      <span>Video Placeholder</span>
    </div>
  );
};

export default VideoPlayer;