<template>
  <a-layout style="background: #fff;padding: 0 14px 0;min-height: fit-content">
    <div class="iot_view_top">
      <a-input-search
        class="iot_view_top_search"
        placeholder="请输入要查找的企业"
      />
      <a-button
        class="iot_view_top_add"
        type="primary"
        icon="plus"
        @click="addOrganization"
        >添加企业</a-button
      >
    </div>
    <div class="iot_view_table_layout">
      <a-table
        :columns="columns"
        :dataSource="tableData"
        style="min-width: auto"
        class="iot_view_table"
        :pagination="pagination"
        :rowKey="record => record.uid"
        :loading="tableLoadingState"
      >
        //style="min-width: min-content" :scroll="{ x: min-content, y:
        min-content }"
        <span slot="location" slot-scope="text, record">
          {{ record.location + "/" + record.address }}
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
          <!--
          <a-divider type="vertical" />
          <a @click="deleteOrganization(record)">删除</a>
          -->
        </span>
      </a-table>
    </div>

    <a-modal
      title="删除"
      :visible="isShowModal"
      @ok="handleDeleteOk"
      :confirmLoading="confirmLoading"
      @cancel="handleDeleteCancel"
      :content="modalText"
    ></a-modal>
  </a-layout>
</template>

<script>
import {
  getAreaLabel,
  getCurrentOrganizations,
  initOrganizations
} from "@/utils/util";
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
          location: "",
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
      },

      isShowModal: false,
      modalText: "",
      confirmLoading: false
    };
  },
  beforeMount() {
    this.getTable();
  },
  computed: {
    getLocation(currentRecord) {
      return getAreaLabel(
        currentRecord.province,
        currentRecord.city,
        currentRecord.district
      );
    }
  },
  methods: {
    getTable() {
      this.$api.organization
        .getOrganizations({
          limit: 100
        })
        .then(res => {
          this.returnedData = res.data.result;

          var currentOrganizations = getCurrentOrganizations();
          if (currentOrganizations == null || currentOrganizations.length == 0)
            return;

          for (let i = 0; i < this.returnedData.length; i++) {
            var existed = false;
            var id = this.returnedData[i].id;
            for (let j = 0; j < currentOrganizations.length; j++) {
              if (currentOrganizations[j].organizationID === id) {
                existed = true;
                break;
              }
            }
            if (existed == false) continue;

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
            temp.location = getAreaLabel(
              this.returnedData[i].province,
              this.returnedData[i].city,
              this.returnedData[i].district
            );
            temp.canHaveGateways = this.returnedData[i].canHaveGateways;
            temp.createdAt = this.returnedData[i].createdAt;
            temp.updatedAt = this.returnedData[i].updatedAt;
            this.tableData.push(temp);
          }
          this.tableLoadingState = false;
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.tableLoadingState = false;
        });
    },
    addOrganization() {
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
    },

    deleteOrganization(currentRecord) {
      this.isShowModal = true;
      this.modalText = "删除【" + currentRecord.name + "】";
    },

    handleDeleteOk(e) {
      debugger;
      this.confirmLoading = true;
      this.$api.organization
        .deleteOrganization({
          extra: e.target.id
        })
        .then(res => {
          if (res.status === 200) {
            this.confirmLoading = false;
            this.$message.success("成功删除组织机构");

            initOrganizations();

            setTimeout(() => {
              this.$router.push({
                name: "organizationInit"
              });
            }, 100);
          } else {
            this.$message.error(res.data.code);
            this.$message.error(res.data.error);
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error("删除组织机构失败");
        })
        .finally(() => {
          this.confirmLoading = false;
        });
    },

    handleDeleteCancel(e) {
      this.isShowModal = false;
    }
  }
};
</script>

<style>
/*.ant-input {*/
/*  height: 30px;*/
/*  line-height: 28px;*/
/*}*/
.iot_view_top_search {
  float: left;
  width: 300px;
  text-align: left;
}
.iot_view_top_add {
  float: right;
}
.iot_view_top {
  width: 100%;
  margin-top: 14px;
  margin-bottom: 14px;
}
.iot_view_top_button_text {
  color: white;
}
.iot_view_table_layout {
  min-height: fit-content;
}
.iot_view_table {
  font-size: 10px;
  line-height: 8px;
}
.ant-table-thead > tr > th,
.ant-table-tbody > tr > td {
  padding: 8px 8px;
}
</style>
