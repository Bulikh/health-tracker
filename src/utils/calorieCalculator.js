export const calc = (activity, distance) => {
  switch (activity) {
    case "hiking":
      return distance * 40;
    case "running":
      return distance * 140;
    case "swimming":
      return distance * 300;
    default:
      return distance;
  }
};
