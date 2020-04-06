import mock from "mockjs";
import * as serverData from "./serverData";
import * as login from "./userInfo";
import * as gateway from "./gatewayData";
import * as node from "./nodeData";
import * as app from "./appData";
import * as users from "./usersData";
import * as index from "./index";

mock.mock(`/api/internal/login`, "post", () => {
  return login.userInfo;
});

//index
mock.mock(`/api/index/mapMarkers`, "get", () => {
  return index.mapMarkers;
});
//internetServer
mock.mock(`/api/network-servers`, "get", () => {
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

//gateway
mock.mock(`/admin/gateway/data`, "post", () => {
  return gateway.GatewayData;
});
mock.mock(`/api/gateways`, "post", () => {
  return gateway.GatewayDetailData;
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
mock.mock(`/api/api/nodes`, "post", () => {
  return node.nodeDetailData;
});
mock.mock(`/admin/gateway/nlogFlow/data`, "post", () => {
  return node.NlogFlowData;
});
mock.mock(`/admin/node/firstData`, "post", () => {
  return node.FirstPageNodeData;
});
//app
mock.mock(`/api/applications`, "get", () => {
  return app.AppData;
});
mock.mock(`/admin/app/details`, "post", () => {
  return app.AppDetailsData;
});
mock.mock(`/admin/app/details`, "put", () => {
  return app.AppDetailsData;
});
mock.mock(`/api/applications`, "post", () => {
  return app.AppDetailsData;
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
