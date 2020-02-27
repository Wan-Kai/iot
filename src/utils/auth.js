import { getUserId } from "../store/login";

export function getCurrentAuthority() {
  const userId = [];
  userId.push(getUserId());
  return userId;
}

export function check(authority) {
  const current = getCurrentAuthority();
  return current.some(item => authority.includes(item));
}

export function isLogin() {
  const current = getCurrentAuthority();
  return current && current[0] !== "guest";
}
