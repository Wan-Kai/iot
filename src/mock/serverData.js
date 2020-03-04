import Mock from "mockjs";

const ServerData = Mock.mock({
  status: "OK",
  type: "ID",
  ServerDataSize: 6,
  "serverData|6": [
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
  "message|6": [
    {
      title: "@title",
      time: "@date('yyyy-MM-dd HH:mm:ss')"
    }
  ]
});

export { ServerData, Message };
