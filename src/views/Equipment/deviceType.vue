<!-- 设备类型管理 -->
<template>
  <div>
    <StateTop label="型号搜索 : " @click="query" />
    <Button
      color="addBtn"
      title="新建"
      icon="el-icon-circle-plus-outline"
      @click="addMachine"
    />
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
            />
          </template>
        </el-table-column>
        <el-table-column prop="vmRow" label="货道行" />
        <el-table-column prop="vmCol" label="货道列" />
        <el-table-column prop="channelMaxCapacity" label="设备容量" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="handleClick(scope.row)"
            >修改</el-button>
            <el-button type="text" size="small" @click="delMachine(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 弹出层 -->
    <Dialog
      ref="machineDialog"
      :visible="visible"
      :currentMachine="currentMachine"
      @on-change="changeFn"
      @addcheckYes="addcheckYesFn"
      @fixcheckYes="fixcheckYesFn"
    ></Dialog>
    <!-- 底部页码 -->
    <Bottom
      :pageInfo="pageInfo"
      @lastPage="lastPageFn"
      @nextPage="nextPageFn"
    ></Bottom>
  </div>
</template>

<script>
import StateTop from "./component/state-top.vue";
import Button from "@/components/ls-button";
import Dialog from "./component/changeMechine.vue";
import Bottom from "./component/state-bottom.vue";
import {
  getMachineTypeList,
  addMachineType,
  delMachineType,
  fixMachineType,
} from "@/api/machine";
export default {
  components: { Button, Dialog, StateTop, Bottom },
  data() {
    return {
      tableData: [
        {
          name: '',
          model: '',
          image: '',
          vmRow: '',
          vmCol: '',
          channelMaxCapacity: ''
        }
      ],
      visible: false,
      currentMachine: {},
      page: 1,
      pageInfo: {},
    };
  },
  created() {
    this.getMachineTypeList()
  },
  methods: {
    // 查询设备编号
    async query(val) {
      console.log(val);
      const res = await getMachineTypeList({
        name: val,
      });
      this.tableData = res.data.currentPageRecords;
      // console.log(res.data.currentPageRecords);
    },
    // 获取售货机类型列表
    async getMachineTypeList() {
      const res = await getMachineTypeList({
        pageIndex: this.page,
      });
      // console.log(res.data.currentPageRecords);
      this.tableData = res.data.currentPageRecords;
      this.pageInfo = res.data;
    },
    // 添加设备
    async addMachine() {
      this.currentMachine = {
        name: "",
        model: "",
        vmRow: 1,
        vmCol: 1,
        channelMaxCapacity: 1,
        image: "",
      };
      this.visible = true;
      // this.currentMachine = {};
    },
    // 点击确定添加
    async addcheckYesFn(data) {
      await addMachineType(data);
      this.visible = false;
      await this.getMachineTypeList();
      this.$message.success("添加设备类型成功");
      this.currentMachine = {};
    },
    // 修改设备类型
    handleClick(val) {
      this.visible = true;
      this.currentMachine = val;
    },
    async fixcheckYesFn(data) {
      console.log(data.typeId);
      await fixMachineType(data.typeId, data);
      this.visible = false;
      await this.getMachineTypeList();
      this.$message.success("修改设备类型成功");
      this.currentMachine = {};
    }, 
    // 删除设备类型
    async delMachine(val) {
      try {
        await delMachineType(val.typeId);
        await this.getMachineTypeList();
        this.$message.success("删除设备类型成功");
      } catch (error) {}
    },
    changeFn(val) {
      this.visible = val;
    },
    lastPageFn() {
      this.page--;
      this.getMachineTypeList();
    },
    nextPageFn() {
      this.page++;
      this.getMachineTypeList();
    },
  },
};
</script>
<style scoped lang="scss"></style>
