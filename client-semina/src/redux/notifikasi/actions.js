import { CLEAR_NOTIFICATION, SET_NOTIFICATION } from "./constants";

export function setNotification(status, typeNotification, message) {
  return {
    type: SET_NOTIFICATION,
    status,
    typeNotification,
    message,
  };
}

export function clearNotification() {
  return {
    type: CLEAR_NOTIFICATION,
  };
}
