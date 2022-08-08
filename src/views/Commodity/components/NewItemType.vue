<!--  -->
<template>
  <div>
    <el-form ref="fromData" :model="fromData" class="el-input" label-width="80px" label-position="left" :rules="formRules">
      <el-input
        v-model="text"
        type="text"
        placeholder="请输入"
        maxlength="15"
        show-word-limit
      />
    </el-form>
  </div>
</template>

<script>

export default {
  components: {},
  data() {
    return {

    }
  },
  computed: {},
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {

  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {

  },
  methods: {

  }
}
</script>
<style scoped>

</style>
