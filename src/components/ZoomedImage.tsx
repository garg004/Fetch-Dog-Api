import React from 'react';
import { X } from 'lucide-react';
import ColorPicker from './ColorPicker';

interface ZoomedImageProps {
  imageUrl: string;
  backgroundColor: string;
  onColorChange: (color: string) => void;
  onClose: () => void;
}

const ZoomedImage: React.FC<ZoomedImageProps> = ({ 
  imageUrl, 
  backgroundColor, 
  onColorChange, 
  onClose 
}) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        className="relative w-[80%] h-[80%] max-w-4xl p-8 rounded-lg"
        style={{ backgroundColor }}
        onClick={e => e.stopPropagation()}
      >
        <img
          src={imageUrl}
          alt="Zoomed dog"
          className="w-full h-full object-contain rounded-lg"
        />
        <button
          onClick={onClose}
          className="absolute -right-12 top-0 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
        >
          <X size={24} />
        </button>
        <div className="absolute bottom-4 right-4">
          <ColorPicker
            color={backgroundColor}
            onChange={onColorChange}
            label="Background Color"
          />
        </div>
      </div>
    </div>
  );
}

export default ZoomedImage;