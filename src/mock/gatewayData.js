import Mock from "mockjs";

const GatewayData = Mock.mock({
  status: "OK",
  type: "ID",
  GatewayDataSize: 4,
  "gatewayTableData|4": [
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

export { GatewayData };
