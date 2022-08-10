<!-- 运营工单 -->
<template>
  <div>
    <!-- 头部 -->
    <div class="WorkOrder">
      <el-form
        v-model="searchFrom"
        class="title-from"
        label-width="80px"
        label-position="right"
      >
        <search
          ref="search"
          title="工单搜索"
          :model.sync="searchFrom.taskCode"
        />
        <DropDown
          ref="DropDown"
          title="工单状态"
          :model.sync="searchFrom.status"
          :work="WorkOrderStatus"
        />
        <lsButton @click="JobSearch" />
      </el-form>
    </div>
    <div>
      <!-- 添加按钮 -->
      <lsButton
        icon="el-icon-circle-plus-outline"
        color="addBtn"
        title="新建"
        @click="AddWorkOrder"
      />
      <lsButton title="工单配置" color="config" @click="GetWorkOrderAlert" />
      <el-table
        :data="WorkOrderList"
        style="width: 100%"
        :lazy="true"
        empty-text="暂无数据"
        type="index"
      >
        <el-table-column label="操作">
          <template slot-scope="scope"
            ><el-button type="text" @click="ViewDetails(scope)"
              >查看详情</el-button
            ></template
          ></el-table-column
        >
        <tableColumn title="序号" type="index" :pag="Pag.pageIndex" />
        <tableColumn title="工单编号" label="taskCode" />
        <tableColumn title="设备编号" label="innerCode" />
        <tableColumn title="工单类型" label="taskType.typeName" />
        <tableColumn title="工单方式" label="createType" />
        <tableColumn title="工单状态" label="taskStatusTypeEntity.statusName" />
        <tableColumn title="运营人员" label="userName" />
        <tableColumn title="创建日期" label="updateTime" />
      </el-table>
    </div>
    <div class="dataBtn">
      <div class="Data">
        共{{ Pag.totalCount }}记录 第{{ Pag.pageIndex }}/{{ Pag.totalPage }}页
      </div>
      <lsButton
        ref="btn"
        title="上一页"
        :disable="disable"
        color="pag"
        @click="PreviousPage"
      />
      <lsButton
        title="下一页"
        :disable="disable1"
        color="pag"
        @click="NextPage"
      />
    </div>
    <!--  新增弹窗 -->
    <Dialogue title="添加工单" :visible.sync="visible">
      <BulletFrame :list="WorkOrderTypeList" @onClose="CancelWork" />
    </Dialogue>
    <!-- 工单配置 -->
    <Dialogue title="工单配置" :visible.sync="visible1">
      <div class="Replenishment">
        <span>补货预警值：</span>
        <el-input-number v-model="num" controls-position="right" />
      </div>
      <div class="addWorkBtn">
        <lsButton title="取消" color="config" @click="visible1 = false" />
        <lsButton
          title="确定"
          color="addBtn"
          @click="SetUpAutomaticReplenishmentWarn"
        />
      </div>
    </Dialogue>
    <!-- 查看详情待办 -->
    <el-dialog title="工单详情" :visible.sync="dialogVisible" width="45%">
      <div v-if="dialogVisible">
        <div class="img">
          <div class="img1">
            <img src="@/assets/daiban.png" alt="" />
            <span>取消</span>
          </div>
          <img
            src="http://likede2-admin.itheima.net/img/pic_3.e8208e34.png"
            alt=""
          />
        </div>
        <el-row :gutter="20">
          <el-col :span="8" :offset="2"
            ><div class="grid-content bg-purple">
              设备编号：{{ PendingWorkOrderDetailsData.innerCode }}
            </div></el-col
          >
          <el-col :span="10" :offset="2"
            ><div class="grid-content bg-purple">
              创建日期：{{ PendingWorkOrderDetailsData.createTime }}
            </div></el-col
          >
          <el-col :span="8" :offset="2"
            ><div class="grid-content bg-purple">
              运营人员：{{ PendingWorkOrderDetailsData.userName }}
            </div></el-col
          >
          <el-col :span="8" :offset="2"
            ><div class="grid-content bg-purple">
              工单类型：{{ PendingWorkOrderDetailsData.taskType.typeName }}
            </div></el-col
          >
          <el-col :span="8" :offset="2"
            ><div class="grid-content bg-purple">
              补货数量：<el-button type="text" @click="todotDetailsClick"
                >补货详情</el-button
              >
            </div></el-col
          >
          <el-col :span="8" :offset="2"
            ><div class="grid-content bg-purple">
              工单方式：{{ PendingWorkOrderDetailsData.createType }}
            </div></el-col
          >
          <el-col :span="20" :offset="2"
            ><div class="grid-content bg-purple">
              备注：{{ PendingWorkOrderDetailsData.desc }}
            </div></el-col
          >
        </el-row>
        <div class="addWorkBtn">
          <!-- 待办区分取消与确定弹框 -->
          <el-button type="text" @click="open">取消工单</el-button>
        </div>
      </div>
    </el-dialog>
    <!-- 查看详情完成 -->
    <el-dialog title="工单详情" :visible.sync="dialogVisible2" width="45%">
      <div v-if="dialogVisible2">
        <div class="img">
          <div class="img1">
            <img src="@/assets/wancheng.png" alt="" />
            <span>取消</span>
          </div>
          <img
            src="http://likede2-admin.itheima.net/img/pic_4.3b5af41c.png"
            alt=""
          />
        </div>
        <el-row :gutter="20">
          <el-col :span="10" :offset="2"
            ><div class="grid-content bg-purple">
              设备编号：{{ PendingWorkOrderDetailsData.innerCode }}
            </div></el-col
          >
          <el-col :span="10" :offset="2"
            ><div class="grid-content bg-purple">
              创建日期：{{ PendingWorkOrderDetailsData.createTime }}
            </div></el-col
          >
          <el-col :span="10" :offset="2"
            ><div class="grid-content bg-purple">
              完成日期：{{ PendingWorkOrderDetailsData.updateTime }}
            </div></el-col
          >
          <el-col :span="10" :offset="2"
            ><div class="grid-content bg-purple">
              运营人员：{{ PendingWorkOrderDetailsData.userName }}
            </div></el-col
          >
          <el-col :span="10" :offset="2"
            ><div class="grid-content bg-purple">
              工单类型：{{ PendingWorkOrderDetailsData.taskType.typeName }}
            </div></el-col
          >
          <el-col :span="10" :offset="2"
            ><div class="grid-content bg-purple">
              补货数量：<el-button type="text" @click="todotDetailsClick"
                >补货详情</el-button
              >
            </div></el-col
          >
          <el-col :span="10" :offset="2"
            ><div class="grid-content bg-purple">
              工单方式：{{ PendingWorkOrderDetailsData.createType }}
            </div></el-col
          >
          <el-col :span="10" :offset="2"
            ><div class="grid-content bg-purple">
              备注：{{ PendingWorkOrderDetailsData.desc }}
            </div></el-col
          >
        </el-row>
      </div>
    </el-dialog>
    <!-- 查看详情取消 -->
    <el-dialog title="工单详情" :visible.sync="dialogVisible3" width="45%">
      <div v-if="dialogVisible3">
        <div class="img">
          <div class="img1">
            <img src="@/assets/quxiao.png" alt="" />
            <span>取消</span>
          </div>
          <img
            src="http://likede2-admin.itheima.net/img/pic_3.e8208e34.png"
            alt=""
          />
        </div>
        <el-row :gutter="20">
          <el-col :span="10" :offset="2"
            ><div class="grid-content bg-purple">
              设备编号：{{ PendingWorkOrderDetailsData.innerCode }}
            </div></el-col
          >
          <el-col :span="10" :offset="2"
            ><div class="grid-content bg-purple">
              创建日期：{{ PendingWorkOrderDetailsData.createTime }}
            </div></el-col
          >
          <el-col :span="10" :offset="2"
            ><div class="grid-content bg-purple">
              取消日期：{{ PendingWorkOrderDetailsData.updateTime }}
            </div></el-col
          >
          <el-col :span="10" :offset="2"
            ><div class="grid-content bg-purple">
              运营人员：{{ PendingWorkOrderDetailsData.userName }}
            </div></el-col
          >
          <el-col :span="10" :offset="2"
            ><div class="grid-content bg-purple">
              工单类型：{{ PendingWorkOrderDetailsData.taskType.typeName }}
            </div></el-col
          >
          <el-col :span="10" :offset="2"
            ><div class="grid-content bg-purple">
              补货数量：<el-button type="text" @click="todotDetailsClick"
                >补货详情</el-button
              >
            </div></el-col
          >
          <el-col :span="10" :offset="2"
            ><div class="grid-content bg-purple">
              工单方式：{{ PendingWorkOrderDetailsData.createType }}
            </div></el-col
          >
          <el-col :span="10" :offset="2"
            ><div class="grid-content bg-purple">
              取消原因：{{ PendingWorkOrderDetailsData.desc }}
            </div></el-col
          >
        </el-row>
      </div>
    </el-dialog>
    <!-- 补货详情 -->
    <el-dialog
      title="补货详情"
      :visible.sync="dialogVisible1"
      width="50%"
      :modal="false"
    >
      <div class="replenishmentDetails">
        <el-table ref="aabb" empty-text="暂无数据" :data="todoDetailsData">
          <el-table-column prop="channelCode" label="货道编号">
          </el-table-column>
          <el-table-column prop="skuName" label="商品"> </el-table-column>
          <el-table-column prop="expectCapacity" label="补货数量">
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import BulletFrame from "./components/BulletFrame.vue";
import search from "@/components/search";
import DropDown from "@/components/DropDown";
import lsButton from "@/components/ls-button";
import {
  getWorkOrderStatus,
  getWorkOrderList,
  getWorkOrderType,
  GetWorkOrderAlert,
  SetUpAutomaticReplenishmentWarn,
  getReplenishmentDetails,
  cancelWorkOrder,
} from "@/api/WorkOrder";
import moment from "moment";
import tableColumn from "@/components/tablecolumn";
import Dialogue from "@/components/Dialogue";
export default {
  components: {
    search,
    DropDown,
    lsButton,
    tableColumn,
    Dialogue,
    BulletFrame,
  },
  data() {
    return {
      WorkOrderStatus: [], // 工单状态数据
      WorkOrderList: [], // 工单列表数据 // 工单列表数据
      //待办工单详情数据
      PendingWorkOrderDetailsData: {},
      //待办补货详情数据
      todoDetailsData: [],
      Pag: "", // 分页数据
      pageIndex: 1,
      disable: true,
      disable1: false,
      //查看详情待办对话框显示隐藏
      dialogVisible: false,
      //待办补货详情对话框显示隐藏
      dialogVisible1: false,
      //查看详情完成对话框显示隐藏
      dialogVisible2: false,
      //查看详情取消对话框显示隐藏
      dialogVisible3: false,
      DetailDisplay: 1,
      status: "",
      taskCode: "",
      moment,
      num: 1, // 工单预警数据
      searchFrom: {
        // 搜索表单数据
        status: "",
        taskCode: "",
      },
      visible: false, // 新建弹出框
      visible1: false, // 取消弹窗
      WorkOrderDetails: {}, // 工单详细信息
      WorkOrderTypeList: [], // 工单状态列表
    };
  },
  computed: {},
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getWorkOrderList();
    this.getWorkOrderStatus();
    this.getWorkOrderType();
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  methods: {
    // 获取工单列表
    async getWorkOrderList() {
      const { data } = await getWorkOrderList({
        pageIndex: this.pageIndex,
        ...this.searchFrom,
        isRepair: false,
      });
      const workList = await this.ProcessingWorkOrderStatus(
        data.currentPageRecords
      );
      this.WorkOrderList = workList;
      this.Pag = data;
    },
    // 获取工单状态
    async getWorkOrderStatus() {
      const { data } = await getWorkOrderStatus();
      this.WorkOrderStatus = data;
    },
    // 上一页
    NextPage() {
      if (this.pageIndex < this.Pag.totalPage) {
        this.pageIndex++;
        this.disable = false;
        return this.getWorkOrderList();
      }
      this.disable1 = true;
    },
    // 下一页
    PreviousPage() {
      if (this.pageIndex > 1) {
        this.pageIndex--;
        return this.getWorkOrderList();
      }
      this.disable = true;
    },
    // 搜索
    async JobSearch() {
      this.getWorkOrderList();
      console.log(this.$refs.search);
    },
    // 处理工单状态
    ProcessingWorkOrderStatus(data) {
      data.forEach((ele) => {
        ele.createType === 0
          ? (ele.createType = "自动")
          : (ele.createType = "手动");
        ele.updateTime = this.moment(ele.updateTime)
          .utcOffset(8)
          .format("YYYY.MM.DD HH:mm:ss");
      });
      return data;
    },
    // 取消关闭添加弹窗
    CancelWork() {
      this.visible = false;
    },
    // 点击添加打开弹窗
    AddWorkOrder() {
      this.visible = true;
    },
    // 获取工单类型
    async getWorkOrderType() {
      const { data } = await getWorkOrderType();
      // this.WorkOrderTypeList = data
      this.WorkOrderTypeList = data.filter((ele) => ele.type === 2);
      // console.log(this.WorkOrderTypeList)
    },
    // 获取工单预警
    async GetWorkOrderAlert() {
      const { data } = await GetWorkOrderAlert();
      this.num = data;
      this.visible1 = true;
    },
    // 设置自动补货预警值
    async SetUpAutomaticReplenishmentWarn() {
      const { data } = await SetUpAutomaticReplenishmentWarn(this.num);
      if (data) {
        this.visible1 = false;
        this.$message.success("设置成功");
      }
    },
    //查看详情点击事件
    async ViewDetails(val) {
      this.PendingWorkOrderDetailsData = val.row;
      if (val.row.taskStatus === 4) {
        console.log(1);
        this.dialogVisible2 = true;
      } else if (val.row.taskStatus === 1) {
        this.dialogVisible - true;
      } else {
        this.dialogVisible3 = true;
      }
      // const { data } = await getWorkOrderDetails(val.row.taskId);
      console.log(val.row);
      this.PendingWorkOrderDetailsData.createTime =
        this.PendingWorkOrderDetailsData.createTime
          .replace("-", ".")
          .replace("-", ".")
          .replace("T", " ");
      console.log(this.PendingWorkOrderDetailsData.taskType.typeName);
      const { data } = await getReplenishmentDetails(val.row.taskId);
      console.log(data);
      this.todoDetailsData = data;
    },
    //查看详情待办叉号
    handleClose() {},
    //待办补货详情点击事件
    todotDetailsClick() {
      this.dialogVisible1 = true;
    },
    //待办取消工单点击事件
    open() {
      this.$confirm("取消工单后，将不能恢复，是否确认取消？", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        showClose: false,
      })
        .then(async () => {
          this.dialogVisible = false;
          const res = await cancelWorkOrder(
            this.PendingWorkOrderDetailsData.taskId
          );
          console.log(res);
          this.getWorkOrderList();
        })
        .catch();
    },
  },
};
</script>
<style scoped lang="scss">
.WorkOrder {
  width: 100%;
  height: 60px;
  background-color: #fff;
  display: flex;
  padding: 10px 20px;
  margin: 20px;
  border-radius: 10px;
}
.Data {
  width: 100%;
  height: 100%;
  background-color: #fff;
  // line-height: 100px;
  padding-left: 30px;
  color: #dbdfe5;
}
.dataBtn {
  display: flex;
  height: 40px;
  margin-bottom: 30px;
  margin-top: 30px;
  align-items: center;
  margin-right: 30px;
}
.ViewDetails {
  color: #409eff;
  font-style: normal;
}
.el-form-item {
  margin-bottom: 0;
}
.form-group {
  width: 100%;
}
.el-input {
  width: 100% !important;
}
.title-from {
  display: flex;
}
.el-form-item {
  margin-bottom: 10px;
}
.BackOrder {
  color: #4368e1;
  cursor: pointer;
}
.addWorkBtn {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
}
.el-form-item__content {
  display: flex;
}
.Replenishment {
  display: flex;
  align-items: center;
  padding: 0 60px;
  span {
    display: inline-block;
    width: 100px;
  }
}
//查看详情待办对话框
.task-status {
  display: flex;
  align-items: center;
  height: 54px;
  margin-bottom: 25px;
  background-color: hsla(0, 0%, 92.5%, 0.39);
}
.todoLeftImg {
  margin-left: 22px;
}
.todoSpan {
  flex: 1;
  margin-left: 16px;
  color: rgba(0, 0, 0, 0.85);
}
.todoRightImg {
  margin-right: 76px;
  margin-bottom: 7px;
}
.todoContent {
  display: flex;
}
.img {
  display: flex;
  height: 54px;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  background-color: #e5e5e5;
  border-radius: 10px;
  margin-bottom: 20px;
}
.img1 {
  display: flex;
  align-items: center;
  img {
    margin-right: 10px;
  }
}
.el-col-8 {
  margin-bottom: 15px;
}
.el-col-10 {
  margin-bottom: 15px;
}
.el-button {
  line-height: 0;
}
</style>
