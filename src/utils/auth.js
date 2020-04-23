import { getKey, getLoginState } from "../store/modules/login";

export function getCurrentAuthority() {
  const user = [];
  user.push(getKey());
  return user;
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
