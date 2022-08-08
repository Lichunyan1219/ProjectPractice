<!--搜索框组件  -->
<template>
<<<<<<< HEAD
  <el-form-item :label="title">
    <el-input
      v-model="input"
      placeholder="请输入"
      :clearable="true"
      :maxlength="number"
      show-word-limit
    />
=======
  <el-form-item :prop="prop" :label="title">
    <el-input v-model="input" placeholder="请输入" :clearable="true" :maxlength="maxlength" show-word-limit />
>>>>>>> caf07fb82de3fa30e866b7b799b7ff3ef9ab3336
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
<<<<<<< HEAD
      default: "",
    },
    number:{
      type:String,
      default:''
=======
      default: ''
    },
    maxlength: {
      type: String,
      default: ''
    },
    // eslint-disable-next-line vue/require-default-prop
    prop: {
      type: Array
>>>>>>> caf07fb82de3fa30e866b7b799b7ff3ef9ab3336
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
