import Mock from "mockjs";

const userInfo = Mock.mock({
  status: "OK",
  totalCount: "1",
  admin: [
    {
      username: "admin",
      isLogin: "in",
      sessionKey: "admin",
      userId: "admin",
      jwt: ""
    }
  ]
});

export { userInfo };
