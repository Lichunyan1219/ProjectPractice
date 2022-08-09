<template>
  <div>
    <el-form ref="form" :model="addMachineInfo" label-width="80px">
      <el-form-item label="设备编号"> 系统自动生成 </el-form-item>
      <el-form-item label="选择型号">
        <el-select v-model="addMachineInfo.vmType" placeholder="请选择">
          <el-option
            v-for="item in addTypeInfo"
            :key="item.typeId"
            :label="item.name"
            :value="item.typeId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择点位">
        <el-select v-model="addMachineInfo.nodeId" placeholder="请选择">
          <el-option
            v-for="item in addPointInfo"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="bottom-btn">
      <Button color="config" title="取消" @click="calladd"></Button>
      <Button color="addBtn" title="确认" @click="addadd"></Button>
    </div>
  </div>
</template>

<script>
import Button from "@/components/ls-button";
import { addMachine } from "@/api/machine";
export default {
  components: {
    Button,
  },
  props: {
    addTypeInfo: {
      type: Array,
      required: true,
    },
    addPointInfo: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      addMachineInfo: {
        vmType: "",
        nodeId: "",
      },
    };
  },

  created() {},

  methods: {
    calladd() {
      console.log(1);
    },
    async addadd() {
      try {
        await addMachine({
          ...this.addMachineInfo,
          createUserId: 1,
        });
        this.$message.success('新增售货机成功')
      } catch (error) {}
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
