import mock from "mockjs";
import * as serverData from "./serverData";
import * as login from "./userInfo";

mock.mock(`/admin/server/data`, "post", () => {
  return serverData.ServerData;
});

mock.mock(`/admin/login`, "post", () => {
  return login.userInfo;
});
