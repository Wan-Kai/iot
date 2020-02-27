import Mock from "mockjs";

const userInfo = Mock.mock({
  status: "OK",
  type: "ID",
  admin: [
    {
      username: "test",
      isLogin: "in",
      sessionKey: "admin",
      userId: "admin"
    }
  ]
});

export { userInfo };
