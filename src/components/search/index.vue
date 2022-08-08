<!--搜索框组件  -->
<template>
  <el-form-item :label="title">
    <el-input
      v-model="input"
      placeholder="请输入"
      :clearable="true"
      :maxlength="number"
      show-word-limit
    />
  </el-form-item>
</template>

<script>
export default {
  components: {},
  props: {
    title: {
      type: String,
      default: "",
    },
    model: {
      type: String,
      default: "",
    },
    number:{
      type:String,
      default:''
    }
  },
  data() {
    return {
      input: "",
    };
  },
  computed: {},
  watch: {
    input: {
      handler(a, b) {
        this.$emit("update:model", a);
      },
    },
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  methods: {},
};
</script>
<style scoped>
.search {
  display: flex;
  font-size: 14px;
  justify-content: center;
  align-items: center;
}
</style>
