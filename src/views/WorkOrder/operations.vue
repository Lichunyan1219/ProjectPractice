<!-- 运营工单 -->
<template>
  <div>
    <!-- 头部 -->
    <div class="WorkOrder">
      <el-form v-model="searchFrom" class="title-from" label-width="80px" label-position="right">
        <search ref="search" title="工单搜索" :model.sync="searchFrom.taskCode" />
        <DropDown ref="DropDown" title="工单状态" :model.sync="searchFrom.status" :work="WorkOrderStatus" />
        <lsButton @click="JobSearch" />
      </el-form>
    </div>
    <div>
      <!-- 添加按钮 -->
      <lsButton icon="el-icon-circle-plus-outline" color="addBtn" title="新建" @click="visible=true" />
      <!-- <lsButton title="工单配置" color="config" /> -->
      <el-table :data="WorkOrderList" style="width: 100%" :lazy="true" empty-text="暂无数据" type="index">
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="ViewDetails(scope)">查看详情</el-button>
          </template>
        </el-table-column>
        <tableColumn title="序号" type="index" :pag=" Pag.pageIndex" />
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
      <div class="Data">共{{ Pag.totalCount }}记录  第{{ Pag.pageIndex }}/{{ Pag.totalPage }}页</div>
      <lsButton ref="btn" title="上一页" :disable="disable" color="pag" @click="PreviousPage" />
      <lsButton title="下一页" :disable="disable1" color="pag" @click="NextPage" />
    </div>
    <!--  新增弹窗 -->
    <Dialogue title="添加工单" :visible.sync="visible">
      <OpsPopupWindow ref="addFrom" @create="create" />
    </Dialogue>
    <!-- 查看详情弹窗 -->
    <el-dialog
      title="工单详情"
      :visible.sync="dialogVisible"
      width="40%"
    >
      <div v-if="show===1">待办</div>
      <div v-if="show===4">完成</div>
      <div v-if="show===3">
        <div>
          <div class="img">
            <div class="img1">
              <img src="@/assets/quxiao.png" alt="">
              <span>取消</span>
            </div>
            <img src="http://likede2-admin.itheima.net/img/pic_3.e8208e34.png" alt="">
          </div>
          <el-row :gutter="20">
            <el-col :span="8" :offset="2"><div class="grid-content bg-purple">设备编号：{{ data.innerCode }}</div></el-col>
            <el-col :span="8" :offset="2"><div class="grid-content bg-purple">创建日期：{{ data.createTime }}</div></el-col>
            <el-col :span="8" :offset="2"><div class="grid-content bg-purple">取消日期：{{ data.updateTime }}</div></el-col>
            <el-col :span="8" :offset="2"><div class="grid-content bg-purple">运维人员：{{ data.userName }}</div></el-col>
            <el-col :span="8" :offset="2"><div class="grid-content bg-purple">工单类型：{{ data.taskType.typeName }}</div></el-col>
            <el-col :span="8" :offset="2"><div class="grid-content bg-purple">工单方式：{{ data.createType }}</div></el-col>
            <el-col :span="24" :offset="2"><div class="grid-content bg-purple">取消原因：{{ data.desc }}</div></el-col>
          </el-row>
          <div class="addWorkBtn">
            <lsButton title="重新创建" color="config" @click="Recreate" />
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import OpsPopupWindow from './components/OpsPopupWindow.vue'
import search from '@/components/search'
import DropDown from '@/components/DropDown'
import lsButton from '@/components/ls-button'
import { getWorkOrderStatus, getWorkOrderList } from '@/api/WorkOrder'
import moment from 'moment'
import tableColumn from '@/components/tablecolumn'
import Dialogue from '@/components/Dialogue'
export default {
  components: {
    search,
    DropDown,
    lsButton,
    tableColumn,
    Dialogue,
    OpsPopupWindow
  },
  data() {
    return {
      WorkOrderStatus: [], // 工单状态数据
      WorkOrderList: [], // 工单列表数据 // 工单列表数据
      data: {}, // 详情数据
      Pag: '', // 分页数据
      pageIndex: 1,
      disable: false,
      show: 1,
      disable1: false,
      dialogVisible: false,
      status: '',
      taskCode: '',
      moment,
      searchFrom: { // 搜索表单数据
        status: '',
        taskCode: ''
      },
      visible: false // 新建弹出框
    }
  },
  computed: {},
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getWorkOrderList()
    this.getWorkOrderStatus()
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {

  },
  methods: {
    // 获取工单列表
    async getWorkOrderList() {
      const { data } = await getWorkOrderList({
        pageIndex: this.pageIndex,
        ...this.searchFrom,
        isRepair: true
      })
      const workList = await this.ProcessingWorkOrderStatus(data.currentPageRecords)
      this.WorkOrderList = workList
      this.Pag = data
    },
    // 获取工单状态
    async getWorkOrderStatus() {
      const { data } = await getWorkOrderStatus()
      this.WorkOrderStatus = data
    },
    // 上一页
    NextPage() {
      if (this.pageIndex < this.Pag.totalPage) {
        this.pageIndex++
        this.disable = false
        return this.getWorkOrderList()
      }
      this.disable1 = true
    },
    // 下一页
    PreviousPage() {
      if (this.pageIndex > 1) {
        this.pageIndex--
        return this.getWorkOrderList()
      }
      this.disable = true
    },
    // 搜索
    async JobSearch() {
      this.getWorkOrderList()
      console.log(this.$refs.search)
    },
    // 处理工单状态
    ProcessingWorkOrderStatus(data) {
      data.forEach(ele => {
        ele.createType === 0 ? ele.createType = '自动' : ele.createType = '手动'
        ele.updateTime = this.moment(ele.updateTime).utcOffset(8).format('YYYY.MM.DD HH:mm:ss')
      })
      return data
    },
    // 关闭新增弹框
    create() {
      this.visible = false
    },
    // 查看详情弹框
    ViewDetails(val) {
      console.log(val)
      this.show = val.row.taskStatusTypeEntity.statusId
      this.data = val.row
      this.dialogVisible = true
    },
    Recreate() {
      console.log(this.$refs.addFrom.data)
    }
  }
}
</script>
<style scoped lang="scss">
.WorkOrder{
  width: 100%;
  height: 60px;
  background-color: #fff;
  display: flex;
  padding: 10px 20px ;
  margin: 20px;
  border-radius: 10px;
}
.Data{
  width: 100%;
  height: 100%;
  background-color: #fff;
  // line-height: 100px;
  padding-left: 30px;
  color:#dbdfe5;
}
.dataBtn{
  display: flex;
  height: 40px;
  margin-bottom: 30px;
  margin-top: 30px;
  align-items: center;
  margin-right: 30px;
}
.ViewDetails{
    color: #409eff;
    font-style: normal;

}
.el-form-item{
  margin-bottom: 0;
}
.form-group{
  width: 100%;
}
.el-input{
  width: 100% !important;
}
.title-from{
  display: flex;
}
.el-form-item{
  margin-bottom: 10px;
}
.BackOrder{
  color:#4368e1;
  cursor: pointer;
}
.addWorkBtn{
 display: flex;
 justify-content: center;
 align-items: center;
}
.img{
  display: flex;
  height: 54px;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  background-color: #e5e5e5;
  border-radius: 10px;
  margin-bottom: 20px;
}
.img1{
  display: flex;
  align-items: center;
  img{
    margin-right: 20px;
  }
}
.el-col-8{
  margin-bottom: 15px;
}
</style>
