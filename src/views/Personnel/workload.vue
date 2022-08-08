<!-- 工作量统计 -->
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
        <Search ref="search" title="工单搜索" :model.sync="searchFrom.taskCode" />
        <DropDown
          id="statusId"
          title="工单状态"
          name="statusName"
          :work="WorkOrderStatus"
        />
        <LsButton title="查询" icon="el-icon-search" @click="JobSearch" />
      </el-form>
    </div>

    <el-table
      :data="listste"
      style="width: 100%"
      :lazy="true"
      empty-text="暂无数据"
      type="index"
    >
      <Tablecolumn title="操作">
        <el-button type="text" class="el-button1" @click="redact">查看详情</el-button>
      </Tablecolumn>
      <Tablecolumn
        title="序号"
        type="index"
        :pag="page.pageIndex"
      />
      <Tablecolumn title="人员名称" label="userName" />
      <Tablecolumn title="角色" label="roleName" />
      <Tablecolumn title="联系电话" label="mobile" />
      <Tablecolumn title="完成工单(本月）" label="workCount" />
      <Tablecolumn title="进行中工单" label="progressTotal" />
      <Tablecolumn title="拒绝工单(本月）" label="cancelCount" />
    </el-table>

    <!-- 页码 -->
    <div class="dataBtn">
      <div class="Data">
        共{{ page.totalCount }}记录 第{{ page.pageIndex }}/{{
          page.totalPage
        }}页
      </div>
      <LsButton
        ref="btn"
        title="上一页"
        :disable="disable"
        color="pag"
        @click="PreviousPage"
      />
      <LsButton
        title="下一页"
        :disable="disable1"
        color="pag"
        @click="NextPage"
      />
    </div>

    <Particulars :visible.sync="dialogVisible" />
  </div>
</template>

<script>
import LsButton from '@/components/ls-button' // 按钮
import Search from '@/components/search' // 输入框
import DropDown from '@/components/DropDown'
import Tablecolumn from '@/components/tablecolumn' // 列表
import Particulars from './components/particulars.vue'
import { getUserSearchUserWork } from '@/api/essential'
export default {
  components: {
    LsButton,
    Search,
    Tablecolumn,
    DropDown,
    Particulars
  },
  data() {
    return {
      statusId: 0,
      statusName: 0,
      WorkOrderStatus: [],
      page: {},
      pageIndex: 1,
      listste: [],
      disable: true,
      disable1: false,
      dialogVisible: false,
      // WorkOrderList: [],
      searchFrom: {
        // 搜索表单数据
        status: '',
        taskCode: ''
      }
    }
  },
  computed: {},
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    // this.getUserWork()
    this.getUserSearchUserWork()
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  methods: {
    // async getUserWork () {
    //   const { data } = await getSearchApi()
    //   console.log(data);
    // },
    async getUserSearchUserWork() {
      const { data } = await getUserSearchUserWork({
        pageIndex: this.pageIndex,
        ...this.searchFrom,
        isRepair: false
      })
      this.page = data
      this.listste = data.currentPageRecords
      // console.log(data);
      // const workList = await data.currentPageRecords;
      // this.WorkOrderList = workList;
      // this.page = data;
      console.log(data)
    },
    // 下一页
    NextPage() {
      // console.log(12);
      if (this.pageIndex < this.page.totalPage) {
        this.pageIndex++
        this.disable = false
        return this.getUserSearchUserWork()
      }
      this.disable1 = true
    },
    // 上一页
    PreviousPage() {
      if (this.pageIndex > 1) {
        this.pageIndex--
        return this.getUserSearchUserWork()
      }
      this.disable = true
    },

    // 搜索
    async JobSearch() {
      this.getUserSearchUserWork()
      console.log(this.$refs.search)
    },
    redact() {
      this.dialogVisible = true
    }
  }
}
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
.title-from {
  display: flex;
}
.dataBtn {
  display: flex;
  height: 40px;
  margin-bottom: 30px;
  margin-top: 30px;
  align-items: center;
  margin-right: 30px;
}
.Data {
  width: 100%;
  height: 100%;
  background-color: #fff;
  // line-height: 100px;
  padding-left: 30px;
  color: #dbdfe5;
}
</style>
