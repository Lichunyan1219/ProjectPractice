<!-- 按钮组件 -->
<template>
  <el-button class="search" :class="color" :disabled="disable" type="primary" :icon="icon" @click.native="btn">{{ title }}</el-button>
</template>

<script>

export default {
  components: {},
  props: {
    color: { // 背景色
      type: String,
      default: 'search'
    },
    title: {
      type: String,
      default: '搜索'
    },
    icon: {
      type: String,
      default: 'icon'
    },
    disable: {
      type: Boolean,
      default: false
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
    btn() {
      this.$emit('click')
    }
  }
}
</script>
<style scoped>
.search{
  margin-left: 30px;
  border: unset;
}
.addBtn{
  background-color: #f97239;
  color: #fff;
}
.config{
  background-color: #fbf4f0;
  color: #333 !important;
}
.pag{
  background-color: #d5ddf8;
  color:#333 !important;
}
</style>
