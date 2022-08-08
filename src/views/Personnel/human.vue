<!-- 人效统计 -->
<template>
  <div class="app-main">
    <div class="app-main-operation">
      <div class="app-main-operation-1 app-operatin">1111</div>
      <div class="app-main-operation-1 app-ation">1111</div>
    </div>

    <div>
      <div>1111</div>
      <div>1111</div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  methods: {},
};
</script>
<style scoped lang="scss">
.app-main {
  /* background-color: rgb(204, 28, 28); */
  padding: 20px;
  .app-main-operation {
    margin-left: -10px;
    margin-right: -10px;
    background-color: rgb(20, 16, 16);
    display: flex;
    .app-main-operation-1 {
      padding-left: 10px;
      padding-right: 10px;
      background-color: rgb(107, 32, 32);
      width: 50%;
    }
    .app-operatin{
      padding-left: 10px;
      padding-right: 10px;
    }
  }
}
</style>
