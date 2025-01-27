import React from 'react';
import ImageLoader from './ImageLoader';

interface ImageGridProps {
  images: string[];
  loading: boolean;
  onImageClick: (imageUrl: string) => void;
}

const ImageGrid: React.FC<ImageGridProps> = ({ images, loading, onImageClick }) => {
  // Create an array of 9 elements for the grid
  const gridItems = Array(9).fill(null).map((_, index) => images[index] || null);

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {gridItems.map((imageUrl, index) => (
        <div
          key={index}
          className="relative aspect-square rounded-xl overflow-hidden hover:transform hover:scale-105 transition-transform duration-300 shadow-lg bg-white"
          onClick={() => imageUrl && onImageClick(imageUrl)}
        >
          {imageUrl ? (
            <ImageLoader
              src={imageUrl}
              alt={`Dog ${index + 1}`}
              className="w-full h-full object-contain cursor-pointer"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-50">
              <span className="text-gray-400">Image {index + 1}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ImageGrid;