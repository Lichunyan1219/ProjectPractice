<!-- 对账统计 -->
<template>
  <div class="main-page">
    <el-container>
      <el-header>
        <lunisolarstats ref="lunisolarstats" />
      </el-header>
      <div class="main">
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
              <el-select v-model="searchFrom.partnerName" placeholder="活动区域" clearable>
                <el-option v-for="(item,index) in Partners" :key="index" :value="item" :label="item" />
              </el-select>
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
                value-format="yyyy-MM-dd HH:mm:ss"
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
        <div class="main-Info">
          <span>笔数统计：</span>&nbsp; <span class="value">{{ Sales }}</span> <span class="unit">个</span>
          <span>收入统计：</span>&nbsp; <span class="value">{{ sale }}</span> <span class="unit">元</span>
          <span>分成统计：</span>&nbsp; <span class="value">{{ separate }}</span> <span class="unit">元</span>
        </div>
        <div class="main-table">
          <el-table
            :header-cell-style="{
              'background-color':'#fafafa'
            }"
            :data="tableData"
            style="width: 100%"
            :lazy="true"
            empty-text="暂无数据"
            highlight-current-row
          >
            <el-table-column
              prop="date"
              label="订单日期"
            />
            <el-table-column
              prop="ownerName"
              label="合作商"
            />
            <el-table-column
              prop="ratio"
              label="分成比例"
            />
            <el-table-column
              prop="orderTotalMoney"
              label="收入（元）"
            />
            <el-table-column
              prop="orderCount"
              label="笔数"
            />
            <el-table-column
              prop="totalBill"
              label="分成金额（元）"
            />
          </el-table>
          <div class="dataBtn">
            <div class="Data">共{{ Pag.totalCount }}记录  第{{ Pag.pageIndex }}/{{ Pag.totalPage }}页</div>
            <lsButton ref="btn" title="上一页" :disable="disable" color="pag" @click="PreviousPage" />
            <lsButton title="下一页" :disable="disable1" color="pag" @click="NextPage" />
          </div>
        </div>
      </div>
    </el-container>
  </div>
</template>

<script>
import moment from 'moment' // 处理时间
import { getPartnerSearch } from '@/api/PointPosition'
import { getOrdersTotal, getearning, getseparate } from '@/api/Reconciliation'
import { getCollectSearch } from '@/api/Reconciliation'
import lsButton from '@/components/ls-button'
import lunisolarstats from './components/lunisolarstats.vue'
export default {
  components: {
    lsButton,
    lunisolarstats
  },
  data() {
    return {
      searchFrom: {
        pageIndex: 1,
        start: '', // 开始时间
        end: '', // 结束时间
        partnerName: ''
      }, // 搜索
      timequantum: [], // 时间段
      tableData: [], // 表格数据
      moment, // 时间处理
      Partners: [], // 合作商
      Pag: {},
      disable1: false, // 页脚禁用
      disable: false, //
      Sales: '', // 销售量
      sale: '', // 销售额
      separate: '', // 分成
      month: {
        start: '',
        end: ''
      } // 月
    }
  },
  computed: {},
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  async created() {
    this.PartnerSearch()
    await this.initialtime()
    await this.CollectSearch()
    await this.earning()
    await this.separates()
    await this.OrdersTotal()
    await this.Monthlystatistics()
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {

  },
  methods: {
    // 合作商
    async PartnerSearch() {
      const { data } = await getPartnerSearch({ pageIndex: 1 })
      data.currentPageRecords.forEach(item => {
        this.Partners.push(item.name)
      })
    },
    // 合作商分成汇总数据
    async  CollectSearch() {
      const { data } = await getCollectSearch(this.searchFrom)
      const workList = await this.ProcessingWorkOrderStatus(data.currentPageRecords)
      this.tableData = workList
      this.Pag = data
    },
    // 搜索
    async onSubmit() {
      await this.timedisposal()
      await this.CollectSearch()
      await this.earning()
      await this.separates()
      await this.OrdersTotal()
    },
    Monthlystatistics() {
      this.$nextTick(() => {
        console.log(this.Sales, this.sale, this.separate)
        this.$refs.lunisolarstats.Monthlystatistics(this.Sales, this.sale, this.separate)
      })
    },
    // 处理工单状态
    ProcessingWorkOrderStatus(data) {
      data.forEach(ele => {
        ele.ratio = ele.ratio + '%'
        ele.orderTotalMoney = '+' + (ele.orderTotalMoney / 100).toFixed(2)
        ele.totalBill = '+' + (ele.totalBill / 100).toFixed(2)
      })
      return data
    },
    // 销售量
    async  OrdersTotal() {
      const { data } = await getOrdersTotal(this.month)
      this.Sales = data
    },
    // 销售额
    async earning() {
      let sale = ''
      const { data } = await getearning(this.month)
      if (data >= 10000) {
        sale = (data / 1000000).toFixed(2)
        this.sale = sale
      } else {
        this.sale = data
      }
    },
    // 分成
    async separates() {
      const { data } = await getseparate(this.month)
      this.separate = data
    },
    // 搜索时间处理
    timedisposal() {
      this.month.start = this.timequantum[0]
      this.month.end = this.timequantum[1]
      this.searchFrom.start = this.moment(this.timequantum[0]).format('YYYY-MM-DD')
      this.searchFrom.end = this.moment(this.timequantum[1]).format('YYYY-MM-DD')
    },
    // 初始时间
    initialtime() {
      const monthstart = this.moment().toDate() // 当前时间
      const monthend = this.moment().startOf('month').toDate() // 月初时间
      this.month.end = this.moment(monthstart).format('YYYY-MM-DD HH:mm:ss')
      this.month.start = this.moment(monthend).format('YYYY-MM-DD HH:mm:ss')
      this.timequantum.push(this.month.start)
      this.timequantum.push(this.month.start)
      this.searchFrom.end = this.moment(monthstart).format('YYYY-MM-DD')
      this.searchFrom.start = this.moment(monthend).format('YYYY-MM-DD')
    },
    // 上一页
    NextPage() {
      if (this.searchFrom.pageIndex < this.Pag.totalPage) {
        this.searchFrom.pageIndex++
        this.disable = false
        return this.CollectSearch()
      }
      this.disable1 = true
    },
    // 下一页
    PreviousPage() {
      if (this.searchFrom.pageIndex > 1) {
        this.searchFrom.pageIndex--
        return this.CollectSearch()
      }
      this.disable = true
    }
  }

}
</script>
<style scoped lang="scss">
.main-page {
  padding: 20px;
  .el-header {
    background-color: #fff;
    color: #333;
    height: 166px !important;
    padding: 0;
    margin-bottom: 20px;
    .header-row {
      height: 100%;
      .statistics {
        padding: 20px;
        border-radius: 20px;
        width: 49%;
        .title {
          font-size: 16px;
          font-weight: 600;
        }
      }
      .day {
        background: url("./assets/bgimg.png") 0px 0px no-repeat,
          url("./assets/day1.png") calc(100% - 12px) 100% no-repeat
            rgb(233, 243, 255);
        background-repeat: no-repeat, no-repeat;
        background-position: 0px 0px, calc(100% - 12px) 100%;
      }
      .month {
        background: url("./assets/month.png") calc(100% - 12px) 100% no-repeat
          rgb(251, 239, 232);
      }
    }
  }
  .main{
  background-color: #fff;
  padding-left: 17px;
  }
  .WorkOrder {
    width: 100%;
    height: 60px;
    display: flex;
    padding: 10px;
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
    .el-input {
      width: 100% !important;
    }
  }
  .main-Info{
    height: 24px;
    line-height: 24px;
    font-size: 14px;
    color: rgb(51, 51, 51);
    font-weight: 500;
    .value{
          font-size: 20px;
    color: rgb(255, 87, 87);
    }
    .unit{
    margin-right: 50px;
    font-size: 12px;
    color: rgb(0, 0, 0);
    }
  }
  .main-table{
    margin: 10px 0;
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
}
</style>
