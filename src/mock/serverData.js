import Mock from "mockjs";

const ServerData = Mock.mock({
  status: "OK",
  type: "ID",
  totalCount: "8",
  "result|10": [
    {
      id: "24",
      name: "test1--",
      server: "127.0.0.1:8000",
      createdAt: "2020-04-01T11:26:58.287409Z",
      updatedAt: "2020-04-01T11:28:07.176773Z"
    }
  ]
});

const ServerManageData = Mock.mock({
  status: "OK",
  type: "ID",
  totalCount: "8",
  "result|8": [
    {
      name: "编号85156SD545daW节点掉线",
      company: "卓目科技",
      createdAt: "2020-04-01T11:26:58.287409Z"
    }
  ]
});

const Message = Mock.mock({
  status: "OK",
  type: "",
  totalCount: "30",
  "result|30": [
    {
      title: "@title",
      time: "@date('yyyy-MM-dd HH:mm:ss')"
    }
  ]
});

const Deleted_Message = Mock.mock({
  status: "OK",
  type: "",
  totalCount: "30",
  "result|30": [
    {
      title: "@title",
      time: "@date('yyyy-MM-dd HH:mm:ss')"
    }
  ]
});

const Check = Mock.mock({
  status: "OK",
  totalCount: "1",
  "result|1": [
    {
      "port|0-10000": 1,
      "gateway|1": ["on", "off"],
      time: "@date('yyyy-MM-dd HH:mm:ss')",
      otherData: "@name"
    }
  ]
});

const Message_Detail = Mock.mock({
  status: "OK",
  totalCount: "1",
  messageDetail: [
    {
      title: "@title",
      time: "@date('yyyy-MM-dd HH:mm:ss')",
      content: "@name"
    }
  ]
});

export {
  ServerData,
  Message,
  Check,
  Message_Detail,
  Deleted_Message,
  ServerManageData
};
