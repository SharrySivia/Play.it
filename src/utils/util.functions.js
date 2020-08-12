export const addToArray = (arr, itemToAdd) => {
  if (!arr) return [itemToAdd];
  let existingItem = arr.find((item) => item.id === itemToAdd.id);
  if (existingItem) return arr;
  return [...arr, itemToAdd];
};
