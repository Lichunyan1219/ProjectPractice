<template>
  <el-row class="header-row" type="flex" justify="space-between">
    <el-col class="statistics day">
      <div class="title">日销售后统计</div>
      <el-row type="flex" class="statistics-row" justify="space-around">
        <el-col :span="6" class="item">
          <span class="item-figure blueshadow">{{ daySales }}</span>
          <div class="item-subscript subscript1">当日销售量(个)</div>
        </el-col>
        <el-col :span="6" class="item">
          <span class="item-figure blueshadow">{{ daysale }}</span>
          <div class="item-subscript subscript1">当日销售额(元)</div>
        </el-col>
        <el-col :span="6" class="item">
          <span class="item-figure blueshadow">{{ dayseparate }}</span>
          <div class="item-subscript subscript1">当日分成(元)</div>
        </el-col>
      </el-row>
    </el-col>
    <el-col class="statistics month">
      <div class="title">月销售后统计</div>
      <el-row type="flex" class="statistics-row" justify="space-around">
        <el-col :span="6" class="item">
          <span class="item-figure redshadow2">{{ monthSales }}</span>
          <div class="item-subscript subscript2">当月销售量(个)</div>
        </el-col>
        <el-col :span="6" class="item">
          <span class="item-figure redshadow2">{{ monthsale }}</span>
          <div class="item-subscript subscript2">当月销售额(万元)</div>
        </el-col>
        <el-col :span="6" class="item">
          <span class="item-figure redshadow2">{{ monthseparate }}</span>
          <div class="item-subscript subscript2">当月分成(元)</div>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import moment from 'moment' // 处理时间
import { getOrdersTotal, getearning, getseparate } from '@/api/Reconciliation'
export default {
  // 组件
  components: {},
  // 数据
  data() {
    return {
      daySales: '', // 日销售量
      daysale: '', // 日销售额
      dayseparate: '', // 日分成
      monthSales: '', // 月销售量
      monthsale: '', // 月销售额
      monthseparate: '', // 月分成
      moment
    }
  },

  // 计算属性
  computed: {},

  // 创建后
  async created() {
    const data = await this.initialtime()
    this.daySales = await this.OrdersTotal(data)
    this.daysale = await this.earning(data)
    this.dayseparate = await this.separate(data)
  },

  // 函数
  methods: {
    // 月统计
    Monthlystatistics(Sales, sale, separate) {
      console.log(1, Sales, sale, separate)
      this.monthSales = Sales
      this.monthsale = sale
      this.monthseparate = separate
    },
    // 销售量
    async OrdersTotal(arr) {
      const { data } = await getOrdersTotal(arr)
      return data
    },
    // 销售额
    async earning(arr) {
      let sale = ''
      const { data } = await getearning(arr)
      if (data >= 10000) {
        sale = (data / 1000).toFixed(2)
        return sale
      } else {
        return data
      }
    },
    // 分成
    async separate(arr) {
      const { data } = await getseparate(arr)
      return data
    },
    // 初始时间
    initialtime() {
      const day = {} // 日
      const daystart = this.moment().startOf('day').toDate() // 今天开始时间
      const dayend = this.moment().endOf('day').toDate() // 今天结束时间
      day.end = this.moment(daystart).format('YYYY-MM-DD HH:mm:ss')
      day.start = this.moment(dayend).format('YYYY-MM-DD HH:mm:ss')
      return day
    }
  }
}
</script>

<style lang="scss" scoped>
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
    background: url("../assets/bgimg.png") 0px 0px no-repeat,
      url("../assets/day1.png") calc(100% - 12px) 100% no-repeat
        rgb(233, 243, 255);
    background-repeat: no-repeat, no-repeat;
    background-position: 0px 0px, calc(100% - 12px) 100%;
  }
  .month {
    background: url("../assets/month.png") calc(100% - 12px) 100% no-repeat
      rgb(251, 239, 232);
  }
}
  .statistics-row {
    height: 106px;
    .item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      .item-figure {
        font-size: 36px;
        font-family: PingFangSC-Semibold, "PingFang SC";
        font-weight: 600;
        line-height: 50px;
      }
      .blueshadow {
        color: rgb(7, 32, 116);
        text-shadow: rgb(85 132 255 / 50%) 2px 4px 7px;
      }
      .redshadow2 {
        text-shadow: rgb(255 99 85 / 50%) 2px 4px 7px;
        color: rgb(255, 87, 87);
      }
      .item-subscript {
        height: 17px;
        margin-top: 3px;
        font-size: 12px;
      }
      .subscript1 {
        color: rgb(145, 167, 220);
      }
      .subscript2 {
        color: rgb(222, 150, 144);
      }
    }
  }
</style>
