import Mock from "mockjs";

const mapMarkers = Mock.mock({
  status: "OK",
  totalCount: "2",
  "result|1": [
    {
      zoom: 14,
      center: [114.362272, 30.532565],
      markers: [
        {
          X: 114.362272,
          Y: 30.532565
        },
        {
          X: 114.462273,
          Y: 30.532565
        }
      ]
    }
  ]
});

export { mapMarkers };
