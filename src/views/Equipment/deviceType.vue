<!-- 设备类型管理 -->
<template>
  <div>
    <StateTop label="型号搜索 : " @click="query"></StateTop>
    <Button
      color="addBtn"
      title="新建"
      icon="el-icon-circle-plus-outline"
      @click="addMachine"
    ></Button>
    <!-- 主体渲染部分 -->
    <div class="main">
      <el-table :data="tableData" fit>
        <el-table-column type="index" label="序号" />
        <el-table-column prop="name" label="型号名称" />
        <el-table-column prop="model" label="型号编码" />
        <el-table-column prop="image" label="设备图片">
          <template slot-scope="scope">
            <el-image
              style="width: 24px; height: 24px; border-radius: 12px"
              :src="scope.row.image"
              fit="cover "
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="vmRow" label="货道行" />
        <el-table-column prop="vmCol" label="货道列" />
        <el-table-column prop="channelMaxCapacity" label="设备容量" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >修改</el-button
            >
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <Dialog
      ref="machineDialog"
      :visible="visible"
      @on-change="changeFn"
      @addcheckYes="addcheckYesFn"
    ></Dialog>
  </div>
</template>

<script>
import StateTop from "./component/state-top.vue";
import Button from "@/components/ls-button";
import Dialog from "./component/changeMechine.vue";
import { getMachineTypeList, addMachineType } from "@/api/machine";
export default {
  components: { Button, Dialog, StateTop },
  data() {
    return {
      tableData: [
        {
          name: "",
          model: "",
          image: "",
          vmRow: "",
          vmCol: "",
          channelMaxCapacity: "",
        },
      ],
      visible: false,
    };
  },
  created() {
    this.getMachineTypeList();
  },
  methods: {
    // 查询设备编号
    query(val) {
      console.log(val);
    },
    // 获取售货机类型列表
    async getMachineTypeList() {
      const res = await getMachineTypeList();
      console.log(res.data.currentPageRecords);
      this.tableData = res.data.currentPageRecords;
    },
    // 添加设备
    async addMachine() {
      this.visible = true;
    },
    async addcheckYesFn(data){
      const res = await addMachineType(data);
      console.log(res);
    },
    // 修改设备类型
    handleClick(val) {
      this.visible = true;
      console.log(val);
    },
    changeFn(val) {
      this.visible = val;
    },
  },
};
</script>
<style scoped lang="scss"></style>
