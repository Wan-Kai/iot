import Mock from "mockjs";

const AppData = Mock.mock({
  status: "OK",
  type: "ID",
  "appData|20": [
    {
      appNumber: "0047SDA4DSA",
      appName: "测试",
      capacity: "80",
      usedCapacity: "40",
      describe: "设备测试",
      time: "@date('yyyy-MM-dd HH:mm:ss')"
    }
  ]
});

const AppDetailData = Mock.mock({
  status: "OK",
  type: "",
  appDetail: [
    {
      appNumber: "0047SDA4DSA",
      appName: "测试",
      capacity: "80",
      usedCapacity: "40",
      describe: "设备测试",
      time: "@date('yyyy-MM-dd HH:mm:ss')"
    }
  ]
});

const AppNodeData = Mock.mock({
  status: "OK",
  type: "",
  "appNodeData|20": [
    {
      DevEUI: "0047SDA4DSA",
      nodeName: "测试",
      "state|1": ["on", "off"],
      signal: "40",
      heartTime: "@date('yyyy-MM-dd HH:mm:ss')",
      time: "@date('yyyy-MM-dd HH:mm:ss')"
    }
  ]
});

export { AppData, AppDetailData, AppNodeData };
