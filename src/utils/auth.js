import { getRole, getLoginState } from "../store/modules/login";

export function getCurrentAuthority() {
  const roles = [];
  roles.push(getRole());
  return roles;
}

export function checkAuthority(authority) {
  const current = getCurrentAuthority();
  return current.some(item => authority.includes(item));
}

export function isLogin() {
  if (getLoginState() === "1") {
    return true;
  }
  return false;
}
