<!-- 人员列表 -->
<template>
  <div>
    <!-- 头部搜索 -->
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
          class="title-searchs"
          :model.sync="searchFrom.taskCode"
        />
        <LsButton title="查询" icon="el-icon-search" @click="JobSearch" />
      </el-form>
    </div>
    <!-- 头部搜索 -->

    <div>
      <!-- 新建 -->
      <LsButton
        icon="el-icon-circle-plus-outline"
        color="addBtn"
        title="新建"
        @click="redact"
      />
      <!-- 新建 -->

      <!-- 列表 -->
      <el-table
        :data="page.currentPageRecords"
        style="width: 100%"
        :lazy="true"
        empty-text="暂无数据"
        type="index"
      >
        <Tablecolumn title="操作">
          <el-button type="text" @click="redact">编辑</el-button>
          <el-button type="text" class="el-button1" @click="onRemove">删除</el-button>
        </Tablecolumn>
        <Tablecolumn
          title="序号"
          type="index"
          :pag="page.pageIndex"
        />
        <Tablecolumn title="人员名称" label="userName" />
        <Tablecolumn title="归属区域" label="regionName" />
        <Tablecolumn title="角色" label="role.roleName" />
        <Tablecolumn title="联系电话" label="mobile" />
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
      <Information :visible.sync="dialogVisible" />
    </div>
  </div>
</template>

<script>
import LsButton from "@/components/ls-button"; //按钮
import Search from "@/components/search"; //输入框
import Tablecolumn from "@/components/tablecolumn"; //列表
import Information from "./components/information.vue";
import { getSearchApi, deleteUserIDApi } from "@/api/essential";
export default {
  components: {
    LsButton,
    Search,
    Tablecolumn,
    Information
  },
  data() {
    return {
      page: {},
      pageIndex: 1,
      listste: [],
      WorkOrderList: [],
      disable: true,
      disable1: false,
      dialogVisible: false,
      searchFrom: {
        // 搜索表单数据
        taskCode: ''
      }
        // 搜索表单数据
    };
  },
  components: {
    LsButton,
    Search,
    Tablecolumn,
    Information,
  },
  computed: {},
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getUserId()
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  methods: {
    // 获取列表
    async getUserId() {
      const { data } = await getSearchApi({
        pageIndex: this.pageIndex,
        ...this.searchFrom
      });
      this.page = data;
    },
    // 下一页
    NextPage() {
      if (this.pageIndex < this.page.totalPage) {
        this.pageIndex++
        this.disable = false
        return this.getUserId()
      }
      this.disable1 = true
    },
    // 上一页
    PreviousPage() {
      if (this.pageIndex > 1) {
        this.pageIndex--
        return this.getUserId()
      }
      this.disable = true
    },

    // 搜索
    async JobSearch() {
     const res = await getSearchApi({
        userName:this.searchFrom.taskCode
      })
     this.page.currentPageRecords = res
      this.getUserId()
      console.log(res);
    },
    redact() {
      this.dialogVisible = true;
    },

    // 删除
    async onRemove () {
      // try {
      //   await this.$confirm('此操作将永久删除该部门, 是否继续?', '提示', {
      //     confirmButtonText: '删除',
      //     cancelButtonText: '取消',
      //     type: 'warning',
      //   })
      //   await deleteUserIDApi(this.listste.id)
      //   // this.getUserId()
      //   this.$message.success('删除成功')
      //   this.$emit('remove')
      //   console.log(this.listste.id);
      // } catch (error) {
      //   console.log(error);
      // }
      await deleteUserIDApi(this.listste.id)
      console.log(this.listste.id);
    }
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
.el-form-item__label {
  padding: 0 1px 0 0;
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
.el-button1 {
  color: red;
}
</style>
