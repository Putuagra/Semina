import { CLEAR_NOTIFICATION, SET_NOTIFICATION } from "./constants";
let initialState = { status: false, typeNotification: "", message: null };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_NOTIFICATION:
      return {
        ...state,
        status: action.status,
        typeNotification: action.typeNotification,
        message: action.message,
      };
    case CLEAR_NOTIFICATION:
      return { state: initialState };
    default:
      return state;
  }
}
