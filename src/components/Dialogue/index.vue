<!-- 弹出框组件 -->
<template>
  <div>
    <el-dialog
      :title="title"
      :visible="visible"
      width="50%"
      :before-close="handleClose"
    ><slot /></el-dialog>
  </div>
</template>

<script>

export default {
  components: {},
  props: {
    title: {
      type: String,
      required: true
    },
    visible: {
      type: Boolean,
      required: true
    }
  },
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
    handleClose() {
      this.$emit('update:visible', false)
    }
  }
}
</script>
<style scoped>

</style>
