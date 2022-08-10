<!-- 点位管理 -->
<template>
  <div class="pointManagement">
    <!-- 头部 -->
    <div class="top">
      <el-form class="form" label-position="right" label-width="80px">
        <search title="点位搜索:" :model.sync="searchInput" />
        <el-form-item label="区域搜索">
          <el-select
            v-model.trim="input"
            filterable
            placeholder="请选择"
            :clearable="true"
            style="width: 100%"
          >
            <el-option
              v-for="item in areaManagementData.currentPageRecords"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <lsButton
          icon="el-icon-search"
          size="mini"
          title="查询"
          @click="getPointManagementList()"
        />
      </el-form>
    </div>
    <!-- 新建按钮 -->
    <div class="new">
      <lsButton
        icon="el-icon-circle-plus-outline"
        size="mini"
        title="新建"
        color="addBtn"
        @click="newClick"
      />
      <el-table
        ref="aabb"
        :data="pointManagementData.currentPageRecords"
        empty-text="暂无数据"
      >
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              class="viewDetails"
              @click="viewDetailsClick(scope.row)"
            >查看详情</el-button>
            <el-button
              type="text"
              class="modify"
              @click="modifyClick(scope.row)"
            >修改</el-button>
            <el-button
              type="text"
              class="del"
              @click="delClick(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
        <tableColumn
          title="序号"
          type="index"
          :pag="pointManagementData.pageIndex"
        />
        <tableColumn title="点位名称" label="name" />
        <tableColumn title="所在区域" label="region.name" />
        <tableColumn title="商圈类型" label="businessType.name" />
        <tableColumn title="合作商" label="ownerName" />
        <tableColumn title="详细地址" label="addr" />
      </el-table>
      <!-- 新增对话框 -->
      <el-dialog
        :visible.sync="dialogVisible"
        width="50%"
        :before-close="handleClose"
        :title="dialogShow ? '新增点位' : '修改点位'"
        class="newDialog"
      >
        <el-form
          ref="form"
          :model="formData"
          :rules="formRules"
          label-width="100px"
          class="demo-ruleForm"
          reset-fields
        >
          <el-form-item label="点位名称" prop="name">
            <el-input
              v-model="formData.name"
              placeholder="请输入"
              maxlength="15"
              show-word-limit
            />
          </el-form-item>
          <el-form-item label="所在区域" prop="regionId">
            <el-select
              v-model.trim="formData.regionId"
              filterable
              placeholder="请选择"
              :clearable="true"
              style="width: 100%"
            >
              <el-option
                v-for="item in areaManagementData.currentPageRecords"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="所属商圈" prop="businessId">
            <el-select
              v-model.trim="formData.businessId"
              filterable
              placeholder="请选择"
              :clearable="true"
              style="width: 100%"
            >
              <el-option
                v-for="item in businessDistrictListData"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="归属合作商" prop="ownerId">
            <el-select
              v-model.trim="formData.ownerId"
              filterable
              placeholder="请选择"
              :clearable="true"
              style="width: 100%"
            >
              <el-option
                v-for="item in numberPartnerSearchesData.currentPageRecords"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="详细地址" prop="areaCode">
            <el-cascader
              ref="cascader"
              v-model="formData.areaCode"
              :options="options"
              placeholder="请选择"
            >
              <template slot-scope="{ node, data }">
                <span>{{ data.label }}</span>
                <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
              </template>
            </el-cascader>
          </el-form-item>
          <el-form-item prop="addr">
            <el-input
              v-model="formData.addr"
              type="textarea"
              placeholder="请输入详细地址"
              maxlength="60"
              show-word-limit
              class="addressText"
            />
          </el-form-item>
          <div class="dialogButton">
            <lsButton
              size="mini"
              title="取消"
              color="cancel"
              @click="onClose"
            />
            <lsButton
              size="mini"
              title="确认"
              color="addBtn"
              @click="onSave"
            />
          </div>
        </el-form>
      </el-dialog>
      <!-- 查看详情对话框 -->
      <Dialog :visible.sync="dialogVisible1" class="newDialog" title="点位详情">
        <div class="pointPosition">
          <el-table
            ref="aabb"
            empty-text="暂无数据"
            :data="PointDeatailsData.data"
          >
            <el-table-column type="index" label="序号" />
            <el-table-column
              label="机器编号"
              property="innerCode"
            />
            <el-table-column
              label="设备状态"
              property="vmStatus"
            />
            <el-table-column property="lastSupplyTime" label="最后一次供货时间" />
          </el-table>
        </div>
      </Dialog>
    </div>
    <!-- 底部 -->
    <div class="bottom">
      <div class="left">
        <span>共<span>{{ pointManagementData.totalCount }}</span>条记录</span>
        <span>第<span>{{ pointManagementData.pageIndex }}</span>/<span>{{ pointManagementData.totalPage }}</span>页</span>
      </div>
      <div class="right">
        <lsButton
          id="previousPage"
          size="mini"
          title="上一页"
          color="addBtn"
          :disable="disable"
          class="previousPage"
          @click="previousPageClick"
        />
        <lsButton
          id="nextPage"
          size="mini"
          title="下一页"
          :disable="disable1"
          color="addBtn"
          class="nextPage"
          @click="nextPageClick"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { regionData } from 'element-china-area-data'
import search from '@/components/search'
import tableColumn from '@/components/tablecolumn'
import lsButton from '@/components/ls-button'
import {
  pointSearch,
  areaList,
  partnerSearch,
  businessDistrictList,
  newPoint,
  getPointDeatails,
  modifyPoint,
  deletePoint
} from "@/api/pointManagement";
import Dialog from "@/components/Dialogue";
export default {
  name: 'PointManagement',
  components: {
    search,
    lsButton,
    tableColumn,
    Dialog
  },
  data() {
    return {
      pageIndex: 1,
      selectedOptions: [],
      options: regionData,
      pointManagementData: {},
      areaManagementData: {},
      // 合作商搜索数据
      numberPartnerSearchesData: {},
      // 商圈列表数据
      businessDistrictListData: {},
      // 点位查看详情数据
      PointDeatailsData: {},
      disable: false,
      disable1: false,
      input: '',
      searchInput: '',
      // 新增区域对话框
      dialogVisible: false,
      dialogVisible1: false,
      // 控制新增、修改对话框发送新增请求还是修改请求
      dialogShow: true,
      // 点击修改当前项的id
      itemId: '',
      formData: {
        name: '',
        addr: '',
        areaCode: '',
        createUserId: '',
        regionId: '',
        businessId: '',
        ownerId: '',
        ownerName: ''
      },
      formRules: {
        name: [{ required: true, message: '请输入点位名称', trigger: 'blur' }],
        addr: [{ required: true, message: '请输入详细地址', trigger: 'blur' }],
        areaCode: [
          { required: true, message: '请选择详细地址', trigger: 'blur' }
        ],
        regionId: [
          { required: true, message: '请输入所属区域', trigger: 'blur' }
        ],
        businessId: [
          { required: true, message: '请输入所在商圈', trigger: 'blur' }
        ],
        ownerId: [
          { required: true, message: '请输入归属合作商', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getPointManagementList()
    this.getAreaLIst()
    this.getBusinessDistrictList()
    this.getNumberPartnerSearchesData()
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  methods: {
    // 获取点位搜索列表
    async getPointManagementList() {
      const res = await pointSearch({
        pageIndex: this.pageIndex,
        regionId: this.input,
        name: this.searchInput
      })
      this.pointManagementData = res.data
      console.log(this.pointManagementData)
    },
    // 获取区域列表
    async getAreaLIst() {
      const res = await areaList({})
      this.areaManagementData = res.data
      // console.log(this.areaManagementData);
    },
    // 获取商圈列表
    async getBusinessDistrictList() {
      const res = await businessDistrictList()
      this.businessDistrictListData = res.data
    },
    // 获取合作商搜索列表
    async getNumberPartnerSearchesData() {
      const res = await partnerSearch({
        pageSize: 10000
      })
      this.numberPartnerSearchesData = res.data
      // console.log(this.numberPartnerSearchesData);
    },
    // 上一页按钮点击事件
    previousPageClick() {
      if (this.pageIndex < 2) {
        this.disable = true
      } else {
        this.pageIndex--
        this.getPointManagementList()
        document.getElementById('nextPage').disabled = false
      }
    },
    // 下一页按钮点击事件
    nextPageClick() {
      if (this.pageIndex >= this.pointManagementData.totalPage) {
        this.disable1 = true
      } else {
        this.pageIndex++
        this.getPointManagementList()
        this.disable = false
      }
    },
    // 新建点击事件
    async newClick() {
      this.dialogVisible = true
      this.dialogShow = true
      this.getAreaLIst()
      this.getBusinessDistrictList()
      this.getNumberPartnerSearchesData()
    },
    // 新建对话框的关闭事件
    handleClose() {
      // form表单清空选中的节点
      this.$refs.form.resetFields()
      // Cascader 级联选择器清空选中的节点
      this.$refs['cascader'].panel.clearCheckedNodes()
      this.dialogVisible = false
      this.formData = {
        name: '',
        addr: '',
        areaCode: '',
        createUserId: '',
        regionId: '',
        businessId: '',
        ownerId: '',
        ownerName: ''
      }
    },
    // 新建、修改取消按钮点击事件
    onClose() {
      this.dialogVisible = false
      this.handleClose()
    },
    // 新建、修改确定按钮点击事件
    async onSave() {
      if (this.dialogShow) {
        await this.$refs.form.validate()
        this.formData.createUserId = this.$store.state.user.userId
        this.formData.areaCode = this.formData.areaCode[2]
        const res = await newPoint(this.formData)
        console.log(res)
        this.$message.success('新增区域成功')
        this.dialogVisible = false
      } else {
        const res = await modifyPoint(this.formData, this.itemId)
        console.log(res)
        this.$message.success('修改区域成功')
        this.dialogVisible = false
        this.getPointManagementList()
      }
      this.formData.regionName = ''
      this.formData.remark = ''
    },
    // 修改点击事件
    modifyClick(modefyValue) {
      console.log(modefyValue)
      this.formData.name = modefyValue.name
      this.formData.regionId = modefyValue.region.id
      this.formData.businessId = modefyValue.businessType.id
      this.formData.ownerId = modefyValue.ownerId
      this.formData.addr = modefyValue.addr
      this.formData.areaCode = modefyValue.areaCode
      this.formData.createUserId = this.$store.state.user.userId
      this.itemId = modefyValue.id
      this.dialogVisible = true
      this.dialogShow = false
    },
    // 查看详情点击事件
    async viewDetailsClick(itemValue) {
      this.dialogVisible1 = true
      // 获取点位详情列表
      const res = await getPointDeatails(itemValue.id)
      this.PointDeatailsData = res
      console.log(res)
      this.vmStatusConversion()
      this.lastSupplyTimeConversion()
    },
    // 查看详情中售货机状态转化函数
    vmStatusConversion() {
      this.PointDeatailsData.data.forEach((item) => {
        if (item.vmStatus === 0) {
          return (item.vmStatus = '未投放')
        } else if (item.vmStatus === 1) {
          return (item.vmStatus = '运营')
        } else {
          return (item.vmStatus = '撤机')
        }
      })
    },
    // 查看详情中最后一次供货时间转化函数
    lastSupplyTimeConversion() {
      this.PointDeatailsData.data.forEach((item) => {
        item.lastSupplyTime = item.lastSupplyTime
          .replace('-', '.')
          .replace('-', '.')
          .replace('T', ' ')
        return item.lastSupplyTime
      })
    },
    // 删除点击事件
    async delClick(delValue) {
      const res = await deletePoint(delValue.id)
      console.log(res)
      this.getPointManagementList()
    }
  }
}
</script>
<style scoped lang="scss">
//头部
.top {
  width: 100%;
  height: 60px;
  background-color: #fff;
  padding: 10px 20px;
  margin: 20px;
  border-radius: 10px;
  .form {
    display: flex;
  }
  .search {
    height: 40px;
  }
}
//新建按钮
.new {
  background-color: #fff;
  padding: 20px 15px 19px 17px;
  .viewDetails {
    color: #5f84ff;
  }
  .modify {
    color: #5f84ff;
  }
  .del {
    color: red;
  }
  .dialogButton {
    display: flex;
    justify-content: center;
  }
}
//底部
.bottom {
  display: flex;
  justify-content: space-between;
  .previousPage {
    background: #edf0f9;
  }
  .nextPage {
    background-color: #d5ddf8;
  }
  .right {
    margin-right: 40px;
  }
}
</style>
