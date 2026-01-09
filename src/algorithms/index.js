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
    return i + 1;
  };

  const sort = async (low, high) => {
    if (low < high) {
      let pi = await partition(low, high);
      await sort(low, pi - 1);
      await sort(pi + 1, high);
    }
  };

  await sort(0, arr.length - 1);
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
