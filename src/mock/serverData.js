import Mock from "mockjs";

const ServerData = Mock.mock({
  status: "OK",
  type: "ID",
  ServerDataSize: 8,
  "serverData|8": [
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
  MessageSize: 6,
  "message|30": [
    {
      title: "@title",
      time: "@date('yyyy-MM-dd HH:mm:ss')"
    }
  ]
});

const Check = Mock.mock({
  status: "OK",
  type: "",
  check: [
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
  type: "",
  messageDetail: [
    {
      title: "@title",
      time: "@date('yyyy-MM-dd HH:mm:ss')",
      content: "@name"
    }
  ]
});

export { ServerData, Message, Check, Message_Detail };
