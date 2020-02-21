import mock from "mockjs";
import * as serverData from "./serverData";

mock.mock(`/admin/server/data`, "post", () => {
  return serverData.ServerData;
});
