const BASE_URL = 'https://dog.ceo/api';

export const fetchDogImages = async (breed?: string): Promise<string[]> => {
  const endpoint = breed
    ? `${BASE_URL}/breed/${breed}/images/random/9`
    : `${BASE_URL}/breeds/image/random/9`;

  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error('Failed to fetch dog images');
  }

  const data = await response.json();
  return data.message;
};

export const fetchAllBreeds = async (): Promise<string[]> => {
  const response = await fetch(`${BASE_URL}/breeds/list/all`);
  if (!response.ok) {
    throw new Error('Failed to fetch breeds');
  }

  const data = await response.json();
  return Object.keys(data.message);
};