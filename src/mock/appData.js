import Mock from "mockjs";

const AppData = Mock.mock({
  status: "OK",
  totalCount: "1",
  "result|20": [
    {
      id: "0047SDA4DSA",
      name: "测试",
      capacity: "80",
      usedCapacity: "40",
      description: "设备测试",
      time: "@date('yyyy-MM-dd HH:mm:ss')"
    }
  ]
});

const AppDetailData = Mock.mock({
  status: "OK",
  totalCount: "1",
  appDetail: [
    {
      appNumber: "0047SDA4DSA",
      appName: "测试",
      capacity: "80",
      usedCapacity: "40",
      description: "设备测试",
      time: "@date('yyyy-MM-dd HH:mm:ss')"
    }
  ]
});

const AppDetailsData = Mock.mock({
  status: "OK",
  totalCount: "1",
  "result|1": [
    {
      appName: "lora",
      capacity: "temp",
      usedCapacity: "temp",
      time: "2020-01-20 09:44:16",
      description: "描述内容描述内容描述内容描述内容描述内容描述内容描述内容"
    }
  ]
});

const AppNodeData = Mock.mock({
  status: "OK",
  totalCount: "1",
  "result|20": [
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

export { AppData, AppDetailData, AppNodeData, AppDetailsData };
