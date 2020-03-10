<template>
  <a-layout style="background: #fff;padding: 0 14px 0">
    <a-form
      :form="form"
      @submit="handleSubmit"
      layout="vertical"
      class="iot_view_internetServer_add_form"
    >
      <a-form-item
        label="名称："
        :required="true"
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 12 }"
        class="iot_view_internetServer_add_formItem"
      >
        <a-input
          v-decorator="['name']"
          style="width: 60%;float: left;height: 28px"
        />
      </a-form-item>
    </a-form>
  </a-layout>
</template>

<script>
export default {
  data() {},
  methods: {
    handleSubmit() {}
  }
};
</script>

<style scoped></style>
