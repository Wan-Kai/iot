import mock from "mockjs";
import * as serverData from "./serverData";
import * as login from "./userInfo";
import * as gateway from "./gatewayData";
import * as node from "./nodeData";
import * as app from "./appData";
import * as users from "./usersData";
import * as index from "./index";

function getParams(url, paramName) {
  let paramString = url.toString().split("?")[1];
  paramString = paramString + "&extra=null";
  let params = paramString.split("&");
  for (let i = 0; i < params.length; i++) {
    let paramItem = params[i].split("=");
    if (paramItem[0] === paramName) {
      return paramItem[1];
    }
  }
}
// mock.mock(`/api/internal/login`, "post", () => {
//   return login.userInfo;
// });
//index
mock.mock(RegExp(`/api/index/mapMarkers` + ".*"), "get", () => {
  return index.mapMarkers;
});
mock.mock(RegExp(`/api/index/message` + ".*"), "get", () => {
  return index.message;
});
//internetServer
// mock.mock(RegExp(`/api/network-servers` + ".*"), "get", (options) => {
//   let limit = getParams(options.url,"limit");
//   let mockMsg = {
//     "totalCount": limit,
//     "result": [
//       {
//         id: "30",
//         name: "test1--",
//         server: "127.0.0.1:8000",
//         createdAt: "2020-04-01T11:26:58.287409Z",
//         updatedAt: "2020-04-01T11:28:07.176773Z",
//         port: "8000",
//         gateway: "on",
//         time: "2017-12.12",
//         otherData: "其他"
//       }
//     ]
//   };
//   // 根据请求参数传入指定数量的数据
//   for (let i = 1; i < limit; i++) {
//     mockMsg.result.push({
//       id: "30",
//       name: "test1--",
//       server: "127.0.0.1:8000",
//       createdAt: "2020-04-01T11:26:58.287409Z",
//       updatedAt: "2020-04-01T11:28:07.176773Z",
//       port: "8000",
//       gateway: "on",
//       date: "2017-12.12",
//       otherData: "其他"
//     });
//   }
//   return mock.mock(mockMsg);
// });
mock.mock(`/api/admin/server/message`, "post", () => {
  return serverData.Message;
});
// mock.mock(`/api/admin/server/check`, "post", () => {
//   return serverData.Check;
// });
//message
mock.mock(`/api/admin/server/message/detail`, "post", () => {
  return serverData.Message_Detail;
});
mock.mock(`/api/admin/server/message/delete`, "post", () => {
  return serverData.Deleted_Message;
});

// //gateway
// mock.mock(`/api/gateway`, "get", () => {
//   return gateway.GatewayData;
// });
// mock.mock(`/api/gateways`, "get", () => {
//   return gateway.GatewayDetailData;
// });
mock.mock(`/api/admin/gateway/ilogFlow/data`, "post", () => {
  return gateway.IlogFlowData;
});
mock.mock(`/api/admin/gateway/gatewayMap/data`, "post", () => {
  return gateway.GatewayMapData;
});

//node
mock.mock(`/api/admin/node/data`, "post", () => {
  return node.NodeData;
});
mock.mock(`/api/nodes`, "post", () => {
  return node.nodeDetailData;
});
mock.mock(`/api/admin/gateway/nlogFlow/data`, "post", () => {
  return node.NlogFlowData;
});
mock.mock(`/api/admin/node/firstData`, "post", () => {
  return node.FirstPageNodeData;
});
//app
mock.mock(RegExp(`/api/applications` + ".*"), "get", () => {
  return app.AppData;
});
mock.mock(`/api/admin/app/details`, "post", () => {
  return app.AppDetailsData;
});
mock.mock(`/api/admin/app/details`, "put", () => {
  return app.AppDetailsData;
});
mock.mock(`/api/applications`, "post", () => {
  return app.AppDetailsData;
});
mock.mock(`/api/admin/app/detail`, "post", () => {
  return app.AppDetailData;
});
mock.mock(`/api/admin/app/nodeData`, "post", () => {
  return app.AppNodeData;
});
//users
mock.mock(`/api/admin/users/data`, "post", () => {
  return users.UsersData;
});
