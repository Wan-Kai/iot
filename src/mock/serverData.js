import Mock from "mockjs";

const ServerData = Mock.mock({
  status: "OK",
  type: "ID",
  totalCount: "8",
  "result|8": [
    {
      ID: "@ip",
      "port|0-10000": 1,
      "gateway|1": ["on", "off"],
      time: "@date('yyyy-MM-dd HH:mm:ss')"
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

export { ServerData, Message, Check, Message_Detail, Deleted_Message };
