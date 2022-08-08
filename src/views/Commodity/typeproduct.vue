<!-- 商品类型 -->
<template>
  <div>
    <div class="WorkOrder">
      <el-form class="title-from" label-width="80px" label-position="right">
        <search ref="search" :model.sync="className" title="商品搜索：" />
        <lsButton icon="el-icon-search" title="搜索" @click="SearchItemType" />
      </el-form>
      <el-table style="width: 100%" :lazy="true" empty-text="暂无数据" type="index"><tableColumn /></el-table>
    </div>
    <lsButton icon="el-icon-circle-plus-outline" color="addBtn" title="新建" @click="visible=true" />

    <el-table :data="ItemTypeData.currentPageRecords" style="width: 100%" :lazy="true" empty-text="暂无数据" type="index">
      <!-- <tableColumn title="操作" label="查看详情"><el-button type="text">修改</el-button></tableColumn> -->
      <el-table-column
        label="操作"
        width="180px"
      >
        <template>
          <el-button type="text">修改</el-button>
          <el-button type="text" style="color: red;">删除</el-button>
        </template>
      </el-table-column>
      <tableColumn title="序号" type="index" :pag=" ItemTypeData.pageIndex" />
      <tableColumn title="商品类型名称" label="className" />
    </el-table>
    <div class="dataBtn">
      <div class="Data">共{{ ItemTypeData.totalCount }}记录  第{{ ItemTypeData.pageIndex }}/{{ ItemTypeData.totalPage }}页</div>
      <lsButton title="上一页" color="pag" @click="PreviousPage" />
      <lsButton title="下一页" color="pag" @click="NextPage" />
    </div>
    <Dialogue :visible.sync="visible" title="新增商品类型">
      <el-form ref="fromData" :model="fromData" class="el-input" label-width="80px" label-position="left" :rules="formRules">
        <el-form-item label="商品名称：" prop="className">
          <el-input
            v-model="fromData.className"
            maxlength="15"
            show-word-limit
          />
        </el-form-item>
        <div class="addWorkBtn">
          <lsButton title="取消" color="config" @click="visible = false" />
          <lsButton title="确定" color="addBtn" @click="addCommodity" />
        </div>
      </el-form>
    </Dialogue>
  </div>
</template>

<script>
import { getCommodityType, setNewItemType } from '@/api/CommodityManagement'
import tableColumn from '@/components/tablecolumn'
import search from '@/components/search'
import lsButton from '@/components/ls-button'
import Dialogue from '@/components/Dialogue'
export default {
  components: {
    search,
    lsButton,
    tableColumn,
    Dialogue
  },
  data() {
    return {
      ItemTypeData: {},
      className: '',
      visible: false,
      fromData: {
        className: ''
      },
      formRules: {
        className: [{ required: true, message: '请输入活动名称', trigger: 'blur' }]
      },
      pageIndex: 1 // 当前页数
    }
  },
  computed: {},
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getCommodityType()
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {

  },
  methods: {
    async getCommodityType() {
      const { data } = await getCommodityType({
        className: this.className,
        pageIndex: this.pageIndex
      })
      this.ItemTypeData = data
    },
    SearchItemType() {
      this.getCommodityType()
    },
    NextPage() {
      if (this.pageIndex <= this.ItemTypeData.totalPage) {
        this.pageIndex++
        return this.getCommodityList()
      }
      this.$message.warning('已经是最后一页了')
    },
    // 上一页
    PreviousPage() {
      if (this.pageIndex > 1) {
        this.pageIndex--
        return this.getCommodityList()
      }
      this.pageIndex = 1
      this.$message.warning('已经是第一页了')
    },
    async addCommodity() {
      try {
        await this.$refs.fromData.validate()
        try {
          const res = await setNewItemType(this.fromData)
          if (res) {
            this.visible = false
          }
        } catch (err) {
          console.log(err)
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
<style scoped lang="scss">
.WorkOrder{
  width: 100%;
  height: 60px;
  background-color: #fff;
  display: flex;
  padding: 10px 20px ;
  margin: 20px;
  border-radius: 10px;
}
.Data{
  width: 100%;
  height: 100%;
  background-color: #fff;
  // line-height: 100px;
  padding-left: 30px;
  color:#dbdfe5;
}
.dataBtn{
  display: flex;
  height: 40px;
  margin-bottom: 30px;
  margin-top: 30px;
  align-items: center;
  margin-right: 30px;
}

.title-from{
  display: flex;
}
.addWorkBtn{
 display: flex;
 justify-content: center;
 align-items: center;
}
</style>
