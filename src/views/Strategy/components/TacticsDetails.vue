<template>
  <el-form
    size="medium"
    style="background-color:red"
    label-width="128px"
    highlight-current-row
  >
    <el-form-item>
      <template slot="label">
        <span class="label-text"> 策略名称 </span>
      </template>
      <span>策略名称</span>
    </el-form-item>
    <el-form-item>
      <template slot="label">
        <span class="label-text"> 策略方案 </span>
      </template>
      <el-table
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          prop="date"
          label="日期"
          width="180"
        />
        <el-table-column
          prop="name"
          label="姓名"
          width="180"
        />
        <el-table-column
          prop="address"
          label="地址"
        />
      </el-table>

      <div v-if="judgepage" class="dataBtn">
        <div class="Data">共{{ Pag.totalCount }}记录  第{{ Pag.pageIndex }}/{{ Pag.totalPage }}页</div>
        <lsButton ref="btn" title="上一页" :disable="disable" color="pag" @click="PreviousPage" />
        <lsButton title="下一页" :disable="disable1" color="pag" @click="NextPage" />
      </div>
    </el-form-item>
  </el-form>
</template>

<script>
import lsButton from '@/components/ls-button'
export default {

  // 组件
  components: {
    lsButton
  },
  // 数据
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      Pag: '',
      disable1: false // 页脚禁用
    }
  },

  // 计算属性
  computed: {
    judgepage() {
      return this
    //   if (this.Pag.totalCount > 10) {
    //     return true
    //   } else {
    //     return false
    //   }
    }
  },

  // 创建后
  created() {

  },

  // 函数
  methods: {
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
   .label-text {
      font-weight: 400;
    }
    // 页码
.dataBtn{
  display: flex;
  margin-bottom: 30px;
  margin-top: 30px;
  align-items: center;
  margin-right: 30px;
  .Data{
  width: 100%;
  height: 40px;
  background-color: #fff;
  line-height: 40px;
  // line-height: 100px;
  padding-left: 30px;
  color:#dbdfe5;

}
}
</style>
