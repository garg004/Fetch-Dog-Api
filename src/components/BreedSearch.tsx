import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';

interface BreedSearchProps {
  breeds: string[];
  onBreedSelect: (breed: string) => void;
  onClose: () => void;
}

const BreedSearch: React.FC<BreedSearchProps> = ({ breeds, onBreedSelect, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [draggedBreed, setDraggedBreed] = useState<string | null>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  const filteredBreeds = breeds.filter(breed =>
    breed.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDragStart = (breed: string) => {
    setDraggedBreed(breed);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (dropZoneRef.current) {
      dropZoneRef.current.classList.add('bg-indigo-100');
    }
  };

  const handleDragLeave = () => {
    if (dropZoneRef.current) {
      dropZoneRef.current.classList.remove('bg-indigo-100');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedBreed) {
      onBreedSelect(draggedBreed);
      onClose();
    }
    handleDragLeave();
  };

  return (
    <div className="relative bg-white p-6 rounded-lg shadow-lg mb-6">
      <button
        onClick={onClose}
        className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
      >
        <X size={20} />
      </button>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search breeds..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>

      <div
        ref={dropZoneRef}
        className="border-2 border-dashed border-gray-300 rounded-lg p-4 mb-4 text-center transition-colors"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        Drag and drop a breed here to search
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 max-h-48 overflow-y-auto">
        {filteredBreeds.map(breed => (
          <div
            key={breed}
            draggable
            onDragStart={() => handleDragStart(breed)}
            onClick={() => {
              onBreedSelect(breed);
              onClose();
            }}
            className="p-2 bg-gray-100 rounded cursor-pointer hover:bg-indigo-100 transition-colors text-center"
          >
            {breed}
          </div>
        ))}
      </div>
    </div>
  );
}

export default BreedSearch;