import React from 'react';

interface VideoPlayerProps {
  src: string | null;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src }) => {
  if (src) {
    return (
      <video width="320" height="240" controls className="mb-4">
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  }

  return (
    <div className="mb-4 border rounded w-80 h-[240px] flex items-center justify-center bg-gray-200">
      <span>Video Placeholder</span>
    </div>
  );
};

export default VideoPlayer;