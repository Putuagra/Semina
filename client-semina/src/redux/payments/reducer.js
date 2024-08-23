import {
  START_FETCHING_PAYMENTS,
  SUCCESS_FETCHING_PAYMENTS,
  ERROR_FETCHING_PAYMENTS,
} from "./constants";

const statusList = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};

const initialState = {
  data: [],
  keyword: "",
  status: statusList.idle,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case START_FETCHING_PAYMENTS:
      return { ...state, status: statusList.process };
    case ERROR_FETCHING_PAYMENTS:
      return { ...state, status: statusList.error };
    case SUCCESS_FETCHING_PAYMENTS:
      return { ...state, status: statusList.success, data: action.payments };

    default:
      return state;
  }
}
