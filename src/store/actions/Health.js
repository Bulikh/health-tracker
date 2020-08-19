import {
  ADD_MEAL,
  ADD_WEIGHT,
  ADD_ACTIVITY,
  EDIT,
} from "../actionCreators/auth";
export const edit = (date, name, unit, value) => {
  return {
    type: EDIT,
    payload: {
      date,
      unit,
      name,
      value,
    },
  };
};
export const addWeight = weight => {
  return {
    type: ADD_WEIGHT,
    payload: {
      weight: {
        ...weight,
      },
      name: "weight",
    },
  };
};
export const addMeal = meal => {
  return {
    type: ADD_MEAL,
    payload: {
      meal: {
        ...meal,
      },
      name: "meal",
    },
  };
};
export const addActivity = activity => {
  return {
    type: ADD_ACTIVITY,
    payload: {
      activity: {
        ...activity,
      },
      name: "activity",
    },
  };
};
