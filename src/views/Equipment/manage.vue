<!-- 设备管理 -->
<template>
  <div>
    <StateTop label="设备编号" @click="query"></StateTop>
    <Button
      color="addBtn"
      title="新建"
      icon="el-icon-circle-plus-outline"
      @click="addMachine"
    ></Button>
    <Button color="config" title="批量操作" @click="moreMachine"></Button>
    <!-- 中间主体渲染区域 -->
    <div class="main">
      <el-table :data="tableData" fit @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column type="index" :index="indexMethod" label="序号" />
        <el-table-column prop="innerCode" label="设备编号" />
        <el-table-column prop="type.name" label="设备型号" />
        <el-table-column prop="node.name" label="详细地址" />
        <el-table-column prop="ownerName" label="合作商" />
        <el-table-column prop="vmStatus" label="设备状态">
          <template slot-scope="scope">
            {{ { 0: "未投放", 1: "运营", 3: "撤机" }[scope.row.vmStatus] }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <button class="operate" @click="machineRoad(scope.row)">
              货道
            </button>
            <button class="operate" @click="machineTactics(scope.row)">
              策略
            </button>
            <button class="operate" @click="fixmachine(scope.row)">修改</button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 货道弹出框 -->
    <el-dialog title="货道设置" :visible.sync="dialogVisible" width="70%">
      <!-- 弹层头部 -->
      <el-row
        type="flex"
        justify="space-around"
        align="middle"
        class="machineRoadTop"
      >
        <el-col :span="6">货道行数：{{ machineRoadInfo.vmRow }}</el-col>
        <el-col :span="6">货道列数：{{ machineRoadInfo.vmCol }}</el-col>
        <el-col :span="6"
          >货道容量（个）: {{ machineRoadInfo.channelMaxCapacity }}</el-col
        >
        <el-col :span="6">
          <Button title="智能排货" />
        </el-col>
      </el-row>
      <!-- 弹层中间渲染区域 -->
      <div class="machineGoods">
        <div
          class="machineGoods-content"
          style="transform: translateX()"
          ref="scrollContent"
        >
          <div
            class="item"
            v-for="item in machineRoadList"
            :key="item.channelId"
          >
            <div class="code">{{ item.channelCode }}</div>
            <div class="context">
              <img v-if="item.sku" :src="item.sku.skuImage" alt="" />
              <div v-if="item.sku" class="text">{{ item.sku.skuName }}</div>
            </div>
            <div class="addAndDel">
              <button class="add">添加</button>
              <button class="del">删除</button>
            </div>
          </div>
        </div>
        <div class="left-jiantou">
          <span class="el-icon-arrow-left" @click="leftScroll"></span>
        </div>
        <div class="right-jiantou">
          <span class="el-icon-arrow-right" @click="rightScroll"></span>
        </div>
      </div>
      <!-- 弹层底部 -->
      <div class="bottom-btn">
        <span slot="footer" class="dialog-footer">
          <el-button type="warning" @click="dialogVisible = false"
            >确 定</el-button
          >
        </span>
      </div>
    </el-dialog>
    <!-- 策略弹框 -->
    <manasgeTactics
      v-if="!machineTacticsNameFlag"
      :dialogTactics="dialogTactics"
      @on-change="changedialogTactics"
      @checktactics="this.getmachineList"
      :tacticsList="tacticsList"
      :machineTacticsCode="machineTacticsCode"
    ></manasgeTactics>
    <manasgeTacticsCheck
      v-else
      :dialogTactics="dialogTactics"
      @on-change="changedialogTactics"
      @canceltactic="this.getmachineList"
      :machineTacticsName="machineTacticsName"
    ></manasgeTacticsCheck>
    <!-- 修改弹框 -->
    <el-dialog title="修改设备" :visible.sync="fixDialog" width="50%">
      <fixMachineDialog
        @callFix="fixDialog = false"
        @addFix="addFix"
        :fixMachineInfo="fixMachineInfo"
        :fixPointInfo="fixPointInfo"
      ></fixMachineDialog>
    </el-dialog>
    <!-- 新增弹框 -->
    <el-dialog title="新增设备" :visible.sync="addMachineDialog" width="50%">
      <addMachine
        :addTypeInfo="addTypeInfo"
        :addPointInfo="addPointInfo"
      ></addMachine>
    </el-dialog>
    <!-- 底部页码区域 -->
    <StateBottom
      :pageInfo="pageInfo"
      @lastPage="lastPage"
      @nextPage="nextPage"
    ></StateBottom>
  </div>
</template>

<script>
import StateTop from "./component/state-top.vue";
import StateBottom from "./component/state-bottom.vue";
import Dialog from "@/components/Dialogue";
import Button from "@/components/ls-button";
import manasgeTactics from "./component/manage-Tactics.vue";
import manasgeTacticsCheck from "./component/manage-Tactics-check.vue";
import fixMachineDialog from "./component/fixMachineDialog.vue";
import addMachine from "./component/addMachine.vue";
import {
  getmachineList,
  getMachineRoad,
  getMachineTypeList,
  getTactics,
  fixMachinePoint,
} from "@/api/machine";
import { queryMachineTacticsAPI } from "@/api/strategy";
import { getAreaDetails } from "@/api/pointManagement";
export default {
  components: {
    StateTop,
    Button,
    StateBottom,
    Dialog,
    manasgeTactics,
    manasgeTacticsCheck,
    fixMachineDialog,
    addMachine,
  },
  data() {
    return {
      tableData: [
        {
          innerCode: "",
          type: "",
          node: "",
          ownerName: "",
          vmStatus: "",
        },
      ],
      multipleSelection: [],
      checkMultipleSelection: [],
      page: 1,
      pageInfo: {},
      // 控制货道弹出框
      dialogVisible: false,
      // 控制策略弹出框
      checkTactics: "",
      dialogTactics: false,
      machineRoadInfo: {},
      machineRoadList: [],
      // 策略列表
      tacticsList: [],
      machineTacticsName: {},
      machineTacticsCode: [],
      // 控制修改弹框
      fixDialog: false,
      fixMachineInfo: {},
      fixPointInfo: [],
      // 控制新增弹框
      addMachineDialog: false,
      addTypeInfo: [],
      addPointInfo: [],
    };
  },
  created() {
    this.getmachineList();
  },
  methods: {
    // 序号
    indexMethod(index) {
      return index + 1;
      // return index + 1 + 10 * (this.page - 1);
    },
    // 查询设备
    async query(val) {
      console.log(val);
      const res = await getmachineList({
        innerCode: val,
      });
      this.tableData = res.data.currentPageRecords;
    },
    // 新建设备
    async addMachine() {
      this.addMachineDialog = true;
      const res = await getMachineTypeList();
      const res2 = await getAreaDetails();
      this.addTypeInfo = res.data.currentPageRecords;
      this.addPointInfo = res2.data.currentPageRecords;
      console.log(res2);
    },
    // 批量操作
    async moreMachine() {
      if (this.multipleSelection.length) {
        this.machineTacticsName = "";
        const res = await getTactics();
        this.tacticsList = res.data;
        this.dialogTactics = true;
      } else {
        this.$message.warning("请勾选售货机");
      }
    },
    // 选择框
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.multipleSelection.forEach((item) => {
        this.checkMultipleSelection.push(item.innerCode);
      });
      this.machineTacticsCode = Array.from(
        new Set(this.checkMultipleSelection)
      );
      console.log(this.machineTacticsCode);
    },
    // 获取售货机列表
    async getmachineList() {
      const res = await getmachineList({
        pageIndex: this.page,
      });
      // console.log(res.data.currentPageRecords);
      this.tableData = res.data.currentPageRecords;
      this.pageInfo = res.data;
    },
    // 货道
    async machineRoad(val) {
      this.dialogVisible = true;
      const res = await getMachineRoad(val.innerCode);
      const res2 = await getMachineTypeList({
        name: val.type.name,
      });
      // console.log(res2.data.currentPageRecords[0]);
      this.machineRoadList = res.data;
      this.machineRoadInfo = res2.data.currentPageRecords[0];
    },
    // 策略
    async machineTactics(val) {
      const res = await getTactics({
        innerCodeList: val.innerCode,
      });
      this.tacticsList = res.data;
      const res2 = await queryMachineTacticsAPI(val.innerCode);
      this.machineTacticsName = res2.data;
      this.machineTacticsCode.push(val.innerCode);
      this.dialogTactics = true;
    },
    changedialogTactics(val) {
      this.dialogTactics = val;
    },
    // 修改
    async fixmachine(val) {
      this.fixDialog = true;
      this.fixMachineInfo = val;
      const res = await getAreaDetails();
      console.log(val);
      this.fixPointInfo = res.data.currentPageRecords;
    },
    async addFix(id, point) {
      try {
        await fixMachinePoint(id, point);
        this.$message.success("点位修改成功");
      } catch (error) {}
    },
    // 上一页
    lastPage() {
      this.page--;
      this.getmachineList();
    },
    // 下一页
    nextPage() {
      this.page++;
      this.getmachineList();
    },
    // 滚动上一页
    leftScroll() {
      this.$refs.scrollContent.style.transform = "translateX(0)";
    },
    // 滚动下一页
    rightScroll() {
      this.$refs.scrollContent.style.transform = "translateX(-850px)";
    },
  },
  computed: {
    machineTacticsNameFlag() {
      return this.machineTacticsName ? true : false;
    },
  },
};
</script>
<style scoped lang="scss">
.main {
  .operate {
    cursor: pointer;
    background: transparent;
    border: 0;
    color: #5f84ff;
  }
}
.machineRoadTop {
  width: 90%;
  margin: 0 auto;
  padding-left: 15px;
  background-color: #f3f6fb;
}
.machineGoods {
  width: 850px;
  height: 384px;
  overflow-x: hidden;
  position: relative;
  .machineGoods-content {
    padding: 20px 40px;
    width: 210%;
    overflow: hidden;
    .item {
      display: inline-block;
      position: relative;
      width: 150px;
      height: 180px;
      margin-right: 15px;
      // background-color: red;
      .code {
        position: absolute;
        top: 10px;
        left: 0;
        background-color: #829bed;
        width: 43px;
        height: 23px;
        line-height: 23px;
        text-align: center;
        border-radius: 0 10px 10px 0;
        color: #fff;
      }
      .context {
        height: 135px;
        padding-top: 16px;
        background-color: #f6f7fb;
        border-radius: 4px;
        img {
          display: inline-block;
          margin-left: 35px;
          width: 84px;
          height: 78px;
          margin-bottom: 10px;
        }
        .text {
          text-align: center;
        }
      }
      .addAndDel {
        padding: 5px 0;
        text-align: center;
        .add {
          border: 0;
          background: transparent;
          color: #5f84ff;
        }
        .del {
          border: 0;
          background: transparent;
          color: #ff5a5a;
        }
      }
    }
  }
  .left-jiantou {
    position: fixed;
    top: 360px;
    left: 200px;
    height: 50px;
    width: 50px;
    z-index: 999;
    span {
      font-size: 50px;
    }
  }
  .right-jiantou {
    position: fixed;
    top: 360px;
    right: 220px;
    height: 50px;
    width: 50px;
    span {
      font-size: 50px;
    }
  }
}

.bottom-btn {
  .dialog-footer {
    margin-left: 400px;
  }
}
</style>
