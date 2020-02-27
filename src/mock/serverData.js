import Mock from "mockjs";

const ServerData = Mock.mock({
  status: "OK",
  type: "ID",
  ServerDataSize: 10,
  "serverData|5-10": [
    {
      ID: "@ip",
      "port|0-10000": 1,
      "gateway|1": ["on", "off"],
      time: "@date('yyyy-MM-dd HH:mm:ss')"
    }
  ]
});

export { ServerData };
