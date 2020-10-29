import Mock from "mockjs";

const mapMarkers = Mock.mock({
  status: "OK",
  totalCount: "2",
  "result|1": [
    {
      zoom: 5,
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

const message = Mock.mock({
  status: "OK",
  "result|1": [
    {
      list: [
        {
          title: "编号",
          time: "1min",
          read: true
        },
        {
          title: "编号",
          time: "2min",
          read: true
        },
        {
          title: "编号",
          time: "3min",
          read: false
        },
        {
          title: "编号",
          time: "4min",
          read: true
        },
        {
          title: "编号",
          time: "5min",
          read: true
        },
        {
          title: "编号",
          time: "6min",
          read: false
        }
      ]
    }
  ]
});

export { mapMarkers, message };
