import React from 'react';

interface ThumbnailPreviewProps {
  src: string | null;
  className?:string
}

const ThumbnailPreview: React.FC<ThumbnailPreviewProps> = ({ src, className='' }) => {
  if (src) {
    return <img src={src} alt="Thumbnail Preview" className={`mb-4 object-cover rounded ${className}`} />;
  }

  return (
    <div className={`mb-4 border rounded flex items-center justify-center bg-gray-200 ${className}`}>
      <span >Image Placeholder</span>
    </div>
  );
};

export default ThumbnailPreview;