1. State Management & Component Architecture

// Core state in App.tsx
const [images, setImages] = useState<string[]>([]);
const [imageColors, setImageColors] = useState<Record<string, string>>({});
const [zoomedImage, setZoomedImage] = useState<string | null>(null);
I have implemented a centralized state management in the parent component using React hooks. The imageColors state uses a Record type to maintain a mapping between image URLs and their background colors, ensuring O(1) lookup time.

2.API Integration & Error Handling

// Custom API layer with TypeScript interfaces
const fetchDogImages = async (breed?: string): Promise<string[]> => {
  const endpoint = breed
    ? `${BASE_URL}/breed/${breed}/images/random/9`
    : `${BASE_URL}/breeds/image/random/9`;
  // Error handling implementation
}
I tried to built a type-safe API layer using TypeScript, implementing proper error boundaries and async/await patterns. The API supports both random images and breed-specific queries.

3.Performance Optimizations
-Implemented lazy loading for images using a custom ImageLoader component
-Used React.memo() where beneficial for preventing unnecessary re-renders
-Optimized state updates by batching color changes

const handleColorChange = (imageUrl: string, color: string) => {
  setImageColors(prev => ({...prev, [imageUrl]: color}));
};
4.Responsive Grid System

// Grid implementation with fixed aspect ratio
<div className="grid grid-cols-3 gap-4 p-4">
  {gridItems.map((imageUrl, index) => (
    <div className="relative aspect-square">
      // Content
    </div>
  ))}
</div>
We used CSS Grid with Tailwind for a responsive layout, maintaining aspect ratios using modern CSS properties.

5.Technical Challenges & Solutions
a) Image Aspect Ratio Challenge


// Solution: Using object-contain instead of cover
<img
  className="w-full h-full object-contain"
  src={imageUrl}
  alt={`Dog ${index + 1}`}
/>
This preserves image aspect ratios while fitting within containers.

b) State Synchronization
Challenge: Maintaining color state across image changes.
Solution: Implemented a color mapping system that persists through image updates:


useEffect(() => {
  const newColors = { ...imageColors };
  newImages.forEach(img => {
    if (!newColors[img]) {
      newColors[img] = '#ffffff';
    }
  });
  setImageColors(newColors);
}, [images]);
c) Modal Implementation


// ZoomedImage.tsx
<div
  className="fixed inset-0 bg-black bg-opacity-75"
  onClick={onClose}
>
  <div onClick={e => e.stopPropagation()}>
    // Modal content
  </div>
</div>
Implemented event propagation control for modal interaction.

6.Type Safety

interface ImageGridProps {
  images: string[];
  loading: boolean;
  onImageClick: (imageUrl: string) => void;
}
Strict TypeScript interfaces ensure type safety across component boundaries.

-------Challenges--------
1. Use object-contain for full image display
   Replace object-cover with object-contain in image elements to ensure no cropping, combined with w-full, h-full, and optional aspect-ratio classes for consistent sizing.

2. Move color picker to zoomed view
   Integrate the color picker inside a modal/lightbox component for individual images, managing state with useState or context to link functionality to the current image.
 
3. Make breed search toggle-able with drag-and-drop
   Use a state variable (e.g., searchEnabled) to toggle search bar visibility.
  Implement drag-and-drop for breed items with libraries like react-beautiful-dnd, updating state dynamically for live search results.
  
4. Add loading spinners for each image
   Manage image loading states in a map (e.g., { imageId: true/false }), toggled by onLoad and onError handlers.
   Conditionally render a spinner component based on the loading state.










