<!-- eslint-disable vue/valid-v-bind -->
<!-- 表格组件 -->
<template>
  <div>
    <el-table-column
      v-if="!img"
      :prop="label"
      :label="title"
      :type="type"
      :index="indexmethod"
      ><slot />
      <!-- <template slot-scope="scope" @click="list(scope.row)"></template> -->
    </el-table-column>
    <el-table-column
      v-if="img"
      :prop="label"
      :label="title"
      :type="type"
      :index="indexmethod"
    >
      <template slot-scope="scope">
        <el-image
          style="width: 30px; height: 30px"
          :src="scope.row.skuImage"
        />
      </template>
    </el-table-column>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    // eslint-disable-next-line vue/require-default-prop
    title: {
      type: String,
      required: false,
    },
    // eslint-disable-next-line vue/require-default-prop
    label: {
      type: String,
      required: false,
    },
    // eslint-disable-next-line vue/require-default-prop
    type: {
      type: String,
      required: false,
    },
    // eslint-disable-next-line vue/require-default-prop
    pag: {
      type: String,
    },
    img: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  methods: {
    indexmethod(index) {
      return this.pag + index - 9;
    },
  },
};
</script>
<style scoped></style>
