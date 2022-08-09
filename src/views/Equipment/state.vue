<!-- 设备状态 -->
<template>
  <div>
    <!-- 头部查询部分 -->
    <StateTop label="设备编号 : " @click="query" />

    <!-- 主渲染部分 -->
    <div class="main">
      <el-table :data="tableData" fit>
        <el-table-column type="index" :index="indexMethod" label="序号" />
        <el-table-column prop="innerCode" label="设备编号" />
        <el-table-column prop="type.name" label="设备型号" />
        <el-table-column prop="node.name" label="详细地址" />
        <el-table-column prop="vmStatus" label="运营状态">
          <template slot-scope="scope">
            {{ { 0: "未投放", 1: "运营", 3: "撤机" }[scope.row.vmStatus] }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="设备状态" width="300">
          <template slot-scope="scope">
            <div class="vm-status">
              <div
                class="item"
                :class="{ 'item-false': !scope.row.status[10001] }"
              >
                离线
              </div>
              <div
                class="item"
                :class="{ 'item-false': !scope.row.status[10002] }"
              >
                货道
              </div>
              <div
                class="item"
                :class="{ 'item-false': !scope.row.status[10003] }"
              >
                转动轴
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="details(scope.row)"
            >查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <Dialog title="设备详情" :visible.sync="visible">
        <el-row type="flex" justify="space-around" align="middle">
          <el-col>销售量：</el-col>
          <el-col>销售额：</el-col>
          <el-col>补货次数：{{ supplyNum }}次</el-col>
          <el-col>维修次数：{{ fixNum }}次</el-col>
        </el-row>
        <div class="mid-title">商品销量（月）</div>
        <el-row>
          <el-col
            v-for="(item, index) in goodsSalesList"
            :key="index"
            :span="6"
          >
            <div class="sales">
              <div class="left">{{ item.skuName }} ：</div>
              <div class="right">{{ item.count }}</div>
            </div>
          </el-col>
        </el-row>
      </Dialog>
    </div>
    <!-- 底部页码 -->
    <div class="bottom">
      <div class="left">
        共{{ pageInfo.totalCount }}条数据 第{{ pageInfo.pageIndex }}/{{
          pageInfo.totalPage
        }}页
      </div>
      <div class="right">
        <Button
          color="#d5ddf8"
          title="上一页"
          :disabled="disabled"
          @click="lastPage"
        />
        <Button
          color="#d5ddf8"
          title="下一页"
          :disabled="disabled2"
          @click="nextPage"
        />
      </div>
    </div>
  </div>
</template>

<script>
import StateTop from './component/state-top.vue'
import Button from '@/components/ls-button'
import Dialog from '@/components/Dialogue'
import {
  getmachineList,
  getGoodsSales,
  getFixNum,
  getsupplyNum
} from '@/api/machine'
export default {
  components: { Button, Dialog, StateTop },
  data() {
    return {
      tableData: [
        {
          innerCode: '',
          type: '',
          node: '',
          vmStatus: '',
          status: ''
        }
      ],
      goodsSalesList: [],
      fixNum: '',
      supplyNum: '',
      pageInfo: {},
      page: 1,
      visible: false,
      disabled: false,
      disabled2: false
    }
  },
  created() {
    this.getmachineList()
  },
  methods: {
    // 查询设备编号
    async query(code) {
      console.log(code)
      const res = await getmachineList({
        innerCode: code
      })
      this.pageInfo = res.data
      console.log(res.data)
      this.tableData = res.data.currentPageRecords
    },
    // 弹出框
    details(val) {
      this.visible = true
      this.getGoodsSales(val)
      this.getFixNum(val)
      this.getsupplyNum(val)
      // console.log(val);
    },
    // 页码
    indexMethod(index) {
      return index + 1 + 10 * (this.page - 1)
    },
    // 获取售货机列表
    async getmachineList() {
      const { data } = await getmachineList({
        pageIndex: this.page
      })
      // console.log(data.currentPageRecords);
      this.pageInfo = data
      this.tableData = data.currentPageRecords
    },
    // 上一页
    lastPage() {
      if (this.page < 2) {
        this.disabled = true
        return
      }
      this.disabled = false
      this.page--
      this.getmachineList()
    },
    // 下一页
    nextPage() {
      if (this.page >= this.pageInfo.totalPage) {
        this.page = this.pageInfo.totalPage
        this.disabled2 = true
        return
      }
      this.disabled2 = false
      this.page++
      this.getmachineList()
    },
    // 获取售货机商品销量
    async getGoodsSales(val) {
      const startTime = val.createTime.substr(0, 10)
      const endTime = this.dayjs().format('YYYY-MM-DD')
      const res = await getGoodsSales(val.innerCode, startTime, endTime, {
        vmType: val.type.typeId,
        nodeId: val.region.id,
        createUserId: val.node.createUserId
      })
      // console.log(res.data);
      this.goodsSalesList = res.data
    },
    // 获取售货机维修次数
    async getFixNum(val) {
      const startTime = val.createTime.substr(0, 10)
      const endTime = this.dayjs().format('YYYY-MM-DD')
      const res = await getFixNum(val.innerCode, startTime, endTime, {
        vmType: val.type.typeId,
        nodeId: val.region.id,
        createUserId: val.node.createUserId
      })
      this.fixNum = res.data
    },
    // 获取售货机补货次数
    async getsupplyNum(val) {
      const startTime = val.createTime.substr(0, 10)
      const endTime = this.dayjs().format('YYYY-MM-DD')
      const res = await getsupplyNum(val.innerCode, startTime, endTime, {
        vmType: val.type.typeId,
        nodeId: val.region.id,
        createUserId: val.node.createUserId
      })
      this.supplyNum = res.data
    }
  }
}
</script>
<style scoped lang="scss">
.main {
  .vm-status {
    display: flex;
    .item {
      text-align: center;
      padding: 0 5px;
      color: #fff;
      border-radius: 11px;
      margin-left: 10px;
      width: 52px;
      height: 23px;
      background: #ff665f linear-gradient(135deg, #3fc997, #4bda98);
    }
    .item-false {
      text-align: center;
      padding: 0 5px;
      color: #fff;
      border-radius: 11px;
      margin-left: 10px;
      width: 52px;
      height: 23px;
      background: #ff665f linear-gradient(135deg, #ffb043, #ffc020);
    }
  }
  .mid-title {
    padding: 20px 0 10px;
  }
  .sales {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 40px;
    border: 1px solid #ccc;
    .left {
      width: 60%;
    }
  }
}

.bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
}
</style>
