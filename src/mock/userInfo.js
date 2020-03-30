import Mock from "mockjs";

const userInfo = Mock.mock({
  status: "OK",
  totalCount: "1",
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
