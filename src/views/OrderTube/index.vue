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
          <el-input v-model="searchFrom.orderNo" placeholder="请输入订单编号" />
        </el-form-item>
        <el-form-item>
          <template slot="label">
            <span class="label-text"> 选择日期： </span>
          </template>
          <el-date-picker
            v-model="timequantum"
            type="daterange"
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            locale="locale"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
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
          v-loading="loading"
          :header-cell-style="{
            'background-color':'#fafafa'
          }"
          :data="tableData"
          style="width: 100%"
          :lazy="true"
          empty-text="暂无数据"
          type="index"
          highlight-current-row
        >
          <el-table-column
            label="序号"
            type="index"
            :index="indexmethod"
          />
          <el-table-column
            label="订单编号"
          >
            <template slot-scope="scope">
              <div class="orderNo">
                {{ scope.row.orderNo }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="skuName"
            label="商品名称"
          />
          <el-table-column
            prop="amount"
            label="订单金额(元)"
          />
          <el-table-column
            prop="innerCode"
            label="设备编号"
          />
          <el-table-column
            prop="status"
            label="订单状态"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.status === 0">未支付</span>
              <span v-if="scope.row.status === 1">支付完成</span>
              <span v-if="scope.row.status === 2">出货成功</span>
              <span v-if="scope.row.status === 3">出货失败</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="商品日期"
          />
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="lineitem(scope)">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>

        <div v-if="Pag.totalCount > 10" class="dataBtn">
          <div class="Data">共{{ Pag.totalCount }}记录  第{{ Pag.pageIndex }}/{{ Pag.totalPage }}页</div>
          <lsButton ref="btn" title="上一页" :disable="disable" color="pag" @click="PreviousPage" />
          <lsButton title="下一页" :disable="disable1" color="pag" @click="NextPage" />
        </div>
      </div>
    </body>
  </div>
</template>

<script>
import { getIndentSearch } from '@/api/strategy'
import lsButton from '@/components/ls-button'
import moment from 'moment' // 处理时间
export default {
  components: {
    lsButton
  },
  data() {
    return {
      searchFrom: {
        pageIndex: 1,
        orderNo: '',
        startDate: '',
        endDate: ''
      }, // 搜索
      tableData: [
      ], // 表格数据
      moment, // 处理时间
      Pag: '', // 分页数据
      disable1: false, // 页脚禁用
      disable: false, //
      loading: false, // 加载
      timequantum: [] // 时间段
    }
  },
  computed: {},
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.PolicySearch()
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  methods: {
    // 获取数据
    async PolicySearch() {
      this.loading = true
      try {
        const { data } = await getIndentSearch(this.searchFrom)
        const workList = await this.ProcessingWorkOrderStatus(data.currentPageRecords)
        this.tableData = workList
        this.Pag = data
      } finally {
        this.loading = false
      }
    },
    // 搜索
    async onSubmit() {
      await this.timedisposal()
      await this.PolicySearch()
    },
    // 时间处理
    timedisposal() {
      this.searchFrom.endDate = this.timequantum[1]
      this.searchFrom.startDate = this.timequantum[0]
    },
    lineitem(label) {
      console.log(label)
    },
    // 处理工单状态
    ProcessingWorkOrderStatus(data) {
      data.forEach(ele => {
        ele.createTime = this.moment(ele.createTime).utcOffset(8).format('YYYY.MM.DD HH:mm:ss')
        ele.amount = (ele.amount / 100).toFixed(2)
      })
      return data
    },
    // 序号
    indexmethod(index) {
      return this.Pag.pageIndex + index - 9
    },
    // 上一页
    NextPage() {
      if (this.searchFrom.pageIndex < this.Pag.totalPage) {
        this.searchFrom.pageIndex++
        this.disable = false
        return this.PolicySearch()
      }
      this.disable1 = true
    },
    // 下一页
    PreviousPage() {
      if (this.searchFrom.pageIndex > 1) {
        this.searchFrom.pageIndex--
        return this.PolicySearch()
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
    .orderNo{
    overflow: hidden;
    text-overflow: ellipsis;
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
