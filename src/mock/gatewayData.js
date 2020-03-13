import Mock from "mockjs";

const GatewayData = Mock.mock({
  status: "OK",
  type: "ID",
  GatewayDataSize: 4,
  "gatewayTableData|20": [
    {
      number: "@id",
      name: "Lora",
      id: "@id",
      server: "服务器1",
      band: "CN-470/CH-00-07",
      "state|1": ["on", "off"],
      up: "",
      down: "",
      area: "湖北省/武汉市/洪山区"
    }
  ]
});

const IlogFlowData = Mock.mock({
  status: "OK",
  type: "nodeId",
  "ilogData|20": [
    {
      gatewayId: "B45sadsa45",
      heartTime: "@date('yyyy-MM-dd HH:mm:ss')",
      period: "30",
      delayTime: "38",
      type: "heartbeat",
      gatewayTime: "@date('yyyy-MM-dd HH:mm:ss')" + " CST",
      radioFrame: "4",
      rightBagNumber: "4",
      transportBagNumber: "4",
      downBagNumber: "4",
      transportSusBagNumber: "4"
    }
  ]
});

const GatewayMapData = Mock.mock({
  status: "OK",
  type: "nodeId",
  "gatewayMapData|20": [
    {
      number: "B481FD4566f65465FD"
    }
  ]
});

export { GatewayData, IlogFlowData, GatewayMapData };
