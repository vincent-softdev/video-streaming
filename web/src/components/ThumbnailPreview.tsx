import React from 'react';

interface ThumbnailPreviewProps {
  src: string | null;
}

const ThumbnailPreview: React.FC<ThumbnailPreviewProps> = ({ src }) => {
  if (src) {
    return <img src={src} alt="Thumbnail Preview" className="mb-4 w-32 h-32 object-cover rounded" />;
  }

  return (
    <div className="mb-4 border rounded w-32 h-32 flex items-center justify-center bg-gray-200">
      <span >Image Placeholder</span>
    </div>
  );
};

export default ThumbnailPreview;