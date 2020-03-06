<template>
  <a-card
    class="retrieveForm"
    :style="{
      padding: 0
    }"
  >
    <div class="iot_retrieve_layout_text">
      <a class="iot_retrieve_layout_text_content">找回密码</a>
    </div>

    <a-steps :current="current" size="small" style="margin-left: -5%">
      <a-step title="验证账号" />
      <a-step title="重设密码" style="margin-left: -4%;margin-right: 5%" />
      <a-step title="重设成功" />
    </a-steps>

    <router-view :name="getStepName()" class="iot_retrieve_step_router" />

    <div class="iot_retrieve_steps-action">
      <a-button v-if="current < steps.length - 1" type="primary" @click="next">
        下一步
      </a-button>
      <a-button
        v-if="current == steps.length - 1"
        type="primary"
        @click="successSubmit"
      >
        完成
      </a-button>
      <!--      <a-button v-if="current > 0" style="margin-left: 8px" @click="prev">-->
      <!--        上一步-->
      <!--      </a-button>-->
    </div>
  </a-card>
</template>

<script>
export default {
  data() {
    return {
      current: 0,
      steps: [
        {
          title: "First",
          content: "SecondStep"
        },
        {
          title: "Second",
          content: "SecondStep"
        },
        {
          title: "Last",
          content: "ThirdStep"
        }
      ]
    };
  },
  methods: {
    next() {
      if (this.current === 0) {
        let note = this.$store.getters.getRetrieveNote;
        if (note.note === "888888") {
          this.current++;
        } else {
          this.$message.error("请输入验证码： 888888 (六个8)");
        }
      } else if (this.current === 1) {
        if (this.$store.getters.getStep2State) {
          this.current++;
        } else {
          this.$message.error("请求错误，请检查是否填写相应数据");
        }
      } else {
        this.current = 0;
      }
    },
    prev() {
      if (this.current > 0) this.current--;
    },
    getStepName() {
      if (this.current === 1) {
        return "step2";
      } else if (this.current === 2) {
        return "step3";
      } else {
        return "step1";
      }
    },
    successSubmit() {
      this.$message.success("请重新登录");
      this.$router.push("/user/login");
    }
  },
  components: {}
};
</script>

<style scoped>
.retrieveForm {
  margin: auto;
  width: 30%;
  height: 340px;
}
.iot_retrieve_content {
  margin-top: 30px;
  margin-bottom: 12px;
  text-align: center;
}
.iot_retrieve_layout_text {
  height: 40px;
  text-align: center;
  color: black;
  font-size: 20px;
  margin-bottom: 8px;
}
.iot_retrieve_layout_text_content {
  color: black;
  letter-spacing: 2px;
}
.iot_retrieve_step_router {
  margin-top: 10px;
  margin-right: 10%;
  margin-left: 10%;
}
.steps-content {
  min-height: 100px;
}
</style>
