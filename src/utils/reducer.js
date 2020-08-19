export const reducer = array => {
  return array.reduce((sum, item) => parseInt(item.calories) + sum, 0);
};
