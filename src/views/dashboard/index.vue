<template>
  <div class="dashboard-container">
    <el-row :gutter="20">
      <el-col :span="11"><div class="Statistics">
        <span class="BackOrder">工单统计：</span> <span class="BackOrder1">2022-07-01~2022-08-09</span>
        <el-row :gutter="20">
          <el-col :span="6"><div class="BackOrder2">{{ TotalWorkOrders.length }}</div></el-col>
          <el-col :span="6"><div class="BackOrder2">{{ CompleteWorkOrder.length }}</div></el-col>
          <el-col :span="6"><div class="BackOrder2">{{ CarryOutWorkOrder.length }}</div></el-col>
          <el-col :span="6"><div class="BackOrder2">{{ CancelWorkOrder.length }}</div></el-col>
          <el-col :span="6"><div class="BackOrder3">工单总数(个)</div></el-col>
          <el-col :span="6"><div class="BackOrder3">完成工单(个)</div></el-col>
          <el-col :span="6"><div class="BackOrder3">进行工单(个)</div></el-col>
          <el-col :span="6"><div class="BackOrder3">取消工单(个)</div></el-col>
        </el-row>
        <el-row />
      </div></el-col>
      <el-col :span="9"><div class="Statistics Statistics1">
        <span class="BackOrder">工单统计：</span> <span class="BackOrder1">2022-07-01~2022-08-09</span>
        <el-row :gutter="20">
          <el-col :span="12"><div class="BackOrder5">{{ OrderQuantity }}</div></el-col>
          <el-col :span="12"><div class="BackOrder5">{{ (SalesQuota/10000).toFixed(2) }}</div></el-col>
          <el-col :span="12"><div class="BackOrder4">订单量(个)</div></el-col>
          <el-col :span="12"><div class="BackOrder4">销售额(万)</div></el-col>
        </el-row></div>
      </el-col>
      <el-col :span="4"><div class="">
        <span class="BackOrder">商品热榜:</span> <br> <span class="BackOrder1">2022-07-01~2022-08-09</span>
        <el-row :gutter="20" class="CommodityRank">
          <el-col v-for="(item , index) in CommodityRank" :key="index"><div class="BackOrder6"><span>{{ index+1 }}  {{ item.skuName }}单</span><span>{{ item.count }}</span></div></el-col>
        </el-row>
      </div></el-col>
    </el-row>
    <div class="ecstyle1">
      <div id="echartsdemo" ref="container" />
      <div id="echartsdemo" ref="container1" />
    </div>
  </div>
</template>

<script>
import { getWorkOrderList, GetSales, GetOrderQuantity, GetLeadErboard } from '@/api/home'
import * as ec from 'echarts'
export default {
  name: 'Dashboard',
  data() {
    return {
      value1: ['2022-08-01 00:00:00', '2022-08-09 00:00:00'],
      value: ['2022-08-01', '2022-08-09'],
      CancelWorkOrder: [], // 取消工单
      CarryOutWorkOrder: [], // 进行工单
      OrderQuantity: '', // 订单量
      SalesQuota: '', // 销售额度
      CommodityRank: [], // 商品排行榜
      CompleteWorkOrder: [], // 完成工单
      TotalWorkOrders: [], // 工单总数
      echartsinstance: null,
      echartsinstance1: null,
      options: {
        tooltip: {},
        title: { text: '销售趋势图' },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true
          }
        ]
      },
      options1: {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            }
          }
        ]
      }
    }
  },
  computed: {
  },
  created() {
    this.getWorkOrderList()
    this.GetSales()
  },
  mounted() {
    this.echartsinstance = ec.init(this.$refs.container)
    this.echartsinstance1 = ec.init(this.$refs.container1)
    this.echartsinstance.setOption(this.options)
    this.echartsinstance1.setOption(this.options1)
  },
  methods: {
    async getWorkOrderList() {
      const { data: { currentPageRecords }} = await getWorkOrderList({
        start: this.value[0],
        end: this.value[1],
        pageSize: 10000000
      })
      this.TotalWorkOrders = currentPageRecords
      this.WorkOrderClassification(currentPageRecords)
    },
    // 工单分类
    WorkOrderClassification(data) {
      this.CancelWorkOrder = data.filter((ele) => {
        return ele.taskStatusTypeEntity.statusId === 3
      })
      this.CompleteWorkOrder = data.filter((ele) => {
        return ele.taskStatusTypeEntity.statusId === 4
      })
      this.CarryOutWorkOrder = data.filter((ele) => {
        return ele.taskStatusTypeEntity.statusId === 1
      })
    },
    async GetSales() {
      const res = await GetSales(this.value1[0], this.value1[1])
      const res1 = await GetOrderQuantity(this.value1[0], this.value1[1])
      this.OrderQuantity = res1.data
      this.SalesQuota = res.data
      const res2 = await GetLeadErboard(this.value[0], this.value[1])
      this.CommodityRank = res2.data
      console.log(res2)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-row{
  padding: 50px;
}
.Statistics{
  height: 166px;
  background-color: #e9f3ff;
  border-radius: 20px;
  padding: 10px;
}
.BackOrder{
  color:#333;
font-size: 16px;
font-weight: 600;
}
.BackOrder2{
  color:#072074;
  font-size: 40px;
}
.BackOrder3{
  color:#91b5ec;
}
.BackOrder4{
  color:#de9690;
}
.BackOrder5{
  color:#ff5757;
   font-size: 40px;
}
.Statistics1{
  background-color: #fbefe8;
}
.CommodityRank{
  padding: 0 ;
  padding-top: 20px;
  height: 538px;
}
.BackOrder6{
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
}
.ecstyle{
width: 100%;
height: 100%;

  // margin-top: 180px;
  border-radius: 20px;
  margin-left: 10px;
}
.ecstyle1{
  position: absolute;
  top: 277px;
  right: 0;
  left: 49px;
 width: 1015px;
  height: 350px;
  // background-color: red;
  border-radius: 20px;
  display: flex;
  padding: 20px;
}
#echartsdemo{
  width: 500px;
  height: 300px;
  flex: 1;
}
</style>
