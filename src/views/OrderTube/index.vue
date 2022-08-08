<!-- 订单管理 -->
<template>
  <div class="main-page">
    <!-- 头部 -->
    <div class="WorkOrder">
      <el-form
        :inline="true"
        size="medium"
        :model="searchFrom"
        label-width="82px"
        class="demo-form-inline"
      >
        <el-form-item>
          <template slot="label">
            <span class="label-text"> 订单编号： </span>
          </template>
          <el-input v-model="searchFrom.user" placeholder="请输入订单编号" />
        </el-form-item>
        <el-form-item>
          <template slot="label">
            <span class="label-text"> 选择日期： </span>
          </template>
          <el-date-picker
            v-model="searchFrom.rei"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            locale="locale"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            class="item-btn"
            icon="el-icon-search"
            @click="onSubmit"
          >查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <body>
      <div class="Strategy-main">
        <el-table
          :data="tableData"
          style="width: 100%"
          :lazy="true"
          empty-text="暂无数据"
          type="index"
        >
          <tableColumn title="操作">
            <el-button type="text">文字按钮</el-button>
            <el-button type="text">按钮</el-button>
            <el-button type="text">按钮</el-button>
          </tableColumn>
          <tableColumn title="序号" type="index" pag="1" />
          <tableColumn title="策略名称" label="policyName" />
          <tableColumn title="策略方案" label="discount" />
          <tableColumn title="创建日期" label="createTime" />
        </el-table>
        <div class="dataBtn">
          <div class="Data">共30记录 第4/30页</div>
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
      </div>
    </body>
  </div>
</template>

<script>
import lsButton from '@/components/ls-button'
import tableColumn from '@/components/tablecolumn'
export default {
  components: {
    lsButton,
    tableColumn
  },
  data() {
    return {
      formInline: {},
      searchFrom: {
        user: '',
        rei: ''
      },
      WorkOrderList: [],
      pag: '', // 分页数据
      pageIndex: 1,
      disable: true,
      disable1: false,
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1517 弄',
          zip: 200333
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1519 弄',
          zip: 200333
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1516 弄',
          zip: 200333
        }
      ]
    }
  },
  computed: {},
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    // this.TaskSearch()
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  methods: {
    async TaskSearch() {
      try {
        const { data } = await // this.tableData = data.currentPageRecords
        console.log(1, data)
      } catch (error) {
        // jj
      }
    },
    onSubmit() {
      console.log(this.searchFrom)
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
    }
  }
}
</script>
<style scoped lang="scss">
.main-page {
  padding: 20px;
  //  头部
  .WorkOrder {
    width: 100%;
    height: 60px;
    background-color: #fff;
    display: flex;
    padding: 10px 20px;
    margin-bottom: 20px;
    border-radius: 10px;
    .label-text {
      font-weight: 400;
    }
    .item-btn {
      background-color: rgb(95, 132, 255);
      border-color: rgb(95, 132, 255);
      height: 36px;
      width: 80px;
      font-size: 16px;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .title-from {
      display: flex;
    }
    // .el-form-item{
    //   margin-bottom: 10px;
    // }
    .el-input {
      width: 100% !important;
    }
  }
  body {
    background-color: #fff;
    padding: 20px 15px 19px 17px;
    .body-btn {
      margin-bottom: 20px;
      :deep(.search) {
        margin: 0;
      }
    }
  }
  // 页码
  .dataBtn {
    display: flex;
    margin-bottom: 30px;
    margin-top: 30px;
    align-items: center;
    margin-right: 30px;
    .Data {
      width: 100%;
      height: 40px;
      background-color: #fff;
      line-height: 40px;
      // line-height: 100px;
      padding-left: 30px;
      color: #dbdfe5;
    }
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

  .BackOrder {
    color: #4368e1;
    cursor: pointer;
  }
  //按钮
  .addWorkBtn {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
