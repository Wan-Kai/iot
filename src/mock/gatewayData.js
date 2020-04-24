import Mock from "mockjs";

const GatewayData = Mock.mock({
  status: "OK",
  totalCount: "1",
  "result|20": [
    {
      organizationID: "@id",
      name: "Lora",
      id: "@id",
      networkServerID: "服务器1",
      band: "CN-470/CH-00-07",
      "state|1": ["on", "off"],
      up: "",
      down: "",
      area: "湖北省/武汉市/洪山区"
    }
  ]
});

const GatewayDetailData = Mock.mock({
  status: "OK",
  totalCount: "1",
  "result|1": [
    {
      internalState: "在线",
      sign: "30",
      up: "12",
      down: "10",
      heartTime: "2017-1-17",

      number: "temp",
      name: "temp",
      id: "temp",
      internalServer: "temp",
      massageMode: "temp",
      band: "temp",
      state: "temp",
      single: "temp",
      addTime: "temp",
      location: "temp",
      height: "temp",
      area: "temp",
      description: "temp",

      zoom: 14,
      center: [114.362272, 30.532565]
    }
  ]
});

const GatewayDetailOtherData = Mock.mock({
  status: "OK",
  totalCount: "1",
  "result|1": [
    {
      internalState: "在线",
      sign: "30",
      up: "12",
      down: "10",
      heartTime: "2017-1-17",

      number: "temp",
      name: "temp",
      id: "temp",
      internalServer: "temp",
      massageMode: "temp",
      band: "temp",
      state: "temp",
      single: "temp",
      addTime: "temp",
      location: "temp",
      height: "temp",
      area: "temp",
      description: "temp"
    }
  ]
});

const IlogFlowData = Mock.mock({
  status: "OK",
  totalCount: "1",
  "result|20": [
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
  totalCount: "1",
  "result|20": [
    {
      id: "B481FD4566f65465FD"
    }
  ]
});

export {
  GatewayData,
  IlogFlowData,
  GatewayMapData,
  GatewayDetailData,
  GatewayDetailOtherData
};
