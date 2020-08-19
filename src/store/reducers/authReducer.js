import {
  LOGIN,
  SIGNUP,
  LOGOUT,
  ADD_ACTIVITY,
  ADD_WEIGHT,
  ADD_MEAL,
  EDIT,
} from "../actionCreators/auth";

const initialState = {
  authenticated: false,
  users: [],
  currUser: {},
};

const setHealthDetails = (state, action) => {
  const currUserId = state.users.findIndex(
    item => item.email === state.currUser.email
  );
  const userList = [...state.users];
  const newObj = {
    ...action.payload[action.payload.name],
  };
  delete newObj["date"];
  userList[currUserId] = {
    ...userList[currUserId],
    dailyData: {
      ...userList[currUserId].dailyData,
      [action.payload[action.payload.name].date]: {
        ...userList[currUserId].dailyData[
          action.payload[action.payload.name].date
        ],
        [action.payload.name]:
          action.payload.name === "weight"
            ? newObj[action.payload.name]
            : userList[currUserId].dailyData[
                action.payload[action.payload.name].date
              ] &&
              userList[currUserId].dailyData[
                action.payload[action.payload.name].date
              ][action.payload.name]
            ? [
                ...userList[currUserId].dailyData[
                  action.payload[action.payload.name].date
                ][action.payload.name],
                newObj,
              ]
            : [newObj],
      },
    },
  };
  return {
    ...state,
    users: userList,
    currUser: {
      ...state.currUser,
      dailyData: {
        ...userList[currUserId].dailyData,
      },
    },
  };
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP:
      return {
        ...state,
        authenticated: true,
        users: [
          ...state.users,
          {
            ...action.payload,
            dailyData: {},
          },
        ],
        currUser: {
          ...state.currUser,
          ...action.payload,
          dailyData: {},
        },
      };
    case LOGIN:
      const currUser = state.users.filter(
        user => user.email === action.payload.email
      );
      return {
        ...state,
        authenticated: true,
        currUser: currUser[0],
      };
    case LOGOUT:
      return {
        ...state,
        authenticated: false,
        currUser: {},
      };
    case ADD_WEIGHT:
      return setHealthDetails(state, action);
    case ADD_MEAL:
      return setHealthDetails(state, action);
    case ADD_ACTIVITY:
      return setHealthDetails(state, action);
    case EDIT:
      const { name, date, unit, value } = action.payload;
      if (name === "weight") {
        const userIndex = state.users.findIndex(
          user => user.email === state.currUser.email
        );
        const newUsers = [...state.users];
        newUsers[userIndex].dailyData = {
          ...newUsers[userIndex].dailyData,
          [date]: {
            ...state.currUser.dailyData[date],
            [name]: value,
          },
        };
        return {
          ...state,
          users: newUsers,
          currUser: {
            ...state.currUser,
            dailyData: {
              ...state.currUser.dailyData,
              [date]: {
                ...state.currUser.dailyData[date],
                [name]: value,
              },
            },
          },
        };
      } else {
        const userIndex = state.users.findIndex(
          user => user.email === state.currUser.email
        );
        const newUsers = [...state.users];
        const index = newUsers[userIndex].dailyData[date][name].findIndex(
          item => item[name] === unit.name && +item.calories === +unit.calories
        );
        newUsers[userIndex].dailyData[date][name][index].calories = value;
        const newRes = [...state.currUser.dailyData[date][name]];
        newRes[index].calories = value;
        return {
          ...state,
          users: newUsers,
          currUser: {
            ...state.currUser,
            dailyData: {
              ...state.currUser.dailyData,
              [date]: {
                ...state.currUser.dailyData[date],
                [name]: newRes,
              },
            },
          },
        };
      }
    default:
      return state;
  }
};
export default authReducer;
