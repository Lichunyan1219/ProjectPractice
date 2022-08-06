<!-- 留言框组件 -->
<template>
  <div>
    <el-form-item label="备注">
      <el-input v-model="input" type="textarea" />
    </el-form-item></div>
</template>

<script>

export default {
  components: {},
  props: {
    model: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      input: ''
    }
  },
  computed: {},
  watch: {
    input: {
      handler(a, b) {
        this.$emit('update:model', a)
      }
    }
  },
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
