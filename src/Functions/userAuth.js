export function userAuth() {
  let authState = localStorage.getItem("UserAuth");
  authState = JSON.parse(authState).userAuth;
  return authState;
}
