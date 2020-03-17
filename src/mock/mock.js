import mock from "mockjs";
import * as serverData from "./serverData";
import * as login from "./userInfo";
import * as gateway from "./gatewayData";
import * as node from "./nodeData";
import * as app from "./appData";
import * as users from "./usersData";

mock.mock(`/admin/login`, "post", () => {
  return login.userInfo;
});

//internetServer
mock.mock(`/admin/server/data`, "post", () => {
  return serverData.ServerData;
});
mock.mock(`/admin/server/message`, "post", () => {
  return serverData.Message;
});
mock.mock(`/admin/server/check`, "post", () => {
  return serverData.Check;
});
//message
mock.mock(`/admin/server/message/detail`, "post", () => {
  return serverData.Message_Detail;
});
mock.mock(`/admin/server/message/delete`, "post", () => {
  return serverData.Deleted_Message;
});

//gatewat
mock.mock(`/admin/gateway/data`, "post", () => {
  return gateway.GatewayData;
});
mock.mock(`/admin/gateway/ilogFlow/data`, "post", () => {
  return gateway.IlogFlowData;
});
mock.mock(`/admin/gateway/gatewayMap/data`, "post", () => {
  return gateway.GatewayMapData;
});

//node
mock.mock(`/admin/node/data`, "post", () => {
  return node.NodeData;
});
mock.mock(`/admin/gateway/nlogFlow/data`, "post", () => {
  return node.NlogFlowData;
});
//app
mock.mock(`/admin/app/data`, "post", () => {
  return app.AppData;
});
mock.mock(`/admin/app/detail`, "post", () => {
  return app.AppDetailData;
});
mock.mock(`/admin/app/nodeData`, "post", () => {
  return app.AppNodeData;
});
//users
mock.mock(`/admin/users/data`, "post", () => {
  return users.UsersData;
});
