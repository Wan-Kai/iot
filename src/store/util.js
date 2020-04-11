const state = {
  mock: false,
  netServer: [],
  area_options: [
    {
      value: "hubei",
      label: "湖北省",
      children: [
        {
          value: "wuhan",
          label: "武汉市",
          children: [
            {
              value: "hongshan",
              label: "洪山区"
            },
            {
              value: "jiangan",
              label: "江岸区"
            },
            {
              value: "jianghan",
              label: "江汉区"
            },
            {
              value: "qiaokou",
              label: "硚口区"
            },
            {
              value: "hanyang",
              label: "汉阳区"
            },
            {
              value: "wuchang",
              label: "武昌区"
            },
            {
              value: "qingshan",
              label: "青山区"
            },
            {
              value: "caidian",
              label: "蔡甸区"
            },
            {
              value: "jiangxia",
              label: "江夏区"
            },
            {
              value: "huangpo",
              label: "黄陂区"
            },
            {
              value: "xinzhou",
              label: "新洲区"
            },
            {
              value: "dongxihu",
              label: "东西湖区"
            },
            {
              value: "hannan",
              label: "汉南区"
            }
          ]
        }
      ]
    }
  ],
  timeInterval: "" //最后心跳时间与现在时间相比大于此时间值t，既认为是离线
};

const getters = {};

const actions = {};

const mutations = {
  setNetServer(state, data) {
    //设置参数
    state.netServer = data;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
