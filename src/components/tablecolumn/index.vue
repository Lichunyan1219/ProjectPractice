<!-- eslint-disable vue/valid-v-bind -->
<!-- 表格组件 -->
<template>
  <div>
    <el-table-column
<<<<<<< HEAD
=======
      v-if="!img"
>>>>>>> caf07fb82de3fa30e866b7b799b7ff3ef9ab3336
      :prop="label"
      :label="title"
      :type="type"
      :index="indexmethod"
<<<<<<< HEAD
      ><slot />
      <!-- <template slot-scope="scope" @click="list(scope.row)"></template> -->
=======
    >
      <slot />
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
>>>>>>> caf07fb82de3fa30e866b7b799b7ff3ef9ab3336
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
<<<<<<< HEAD
      required: true,
=======
      required: false
>>>>>>> caf07fb82de3fa30e866b7b799b7ff3ef9ab3336
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
<<<<<<< HEAD
      type: String,
    },
=======
      type: String
    },
    img: {
      type: Boolean,
      default: false
    }
>>>>>>> caf07fb82de3fa30e866b7b799b7ff3ef9ab3336
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
