export const generateRandomArray = (size) => {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
};

export const generateRiggedArray = (size, shufflePercent = 50) => {
  // 1. Generate sorted array first
  const arr = Array.from({ length: size }, (_, i) => Math.floor((i / size) * 100) + 1);
  
  // 2. Define the split point based on shufflePercent
  const splitIndex = Math.floor((size * shufflePercent) / 100);
  
  // 3. Shuffle Left Zone (0 to splitIndex - 1)
  if (splitIndex > 1) {
    for (let i = splitIndex - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  
  // 4. Shuffle Right Zone (Disabled)
  // Right side remains sorted to allow algorithms like Bubble Sort to win or finish faster.
  
  return arr;
};

export const shuffle = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};
