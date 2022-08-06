<!-- 选择框组件 -->
<template>
  <el-form-item :label="title">
    <el-select v-model.trim="input" filterable placeholder="请选择" :clearable="true" style="width:100%">
      <el-option
        v-for="item in work"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      />
    </el-select>
  </el-form-item>
</template>
<script>
export default {
  components: {},
  props: {
    work: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    // eslint-disable-next-line vue/require-prop-types
    model: {
      default: ''
    }
  },
  data() {
    return {
      value: '',
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
