<template>
  <el-form
    size="medium"
    label-width="128px"
    highlight-current-row
  >
    <el-form-item>
      <template slot="label">
        <span class="label-text"> 策略名称: </span>
      </template>
      <span>{{ strategyitem.policyName }}</span>
    </el-form-item>
    <el-form-item>
      <template slot="label">
        <span class="label-text"> 策略方案: </span>
      </template>
      <el-table v-loading="loading" :data="tableData" style="width: 100%" :lazy="true" empty-text="暂无数据" type="index" highlight-current-row>
        <el-table-column
          label="序号"
          type="index"
          :index="indexmethod"
        />
        <el-table-column
          prop="nodeName"
          label="点位名称"
        />
        <el-table-column
          prop="innerCode"
          label="设备编号"
        />
      </el-table>

      <div v-if="Pag.totalCount > 10" class="dataBtn">
        <div class="Data">共{{ Pag.totalCount }}记录  第{{ Pag.pageIndex }}/{{ Pag.totalPage }}页</div>
        <lsButton ref="btn" title="上一页" :disable="disable" color="pag" @click="PreviousPage" />
        <lsButton title="下一页" :disable="disable1" color="pag" @click="NextPage" />
      </div>
    </el-form-item>
  </el-form>
</template>

<script>
import lsButton from '@/components/ls-button'
import { Strategiesdetails } from '@/api/strategy'
export default {
  // 组件
  components: {
    lsButton
  },
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  // 数据
  data() {
    return {
      searchFrom: {
        pageIndex: 1
      },
      tableData: [], // 表格数据
      Pag: '',
      disable1: false, // 页脚禁用
      disable: false, //
      loading: false, // 加载
      strategyitem: {}// 策略

    }
  },

  // 计算属性
  computed: {
  },

  // 创建后
  created() {
    // if (this.strategyitem.policyId) {
    //   this.Strategiesdetails()
    // } else {
    //   this.$emit('update:visible', false) // 关闭
    // }
  },

  // 函数
  methods: {
    async  Strategiesdetails() {
      this.loading = true
      try {
        const { data } = await Strategiesdetails(this.strategyitem.policyId, this.searchFrom)
        this.tableData = data.currentPageRecords
        this.Pag = data
      } finally {
        this.loading = false
      }
    },
    getDetail(row) {
      this.strategyitem = { ...row }
      this.Strategiesdetails(row.policyId)
    },
    indexmethod(index) {
      return this.Pag.pageIndex + index - 9
    },
    // 上一页
    NextPage() {
      if (this.searchFrom.pageIndex < this.Pag.totalPage) {
        this.searchFrom.pageIndex++
        this.disable = false
        return this.Strategiesdetails()
      }
      this.disable1 = true
    },
    // 下一页
    PreviousPage() {
      if (this.searchFrom.pageIndex > 1) {
        this.searchFrom.pageIndex--
        return this.Strategiesdetails()
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
