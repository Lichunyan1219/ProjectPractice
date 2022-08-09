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
        <Search
          ref="search"
          title="人员搜索"
          :model.sync="searchFrom.userName"
        />
        <el-form-item label="角色">
          <el-select
            v-model="searchFrom.roleName"
            filterable
            placeholder="请选择"
            :clearable="true"
            style="width: 100%"
            :model.sync="searchFrom.userName"
          >
            <el-option
              v-for="(item, index) in WorkOrderStatus"
              :key="index"
              :label="item.roleName"
              :value="item.roleName"
            />
          </el-select>
        </el-form-item>


        <LsButton title="查询" icon="el-icon-search" @click="JobSearch" />
      </el-form>
    </div>

    <el-table
      :data="page.currentPageRecords"
      style="width: 100%"
      :lazy="true"
      empty-text="暂无数据"
      type="index"
    >
      <Tablecolumn title="操作">
        <el-button type="text" class="el-button1" @click="redact"
          >查看详情</el-button
        >
      </Tablecolumn>
      <Tablecolumn title="序号" type="index" :pag="page.pageIndex" />
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
        共{{ page.totalCount }}记录 第{{ searchFrom.pageIndex }}/{{
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
import LsButton from "@/components/ls-button"; // 按钮
import Search from "@/components/search"; // 输入框
import DropDown from "@/components/DropDown";
import Tablecolumn from "@/components/tablecolumn"; // 列表
import Particulars from "./components/particulars.vue";
import { getUserSearchUserWork, getUserRoleApi } from "@/api/essential";
export default {
  components: {
    LsButton,
    Search,
    Tablecolumn,
    DropDown,
    Particulars,
  },
  data() {
    return {
      statusId: 0,
      statusName: 0,
      WorkOrderStatus: [], //角色
      listste: [],
      page: {},
      disable: true,
      disable1: false,
      dialogVisible: false,
      searchFrom: {
        // 搜索表单数据
        pageIndex: 1,
         userName: '',
         roleName: ''
      },
      formData: {
        userName: "", //人员名称
        regionName: "", //归属区域
        roleName: "", //角色
        mobile: "", //联系电话
      },
    };
  },
  computed: {},
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getUserRole();
    this.getUserSearchUserWork();
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  methods: {
    // 数据列表
    async getUserSearchUserWork() {
      const { data } = await getUserSearchUserWork(this.searchFrom);
      this.listste = data.currentPageRecords
      // console.log(data);
    // console.log(this.searchFrom);
      this.page = data;
    },

    // 角色列表
    async getUserRole() {
      const { data } = await getUserRoleApi();
      this.WorkOrderStatus = data;
      console.log(data);
    },

    // 下一页
    NextPage() {
      if (this.searchFrom.pageIndex < this.page.totalPage) {
        this.searchFrom.pageIndex++;
        this.disable = false;
        return this.getUserSearchUserWork();
      }
      this.disable1 = true;
    },
    // 上一页
    PreviousPage() {
      if (this.searchFrom.pageIndex > 1) {
        this.searchFrom.pageIndex--;
        return this.getUserSearchUserWork();
      }
      this.disable = true;
    },

    // 搜索
    async JobSearch() {
      this.searchFrom.pageIndex = 1
     await this.getUserSearchUserWork();
      // console.log(this.$refs.search);
    },
    redact() {
      this.dialogVisible = true;
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
