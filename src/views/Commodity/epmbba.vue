<!-- 商品管理 -->
<template>
  <div>
    <!-- 头部 -->
    <div class="WorkOrder">
      <el-form class="title-from" label-width="80px" label-position="right">
        <search ref="search" title="商品搜索" :model.sync="skuName" />
        <lsButton icon="el-icon-search" @click="ProductSearch" />
      </el-form>
    </div>
    <div>
      <!-- 添加按钮 -->
      <lsButton icon="el-icon-circle-plus-outline" color="addBtn" title="新建" @click="ClosePopUpWindow" />
      <lsButton title="导入数据" color="config" />
      <el-table :data="commodityList" style="width: 100%" :lazy="true" empty-text="暂无数据" type="index">
        <!-- <tableColumn title="操作" label="查看详情"><el-button type="text">修改</el-button></tableColumn> -->
        <el-table-column
          label="操作"
        >
          <template slot-scope="scope">
            <el-button type="text" @click="ModifyCommodityData(scope)">修改</el-button>
          </template></el-table-column>
        <tableColumn title="序号" type="index" :pag=" PageData.pageIndex" />
        <tableColumn title="商品名称" label="brandName" />
        <tableColumn title="商品图片" :img="true" />
        <tableColumn title="规格" label="unit" />
        <tableColumn title="商品价格" label="price" />
        <tableColumn title="商品类型" label="skuClass.className" />
        <tableColumn title="创建日期" label="updateTime" />
      </el-table>
    </div>
    <div class="dataBtn">
      <div class="Data">共{{ PageData.totalCount }}记录  第{{ PageData.pageIndex }}/{{ PageData.totalPage }}页</div>
      <lsButton title="上一页" color="pag" @click="PreviousPage" />
      <lsButton title="下一页" color="pag" @click="NextPage" />
    </div>
    <!--  新增弹窗 -->
    <Dialogue :visible.sync="visible" title="新增商品">
      <NewProduct ref="NewProduct" :judge="Judge" @click="ClosePopUpWindow" @AddClose="AddClose" @Modify="Modify" />
    </Dialogue>
  </div>
</template>

<script>
import NewProduct from './components/NewProduct.vue'
import search from '@/components/search'
import lsButton from '@/components/ls-button'
import moment from 'moment'
import tableColumn from '@/components/tablecolumn'
import Dialogue from '@/components/Dialogue'
import { getCommodityList, getCommodityType, ModifyItem } from '@/api/CommodityManagement'
export default {
  name: 'CommodityManagement',
  components: {
    search,
    lsButton,
    tableColumn,
    Dialogue,
    NewProduct
  },
  data() {
    return {
      commodityList: [], // 列表数据
      dialogImageUrl: '',
      fromData: {
        skuImage: '',
        unit: '',
        classId: '',
        price: 0,
        brandName: '',
        skuName: ''
      }, // 新增数据
      formRules: { // 表单校验
        skuImage: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        unit: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        classId: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        price: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        brandName: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        skuName: [{ required: true, message: '请输入活动名称', trigger: 'blur' }]
      },
      PageData: {}, // 分页数据
      pageIndex: 1, // 当前页数
      Judge: true, // 判断是修改数据还是提交数据
      ItemTypeList: {}, // 商品类型列表
      skuName: '', // 搜索内容
      ModifyCommodity: {}, // 修改商品数据
      visible: false // 弹窗显示隐藏
    }
  },
  computed: {},
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getCommodityList()
    this.getCommodityType()
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {

  },
  methods: {
    // 获取列表数据
    async getCommodityList() {
      const { data } = await getCommodityList({
        pageIndex: this.pageIndex,
        skuName: this.skuName
      })
      this.commodityList = this.ProcessingWorkOrderStatus(data.currentPageRecords)
      this.PageData = data
    },
    // 列表数据处理
    ProcessingWorkOrderStatus(data) {
      data.forEach(ele => {
        ele.updateTime = moment(ele.updateTime).utcOffset(8).format('YYYY.MM.DD HH:mm:ss')
      })
      return data
    },
    // 下一页
    NextPage() {
      if (this.pageIndex < this.PageData.totalPage) {
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
    // 商品搜索
    ProductSearch() {
      this.getCommodityList()
    },
    // 获取商品类型
    async getCommodityType() {
      const { data } = await getCommodityType()
      this.ItemTypeList = data
      console.log(data)
    },
    // 关闭弹窗
    ClosePopUpWindow() {
      this.visible = !this.visible
    },
    AddClose() {
      this.visible = !this.visible
      this.getCommodityList()
    },
    // 修改商品数据
    async ModifyCommodityData(val) {
      console.log(val.row)
      this.Judge = false
      this.ModifyCommodity = val.row
      this.visible = true
      setTimeout(() => {
        this.$refs.NewProduct.fromData.brandName = val.row.brandName
        this.$refs.NewProduct.fromData.price = val.row.price
        this.$refs.NewProduct.fromData.skuId = val.row.skuId
        this.$refs.NewProduct.fromData.skuImage = val.row.skuImage
        this.$refs.NewProduct.fromData.skuName = val.row.skuName
        this.$refs.NewProduct.fromData.unit = val.row.unit
        this.$refs.NewProduct.fromData.classId = val.row.skuClass.classId
      }, 0)
    },
    // 修改后提交
    async Modify() {
      console.log(222)
      await ModifyItem(this.ModifyCommodity.skuId, this.$refs.NewProduct.fromData)
      this.$message.success('修改成功')
      this.Judge = true
      this.visible = false
      this.getCommodityList()
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
</style>
