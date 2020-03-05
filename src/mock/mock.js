import mock from "mockjs";
import * as serverData from "./serverData";
import * as login from "./userInfo";
import * as gateway from "./gatewayData";

//internetServer
mock.mock(`/admin/server/data`, "post", () => {
  return serverData.ServerData;
});
mock.mock(`/admin/server/message`, "post", () => {
  return serverData.Message;
});

//gatewat
mock.mock(`/admin/gateway/data`, "post", () => {
  return gateway.GatewayData;
});

mock.mock(`/admin/login`, "post", () => {
  return login.userInfo;
});
