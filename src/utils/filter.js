import Vue from "vue";

// 节点的部署状态
Vue.filter("nodeState", val => {
  switch (val) {
    case "0000000000000000":
      return "未部署";
    default:
      return "已部署";
  }
});

//角色
Vue.filter("roleName", val => {
  if (val) return "管理员";
  else return "一般用户";
});
