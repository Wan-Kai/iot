import Mock from "mockjs";

const NodeData = Mock.mock({
  status: "OK",
  totalCount: "1",
  "result|20": [
    {
      id: "0047SDA4545DSA",
      name: "Lora",
      description: "-60",
      server: "wwww",
      macVersion: "temp",
      "supportsJoin|1": ["true", "false"],
      "type|1": ["研发测试", "销售"],
      createdAt: "@date('yyyy-MM-dd HH:mm:ss')"
    }
  ]
});

const nodeDetailData = Mock.mock({
  status: "OK",
  totalCount: "1",
  "result|1": [
    {
      internalState: "在线",
      sign: "30",
      gateway: "123456",
      heartTime: "2017-1-17",

      number: "temp",
      appNumber: "temp",
      name: "temp",
      getIntelWay: "temp",
      version: "temp",
      band: "temp",
      class: "temp",
      appKey: "temp",
      utroTime: "temp",
      useState: "temp",
      addTime: "temp",
      area: "temp",
      description: "temp",

      zoom: 14,
      center: [114.362272, 30.532565]
    }
  ]
});

const FirstPageNodeData = Mock.mock({
  status: "OK",
  totalCount: "1",
  "result|10": [
    {
      nodeNumber: "8808",
      upTime: "@date('yyyy-MM-dd HH:mm:ss')"
    }
  ]
});

const NlogFlowData = Mock.mock({
  status: "OK",
  totalCount: "1",
  "result|20": [
    {
      nodeId: "B45sadsa45",
      checkTime: "@date('yyyy-MM-dd HH:mm:ss')",
      appId: "@id",
      deviceNum: "0078110",
      data: "0101s54sda54fw56",
      upIndex: "215",
      downIndex: "203",
      frequency: "472.3",
      timer: "41841285",
      channel: "4",
      crc: "正确",
      type: "data",
      time: "@date('yyyy-MM-dd HH:mm:ss')"
    }
  ]
});

export { NodeData, NlogFlowData, FirstPageNodeData, nodeDetailData };
