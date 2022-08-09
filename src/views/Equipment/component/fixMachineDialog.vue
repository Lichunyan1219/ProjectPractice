<template>
  <div>
    <el-form ref="form" label-width="150px">
      <el-form-item label="机器编号">{{
        fixMachineInfo.innerCode
      }}</el-form-item>
      <el-form-item label="供货时间">{{
        fixMachineInfo.lastSupplyTime
      }}</el-form-item>
      <el-form-item label="设备类型">{{
        fixMachineInfo.type.name
      }}</el-form-item>
      <el-form-item label="设备容量">{{
        fixMachineInfo.type.channelMaxCapacity
      }}</el-form-item>
      <el-form-item label="设备点位">
        <el-select v-model="point" :placeholder="fixMachineInfo.node.name">
          <el-option
            v-for="item in fixPointInfo"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="合作商">{{ fixMachineInfo.ownerName }}</el-form-item>
      <el-form-item label="所属区域">{{
        fixMachineInfo.node.region.name
      }}</el-form-item>
      <el-form-item label="设备地址">{{
        fixMachineInfo.node.name
      }}</el-form-item>
    </el-form>
    <div class="bottom-btn">
      <Button color="config" title="取消" @click="callFix"></Button>
      <Button color="addBtn" title="确认" @click="addFix"></Button>
    </div>
  </div>
</template>

<script>
import Button from "@/components/ls-button";
export default {
  components: {
    Button,
  },
  props: {
    fixMachineInfo: {
      type: Object,
      required: true,
    },
    fixPointInfo: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      point: "",
    };
  },

  created() {},

  methods: {
    callFix() {
      this.$emit("callFix");
    },
    addFix() {
      // console.log(this.point);
      this.$emit("addFix", this.fixMachineInfo.id, this.point);
    },
  },
};
</script>

<style scoped>
.bottom-btn {
  width: 40%;
  margin: 0 auto;
}
</style>
