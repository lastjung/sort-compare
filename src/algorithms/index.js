export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const bubbleSort = async (array, onStep) => {
  let arr = [...array];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      await onStep(arr, [j, j + 1], 'compare');
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        await onStep(arr, [j, j + 1], 'swap');
      }
    }
    // Final element of this pass is now in its correct place
    await onStep(arr, [], 'progress', [arr.length - i - 1]);
  }
  return arr;
};

export const optimizedBubbleSort = async (array, onStep) => {
  let arr = [...array];
  let n = arr.length;
  for (let i = 0; i < n; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      await onStep(arr, [j, j + 1], 'compare');
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        await onStep(arr, [j, j + 1], 'swap');
        swapped = true;
      }
    }
    if (!swapped) {
      // If no swaps occurred, the rest of the array is already sorted
      const remainingIndices = Array.from({ length: n - i }, (_, idx) => idx);
      await onStep(arr, [], 'progress', remainingIndices);
      break;
    }
    // Final element of this pass is now in its correct place
    await onStep(arr, [], 'progress', [n - i - 1]);
  }
  return arr;
};

export const selectionSort = async (array, onStep) => {
  let arr = [...array];
  for (let i = 0; i < arr.length; i++) {
    let minIdx = i;
    for (let j = i + 1; j < arr.length; j++) {
      await onStep(arr, [minIdx, j], 'compare');
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      await onStep(arr, [i, minIdx], 'swap');
    }
    // i-th element is now in its correct place
    await onStep(arr, [], 'progress', [i]);
  }
  return arr;
};

export const insertionSort = async (array, onStep) => {
  let arr = [...array];
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;
    await onStep(arr, [i, j], 'compare');
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      await onStep(arr, [j, j + 1], 'swap');
      j = j - 1;
      if (j >= 0) await onStep(arr, [j, i], 'compare');
    }
    arr[j + 1] = key;
    await onStep(arr, [j + 1], 'swap');
  }
  return arr;
};

export const quickSort = async (array, onStep) => {
  let arr = [...array];
  
  const partition = async (low, high) => {
    let pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      await onStep(arr, [j, high], 'compare');
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        await onStep(arr, [i, j], 'swap');
      }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    await onStep(arr, [i + 1, high], 'swap');
    
    // Pivot position is now fixed
    await onStep(arr, [], 'progress', [i + 1]);
    return i + 1;
  };

  const sort = async (low, high) => {
    if (low < high) {
      let pi = await partition(low, high);
      await sort(low, pi - 1);
      await sort(pi + 1, high);
    } else if (low === high) {
      // Single element is also finalized
      await onStep(arr, [], 'progress', [low]);
    }
  };

  await sort(0, arr.length - 1);
  return arr;
};

// Intro Sort: quick sort + heap sort fallback + insertion sort for small partitions.
export const introSort = async (array, onStep) => {
  const arr = [...array];
  const n = arr.length;
  const SIZE_THRESHOLD = 16;
  const maxDepth = 2 * Math.floor(Math.log2(Math.max(2, n)));

  const swap = async (i, j) => {
    if (i === j) return;
    [arr[i], arr[j]] = [arr[j], arr[i]];
    await onStep(arr, [i, j], 'swap');
  };

  const insertionSortRange = async (left, right) => {
    for (let i = left + 1; i <= right; i++) {
      const key = arr[i];
      let j = i - 1;
      await onStep(arr, [i, j], 'compare');
      while (j >= left && arr[j] > key) {
        arr[j + 1] = arr[j];
        await onStep(arr, [j, j + 1], 'swap');
        j--;
        if (j >= left) await onStep(arr, [j, i], 'compare');
      }
      arr[j + 1] = key;
      await onStep(arr, [j + 1], 'swap');
    }
  };

  const heapifyRange = async (left, heapSize, root) => {
    let largest = root;
    const l = 2 * root + 1;
    const r = 2 * root + 2;

    if (l < heapSize) {
      await onStep(arr, [left + largest, left + l], 'compare');
      if (arr[left + l] > arr[left + largest]) largest = l;
    }
    if (r < heapSize) {
      await onStep(arr, [left + largest, left + r], 'compare');
      if (arr[left + r] > arr[left + largest]) largest = r;
    }
    if (largest !== root) {
      await swap(left + root, left + largest);
      await heapifyRange(left, heapSize, largest);
    }
  };

  const heapSortRange = async (left, right) => {
    const heapSize = right - left + 1;
    for (let i = Math.floor(heapSize / 2) - 1; i >= 0; i--) {
      await heapifyRange(left, heapSize, i);
    }
    for (let end = heapSize - 1; end > 0; end--) {
      await swap(left, left + end);
      await heapifyRange(left, end, 0);
    }
  };

  const partition = async (left, right) => {
    const pivot = arr[right];
    let i = left - 1;
    for (let j = left; j < right; j++) {
      await onStep(arr, [j, right], 'compare');
      if (arr[j] < pivot) {
        i++;
        await swap(i, j);
      }
    }
    await swap(i + 1, right);
    return i + 1;
  };

  const sort = async (left, right, depth) => {
    if (left >= right) return;

    if (right - left + 1 <= SIZE_THRESHOLD) {
      await insertionSortRange(left, right);
      return;
    }

    if (depth === 0) {
      await heapSortRange(left, right);
      return;
    }

    const pivotIndex = await partition(left, right);
    await onStep(arr, [], 'progress', [pivotIndex]);
    await sort(left, pivotIndex - 1, depth - 1);
    await sort(pivotIndex + 1, right, depth - 1);
  };

  await sort(0, n - 1, maxDepth);
  const allIndices = Array.from({ length: n }, (_, idx) => idx);
  await onStep(arr, [], 'progress', allIndices);
  return arr;
};

export const mergeSort = async (array, onStep) => {
  let arr = [...array];

  const merge = async (l, m, r) => {
    let n1 = m - l + 1;
    let n2 = r - m;
    let L = arr.slice(l, m + 1);
    let R = arr.slice(m + 1, r + 1);

    let i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
      await onStep(arr, [l + i, m + 1 + j], 'compare');
      if (L[i] <= R[j]) {
        arr[k] = L[i];
        i++;
      } else {
        arr[k] = R[j];
        j++;
      }
      await onStep(arr, [k], 'swap');
      k++;
    }

    while (i < n1) {
      arr[k] = L[i];
      await onStep(arr, [k], 'swap');
      i++;
      k++;
    }
    while (j < n2) {
      arr[k] = R[j];
      await onStep(arr, [k], 'swap');
      j++;
      k++;
    }
  };

  const sort = async (l, r) => {
    if (l < r) {
      let m = Math.floor((l + r) / 2);
      await sort(l, m);
      await sort(m + 1, r);
      await merge(l, m, r);
    }
  };

  await sort(0, arr.length - 1);
  return arr;
};

// Tim Sort (simplified): insertion sort on small runs + iterative merge.
export const timSort = async (array, onStep) => {
  const arr = [...array];
  const n = arr.length;
  const MIN_RUN = 32;

  const insertionSortRange = async (left, right) => {
    for (let i = left + 1; i <= right; i++) {
      const key = arr[i];
      let j = i - 1;

      await onStep(arr, [i, j], 'compare');
      while (j >= left && arr[j] > key) {
        arr[j + 1] = arr[j];
        await onStep(arr, [j, j + 1], 'swap');
        j--;
        if (j >= left) await onStep(arr, [j, i], 'compare');
      }
      arr[j + 1] = key;
      await onStep(arr, [j + 1], 'swap');
    }
  };

  const merge = async (left, mid, right) => {
    const leftPart = arr.slice(left, mid + 1);
    const rightPart = arr.slice(mid + 1, right + 1);

    let i = 0;
    let j = 0;
    let k = left;

    while (i < leftPart.length && j < rightPart.length) {
      await onStep(arr, [left + i, mid + 1 + j], 'compare');
      if (leftPart[i] <= rightPart[j]) {
        arr[k] = leftPart[i++];
      } else {
        arr[k] = rightPart[j++];
      }
      await onStep(arr, [k], 'swap');
      k++;
    }

    while (i < leftPart.length) {
      arr[k] = leftPart[i++];
      await onStep(arr, [k], 'swap');
      k++;
    }

    while (j < rightPart.length) {
      arr[k] = rightPart[j++];
      await onStep(arr, [k], 'swap');
      k++;
    }
  };

  for (let left = 0; left < n; left += MIN_RUN) {
    const right = Math.min(left + MIN_RUN - 1, n - 1);
    await insertionSortRange(left, right);
  }

  for (let size = MIN_RUN; size < n; size *= 2) {
    for (let left = 0; left < n; left += 2 * size) {
      const mid = Math.min(left + size - 1, n - 1);
      const right = Math.min(left + 2 * size - 1, n - 1);
      if (mid < right) {
        await merge(left, mid, right);
      }
    }
  }

  const allIndices = Array.from({ length: n }, (_, idx) => idx);
  await onStep(arr, [], 'progress', allIndices);
  return arr;
};

// Heap Sort
export const heapSort = async (array, onStep) => {
  let arr = [...array];
  const n = arr.length;

  const heapify = async (n, i) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n) {
      await onStep(arr, [largest, left], 'compare');
      if (arr[left] > arr[largest]) {
        largest = left;
      }
    }

    if (right < n) {
      await onStep(arr, [largest, right], 'compare');
      if (arr[right] > arr[largest]) {
        largest = right;
      }
    }

    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      await onStep(arr, [i, largest], 'swap');
      await heapify(n, largest);
    }
  };

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    await heapify(n, i);
  }

  // Extract elements from heap
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    await onStep(arr, [0, i], 'swap');
    // i-th element is now in its correct place
    await onStep(arr, [], 'progress', [i]);
    await heapify(i, 0);
  }
  // The last remaining element is also finalized
  await onStep(arr, [], 'progress', [0]);

  return arr;
};

// Shell Sort
export const shellSort = async (array, onStep) => {
  let arr = [...array];
  const n = arr.length;

  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < n; i++) {
      let temp = arr[i];
      let j = i;

      await onStep(arr, [j, j - gap], 'compare');
      while (j >= gap && arr[j - gap] > temp) {
        arr[j] = arr[j - gap];
        await onStep(arr, [j, j - gap], 'swap');
        j -= gap;
        if (j >= gap) {
          await onStep(arr, [j, j - gap], 'compare');
        }
      }
      arr[j] = temp;
      await onStep(arr, [j], 'swap');
    }
  }

  return arr;
};

// Cocktail Sort (Bidirectional Bubble Sort)
export const cocktailSort = async (array, onStep) => {
  let arr = [...array];
  let start = 0;
  let end = arr.length - 1;
  let swapped = true;

  while (swapped) {
    swapped = false;

    // Forward pass (like bubble sort)
    for (let i = start; i < end; i++) {
      await onStep(arr, [i, i + 1], 'compare');
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        await onStep(arr, [i, i + 1], 'swap');
        swapped = true;
      }
    }

    if (!swapped) {
      // If no swaps, entire remaining subarray is finalized
      const indices = Array.from({ length: end - start + 1 }, (_, i) => start + i);
      await onStep(arr, [], 'progress', indices);
      break;
    }

    // end-th element is now fixed
    await onStep(arr, [], 'progress', [end]);
    end--;
    swapped = false;

    // Backward pass
    for (let i = end; i > start; i--) {
      await onStep(arr, [i, i - 1], 'compare');
      if (arr[i] < arr[i - 1]) {
        [arr[i], arr[i - 1]] = [arr[i - 1], arr[i]];
        await onStep(arr, [i, i - 1], 'swap');
        swapped = true;
      }
    }

    // start-th element is now fixed
    await onStep(arr, [], 'progress', [start]);
    start++;
  }

  return arr;
};

export const combSort = async (array, onStep) => {
  let arr = [...array];
  const n = arr.length;
  let gap = n;
  const shrink = 1.3;
  let sorted = false;

  while (!sorted) {
    gap = Math.floor(gap / shrink);
    if (gap <= 1) {
      gap = 1;
      sorted = true;
    }

    for (let i = 0; i + gap < n; i++) {
      await onStep(arr, [i, i + gap], 'compare');
      if (arr[i] > arr[i + gap]) {
        [arr[i], arr[i + gap]] = [arr[i + gap], arr[i]];
        await onStep(arr, [i, i + gap], 'swap');
        sorted = false;
      }
    }
  }

  // Finalize all elements as sorted
  const allIndices = Array.from({ length: n }, (_, i) => i);
  await onStep(arr, [], 'progress', allIndices);
  return arr;
};

export const ALGORITHMS = [
  { 
    id: 'bubble', 
    title: 'Bubble Sort', 
    fn: bubbleSort, 
    complexity: 'O(n²)', 
    desc: 'Swaps adjacent elements if they are in wrong order.' 
  },
  { 
    id: 'optimized-bubble', 
    title: 'Optimized Bubble Sort', 
    fn: optimizedBubbleSort, 
    complexity: 'O(n²)', 
    desc: 'Bubble sort with early exit if array becomes sorted.' 
  },
  { 
    id: 'selection', 
    title: 'Selection Sort', 
    fn: selectionSort, 
    complexity: 'O(n²)', 
    desc: 'Selects the smallest element and moves it to the sorted part.' 
  },
  { 
    id: 'insertion', 
    title: 'Insertion Sort', 
    fn: insertionSort, 
    complexity: 'O(n²)', 
    desc: 'Builds the sorted array one item at a time by comparison.' 
  },
  { 
    id: 'quick', 
    title: 'Quick Sort', 
    fn: quickSort, 
    complexity: 'O(n log n)', 
    desc: 'Divides array into partitions and sorts them recursively.' 
  },
  { 
    id: 'intro', 
    title: 'Intro Sort', 
    fn: introSort, 
    complexity: 'O(n log n)', 
    desc: 'Quick sort with depth limit fallback to heap sort and insertion sort for small ranges.' 
  },
  { 
    id: 'merge', 
    title: 'Merge Sort', 
    fn: mergeSort, 
    complexity: 'O(n log n)', 
    desc: 'Recursively divides array in half and merges sorted parts.' 
  },
  { 
    id: 'tim', 
    title: 'Tim Sort', 
    fn: timSort, 
    complexity: 'O(n log n)', 
    desc: 'Hybrid of insertion and merge sort optimized for real-world data.' 
  },
  { 
    id: 'heap', 
    title: 'Heap Sort', 
    fn: heapSort, 
    complexity: 'O(n log n)', 
    desc: 'Builds a max-heap and repeatedly extracts the maximum.' 
  },
  { 
    id: 'shell', 
    title: 'Shell Sort', 
    fn: shellSort, 
    complexity: 'O(n log n)', 
    desc: 'Sorts elements at specific intervals, reducing the gap.' 
  },
  { 
    id: 'cocktail', 
    title: 'Cocktail Sort', 
    fn: cocktailSort, 
    complexity: 'O(n²)', 
    desc: 'Bidirectional bubble sort, shaking elements both ways.' 
  },
  { 
    id: 'comb', 
    title: 'Comb Sort', 
    fn: combSort, 
    complexity: 'O(n log n)', 
    desc: 'Improves bubble sort by eliminating turtles using a gap.' 
  },
];
