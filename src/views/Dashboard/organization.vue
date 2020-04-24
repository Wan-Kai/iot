<template>
  <a-layout style="background: #fff;padding: 0 14px 0;min-height: fit-content">
    <div class="iot_view_internetServer_top">
      <a-input-search
        class="iot_view_internetServer_top_search"
        placeholder="请输入要查找的企业"
      />
      <a-button
        class="iot_view_internetServer_top_add"
        type="primary"
        icon="plus"
        @click="handleSubmit"
        >添加企业</a-button
      >
    </div>
    <div class="iot_view_internetServer_table_layout">
      <a-table
        :columns="columns"
        :dataSource="tableData"
        style="min-width: auto"
        class="iot_view_internetServer_table"
        :pagination="pagination"
        :rowKey="record => record.uid"
        :key="record => record.uid"
        :loading="tableLoadingState"
      >
        //style="min-width: min-content" :scroll="{ x: min-content, y:
        min-content }"
        <span slot="location" slot-scope="text, record">
          {{
            record.province +
              "/" +
              record.city +
              "/" +
              record.district +
              "/" +
              record.address
          }}
        </span>
        <span slot="canHaveGateways" slot-scope="canHaveGateways">
          <a-tag
            :color="canHaveGateways === true ? 'green' : 'red'"
            :key="canHaveGateways"
          >
            {{ canHaveGateways }}
          </a-tag>
        </span>
        <span slot="createdAt"> 创建时间</span>
        <span slot="action" slot-scope="text, record">
          <a @click="checkOrganization(record)">查看</a>
          <a-divider type="vertical" />
          <a @click="editOrganization(record)">编辑</a>
        </span>
      </a-table>
    </div>
  </a-layout>
</template>

<script>
const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id"
  },
  {
    title: "名称",
    dataIndex: "name",
    key: "name"
  },

  {
    title: "行业",
    dataIndex: "profession",
    key: "profession"
  },

  {
    title: "地址",
    dataIndex: "location",
    key: "location",
    scopedSlots: { customRender: "location" }
  },
  {
    title: "是否拥有网关",
    dataIndex: "canHaveGateways",
    key: "canHaveGateways",
    scopedSlots: { customRender: "canHaveGateways" }
  },
  {
    title: "创建时间",
    key: "createdAt",
    dataIndex: "createdAt"
  },
  {
    title: "管理",
    key: "action",
    scopedSlots: { customRender: "action" }
  }
];

export default {
  data() {
    return {
      columns,
      tableData: [],
      tableLoadingState: true,
      returnedData: [
        {
          id: "",
          name: "",
          displayName: "",
          profession: "",
          province: "",
          city: "",
          district: "",
          address: "",
          canHaveGateways: "",
          createdAt: "",
          updatedAt: ""
        }
      ],

      pagination: {
        size: "small",
        defaultPageSize: 5,
        showTotal: total => `共 ${total} 条数据`,
        buildOptionText(value) {
          return `${value.value} 条/页`;
        },
        showSizeChanger: true,
        pageSizeOptions: ["5", "10"],
        onShowSizeChange: (current, pageSize) => (this.pageSize = pageSize)
      }
    };
  },
  beforeMount() {
    this.$api.organization
      .getOrganizations({
        limit: 10
      })
      .then(res => {
        this.returnedData = res.data.result;

        for (let i = 0; i < this.returnedData.length; i++) {
          let temp = {
            id: "",
            name: "",
            displayName: "",
            profession: "",
            province: "",
            city: "",
            district: "",
            address: "",
            canHaveGateways: "",
            createdAt: "",
            updatedAt: ""
          };
          temp.id = this.returnedData[i].id;
          temp.name = this.returnedData[i].name;
          temp.displayName = this.returnedData[i].displayName;
          temp.profession = this.returnedData[i].profession;
          temp.province = this.returnedData[i].province;
          temp.city = this.returnedData[i].city;
          temp.district = this.returnedData[i].district;
          temp.address = this.returnedData[i].address;
          temp.canHaveGateways = this.returnedData[i].canHaveGateways;
          temp.createdAt = this.returnedData[i].createdAt;
          temp.updatedAt = this.returnedData[i].updatedAt;
          this.tableData.push(temp);
        }
        this.tableLoadingState = false;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    handleSubmit() {
      setTimeout(() => {
        this.$router.push("/admin/dashboard/organization/addOrganization");
      }, 100);
    },
    checkOrganization(currentRecord) {
      this.$router.push({
        name: "checkOrganization",
        query: {
          id: currentRecord["id"]
        }
      });
    },
    editOrganization(currentRecord) {
      this.$router.push({
        name: "editOrganization",
        query: {
          id: currentRecord["id"]
        }
      });
    }
  }
};
</script>

<style>
/*.ant-input {*/
/*  height: 30px;*/
/*  line-height: 28px;*/
/*}*/
.iot_view_internetServer_top_search {
  float: left;
  width: 300px;
  text-align: left;
}
.iot_view_internetServer_top_add {
  float: right;
}
.iot_view_internetServer_top {
  width: 100%;
  margin-top: 14px;
  margin-bottom: 14px;
}
.iot_view_internetServer_top_button_text {
  color: white;
}
.iot_view_internetServer_table_layout {
  min-height: fit-content;
}
.iot_view_internetServer_table {
  font-size: 10px;
  line-height: 8px;
}
.ant-table-thead > tr > th,
.ant-table-tbody > tr > td {
  padding: 8px 8px;
}
</style>
