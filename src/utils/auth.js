import { getKey, getLoginState } from "../store/login";

export function getCurrentAuthority() {
  const userId = [];
  userId.push(getKey());
  return userId;
}

export function check(authority) {
  const current = getCurrentAuthority();
  return current.some(item => authority.includes(item));
}

export function isLogin() {
  if (getLoginState() === "1") {
    return true;
  }
  return false;
}
