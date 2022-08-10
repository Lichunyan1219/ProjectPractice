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
          :model.sync="searchFrom.userName"
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
        @click="redactsrc"
      />
      <!-- 新建 -->

      <!-- 列表 -->
      <el-table
        :data="listste"
        style="width: 100%"
        :lazy="true"
        empty-text="暂无数据"
        type="index"
      >
        <el-table-column prop="date" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="redact(scope.row)">编辑</el-button>
            <el-button type="text" style='color:red;' @click="onRemove(scope.row)">删除</el-button>
          </template>
        </el-table-column>

        </el-table-column>
        <Tablecolumn title="序号" type="index" :pag="page.pageIndex" />
        <Tablecolumn title="人员名称" label="userName" />
        <Tablecolumn title="归属区域" label="regionName" />
        <Tablecolumn title="角色" label="role.roleName" />
        <Tablecolumn title="联系电话" label="mobile" />
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
      <Information :visible.sync="dialogVisible" ref="formData"/>
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
    Information,
  },
  data() {
    return {
      page: {},
      listste: [],
      disable: true,
      disable1: false,
      dialogVisible: false,
      searchFrom: {
        // 搜索表单数据
        pageIndex: 1,
        userName: "",
      },
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
    this.getUserId();
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  methods: {
    // 获取列表
    async getUserId() {
      const { data } = await getSearchApi(this.searchFrom);
      this.listste = data.currentPageRecords;
      //   console.log(data);
      // console.log(this.searchFrom);
      this.page = data;
    },
    // 下一页
    NextPage() {
      if (this.searchFrom.pageIndex < this.page.totalPage) {
        this.searchFrom.pageIndex++;
        this.disable = false;
        return this.getUserId();
      }
      this.disable1 = true;
    },
    // 上一页
    PreviousPage() {
      if (this.searchFrom.pageIndex > 1) {
        this.searchFrom.pageIndex--;
        return this.getUserId();
      }
      this.disable = true;
    },

    // 搜索
    async JobSearch() {
      this.searchFrom.pageIndex = 1;
      await this.getUserId();
    },
    // 编辑
    redact(val) {
      this.$refs.formData.formData
      // console.log(res);
      this.dialogVisible = true;
      // console.log(val)
      this.$refs.formData.formData.regionName=val.regionName
      this.$refs.formData.formData.mobile=val.mobile
      this.$refs.formData.formData.image=val.image
      this.$refs.formData.formData.status=val.status
      this.$refs.formData.formData.roleId=val.roleId
      this.$refs.formData.formData.userName=val.userName
    },

// 新增
    redactsrc() {
      this.dialogVisible = true;
    },

    // 删除
    async onRemove(val) {
      try {
        await this.$confirm('此操作将永久删除该人员, 是否继续?', '提示', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning',
        })
        await deleteUserIDApi(val.id)
       this.$message.success('删除成功')
        this.getUserId();
      } catch (error) {
        console.log(error);
      }
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
