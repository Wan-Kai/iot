import Mock from "mockjs";

const UsersData = Mock.mock({
  status: "OK",
  totalCount: "1",
  "result|20": [
    {
      phoneNumber: "110",
      name: "张三",
      email: "@email",
      unit: "武汉卓目科技",
      description: "设备测试",
      "role|1": ["超级管理员", "普通用户"],
      time: "@date('yyyy-MM-dd HH:mm:ss')"
    }
  ]
});

export { UsersData };
