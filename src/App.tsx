import React, { useState, useEffect } from 'react';
import { Search, X, RefreshCw, ChevronDown } from 'lucide-react';
import ColorPicker from './components/ColorPicker';
import ImageGrid from './components/ImageGrid';
import ZoomedImage from './components/ZoomedImage';
import BreedSearch from './components/BreedSearch';
import { fetchDogImages, fetchAllBreeds } from './api/dogs';

function App() {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showSearch, setShowSearch] = useState(false);
  const [breeds, setBreeds] = useState<string[]>([]);
  const [imageColors, setImageColors] = useState<Record<string, string>>({});

  useEffect(() => {
    loadInitialImages();
    loadBreeds();
  }, []);

  const loadInitialImages = async () => {
    try {
      setLoading(true);
      const newImages = await fetchDogImages();
      setImages(newImages);
      const newColors = { ...imageColors };
      newImages.forEach(img => {
        if (!newColors[img]) {
          newColors[img] = '#ffffff';
        }
      });
      setImageColors(newColors);
      setError(null);
    } catch (err) {
      setError('Failed to load images. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const loadBreeds = async () => {
    try {
      const breedList = await fetchAllBreeds();
      setBreeds(breedList);
    } catch (err) {
      console.error('Failed to load breeds');
    }
  };

  const handleBreedSelect = async (breed: string) => {
    try {
      setLoading(true);
      const breedImages = await fetchDogImages(breed);
      setImages(breedImages);
      const newColors = { ...imageColors };
      breedImages.forEach(img => {
        if (!newColors[img]) {
          newColors[img] = '#ffffff';
        }
      });
      setImageColors(newColors);
      setError(null);
    } catch (err) {
      setError(`Failed to load images for ${breed}. Please try another breed.`);
    } finally {
      setLoading(false);
    }
  };

  const handleColorChange = (imageUrl: string, color: string) => {
    setImageColors(prev => ({
      ...prev,
      [imageUrl]: color
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold text-gray-800">
              Pawsome Gallery
            </h1>
            <div className="flex gap-4">
              {!zoomedImage && (
                <button
                  onClick={() => setShowSearch(!showSearch)}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <Search size={20} />
                  Search Breeds
                  <ChevronDown size={20} />
                </button>
              )}
              <button
                onClick={loadInitialImages}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <RefreshCw size={20} />
                New Images
              </button>
            </div>
          </div>

          {showSearch && (
            <BreedSearch
              breeds={breeds}
              onBreedSelect={handleBreedSelect}
              onClose={() => setShowSearch(false)}
            />
          )}

          {error && (
            <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              {error}
            </div>
          )}
        </header>

        <main>
          <ImageGrid
            images={images}
            loading={loading}
            onImageClick={setZoomedImage}
          />
        </main>

        {zoomedImage && (
          <ZoomedImage
            imageUrl={zoomedImage}
            backgroundColor={imageColors[zoomedImage]}
            onColorChange={(color) => handleColorChange(zoomedImage, color)}
            onClose={() => setZoomedImage(null)}
          />
        )}
      </div>
    </div>
  );
}

export default App;