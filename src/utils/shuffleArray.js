const shuffle = (array) => {
  const arr = [...array];
  for(let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const buffer = arr[i];
    arr[i] = arr[j];
    arr[j] = buffer;
  }

  return arr;
}

export {
  shuffle
};
