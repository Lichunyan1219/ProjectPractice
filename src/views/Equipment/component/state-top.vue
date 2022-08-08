<template>
  <div class="top">
    <el-card class="box-card">
      <el-form ref="form" label-width="80px" :inline="true">
        <el-form-item :label="label">
          <el-input
            style="width: 206px"
            placeholder="请输入"
            v-model="code"
          ></el-input>
        </el-form-item>
        <Button
          class="query-btn"
          icon="el-icon-search"
          title="查询"
          color="#5f84ff"
          @click="query"
        ></Button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import Button from "@/components/ls-button";
export default {
  props: {
    label: {
      type: String,
    },
  },
  components: {
    Button,
  },
  data() {
    return {
      code: "",
    };
  },

  created() {},

  methods: {
    query() {
      this.$emit("click", this.code);
    },
  },
};
</script>

<style scoped lang="scss">
.top {
  padding: 20px;
  .box-card {
    .query-btn {
      margin-left: 5px;
    }
  }
}
</style>
