<template>
  <el-dialog width="80%" :visible="visible" title="编辑人员" @close="onClose">
    <div class="personal-information">
      <div class="personal-details">
        <div class="csose1">
          <div class="csose">人员名称：small</div>
          <div class="csose">角色：博文</div>
          <div class="csose">联系电话：123456789</div>
        </div>
        <div class="csose3">负责区域：阿萨德</div>
      </div>

      <!-- 列表 -->
      <el-table style="width: 100%" :lazy="true" type="index">
        <Tablecolumn title="人员名称" />
        <Tablecolumn title="" />
        <Tablecolumn title="人员名称" />
        <Tablecolumn title="人员名称" />
        <Tablecolumn title="人员名称" />
      </el-table>
    </div>
  </el-dialog>
</template>

<script>
import Tablecolumn from '@/components/tablecolumn' // 列表
export default {

  components: {
    Tablecolumn
  },

  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {}
  },

  created() {},

  methods: {
    onClose() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style scoped lang="scss">
.personal-information {
  background-color: rgb(248, 0, 0);
  padding: 20px 20px 30px;
  color: #666;
  font-size: 14px;
  word-break: break-all;
  width: 90%;
  min-height: 277px;
  margin: 0px auto;

  .personal-details {
    height: 86px;
    padding: 19px 19px 0;
    background: #f3f6fb;

    .csose1 {
      display: flex;
      .csose {
        width: 37.5%;
      }
    }
    .csose3 {
      width: 100%;
      margin-top: 15px;
    }
  }
  .Tablecolumn {
    border-right: 1px solid #d8dde3;
  }
}
</style>
