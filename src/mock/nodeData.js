import Mock from "mockjs";

const NodeData = Mock.mock({
  status: "OK",
  type: "ID",
  "nodeData|20": [
    {
      DevEUI: "0047SDA4545DSA",
      nodeName: "Lora",
      dBm: "-60",
      frequency: "CN470/CH_00_07",
      class: "B",
      "state|1": ["on", "off"],
      AppEUI: "2C515CGSDFD54564",
      "type|1": ["研发测试", "销售"],
      time: "@date('yyyy-MM-dd HH:mm:ss')"
    }
  ]
});

const FirstPageNodeData = Mock.mock({
  status: "OK",
  type: "ID",
  "firstPageNodeData|5": [
    {
      nodeNumber: "8808",
      upTime: "@date('yyyy-MM-dd HH:mm:ss')"
    }
  ]
});

const NlogFlowData = Mock.mock({
  status: "OK",
  type: "nodeId",
  "nlogData|20": [
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

export { NodeData, NlogFlowData, FirstPageNodeData };
