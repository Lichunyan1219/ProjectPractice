<template>
  <!-- 策略选中弹出框 -->
  <Dialog title="策略管理" :visible.sync="visible2">
    <div class="content-text">
      <el-row>
        <el-col :span="12">
          <div class="text">机器编号：{{ machineTacticsName.innerCode }}</div>
        </el-col>
        <el-col :span="12">
          <div class="text">策略名称：{{ machineTacticsName.policyName }}</div>
        </el-col>
        <el-col :span="12">
          <div class="text">策略方案：{{ machineTacticsName.discount }}%</div>
        </el-col>
      </el-row>
    </div>
    <div class="bottom-btn">
      <Button color="config" title="取消策略" @click="cancelTactics"></Button>
    </div>
  </Dialog>
</template>

<script>
import Dialog from "@/components/Dialogue";
import Button from "@/components/ls-button";
import { cancelTacticsAPI } from "@/api/strategy";
export default {
  components: {
    Dialog,
    Button,
  },
  props: {
    dialogTactics: {
      type: Boolean,
      default: false,
    },
    machineTacticsName: {
      type: Object,
      default: {},
      // required: true,
    },
  },
  data() {
    return {
      checkTactics: "",
    };
  },
  created() {},
  methods: {
    async cancelTactics() {
      await cancelTacticsAPI(
        this.machineTacticsName.innerCode,
        this.machineTacticsName.policyId
      );
      this.$emit("canceltactic");
      this.visible2 = false;
      this.$message.success('取消策略成功')
    },
  },

  computed: {
    visible2: {
      get() {
        return this.dialogTactics;
      },
      set(val) {
        this.$emit("on-change", val);
      },
    },
  },
};
</script>

<style scoped lang="scss">
.content-text {
  padding: 10px 0 40px;
  .text {
    padding: 0 40px;
    margin-top: 15px;
  }
}
.bottom-btn {
  width: 25%;
  margin: 0 auto;
}
</style>
