<!-- 区域管理 -->
<template>
  <div class="regionalManagement">
    <!-- 头部 -->
    <div class="top">
      <el-form class="form" label-position="right" label-width="80px">
        <search title="区域搜索:" :model.sync="searchName" />
        <lsButton
          icon="el-icon-search"
          size="mini"
          title="查询"
          @click="PartnerSearch()"
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
        @click="dialogVisible1=true"
      />
      <el-table :data="PartnerData.currentPageRecords">
        <el-table-column
          label="序号"
          type="index"
        />
        <el-table-column
          label="合作商名称"
          prop="name"
        />
        <el-table-column
          label="账号"
          prop="account"
        />
        <el-table-column
          label="联系人"
          prop="contact"
        />
        <el-table-column
          label="合作商名称"
          prop="name"
        />
        <el-table-column
          label="联系电话"
          prop="mobile"
        />
        <el-table-column label="分成比例"><template slot-scope="scope">{{ scope.row.ratio+'%' }}</template> </el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <el-button type="text" @click="ResetPassword(scope.row.id)">重置密码</el-button>
            <el-button type="text" @click="DetailsBtn(scope.row)">查看详情</el-button>
            <el-button type="text" @click="Modify(scope.row)">修改</el-button>
            <el-button type="text" @click="DeletePartner(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 查看详情弹框 -->
      <el-dialog
        title="合作商详情"
        :visible.sync="dialogVisible"
        width="30%"
      >
        <el-row :gutter="40">
          <el-col :span="12"><div class="grid-content bg-purple">合作商名称：{{ PartnerDetails.name }}</div></el-col>
          <el-col :span="12"><div class="grid-content bg-purple">联系人：{{ PartnerDetails.contact }}</div></el-col>
          <el-col :span="12"><div class="grid-content bg-purple">联系电话：{{ PartnerDetails.mobile }}</div></el-col>
          <el-col :span="12"><div class="grid-content bg-purple">分成比例：{{ PartnerDetails.ratio }}</div></el-col>
        </el-row>
      </el-dialog>
      <!-- 新增弹出层 -->
      <el-dialog
        :title="title"
        :visible.sync="dialogVisible1"
        width="40%"
        label-position="left"
      >
        <el-form ref="formData" :model="formData" :rules="formRules" label-width="80px">
          <el-form-item label="合作商名称:" prop="name">
            <el-input v-model="formData.name" maxlength="10" show-word-limit />
          </el-form-item>
          <el-form-item label="联系人:" prop="contact">
            <el-input v-model="formData.contact" maxlength="10" show-word-limit />
          </el-form-item>
          <el-form-item label="联系电话:" prop="mobile">
            <el-input v-model="formData.mobile" maxlength="11" show-word-limit />
          </el-form-item>
          <el-form-item label="分成比例(%):" prop="ratio">
            <el-input-number v-model.number="formData.ratio" controls-position="right" :max="100" />
          </el-form-item>
          <el-form-item label="账号:" prop="account">
            <el-input v-model="formData.account" maxlength="18" show-word-limit />
          </el-form-item>
          <el-form-item label="密码:" prop="password">
            <el-input v-model="formData.password" maxlength="20" show-word-limit />
          </el-form-item>
          <div class="addWorkBtn">
            <lsButton title="取消" color="config" />
            <lsButton title="确定" color="addBtn" @click="AddPartner" />
          </div>
        </el-form>
      </el-dialog></div>
  </div>
</template>

<script>
import search from '@/components/search'
import lsButton from '@/components/ls-button'
import { PartnerSearch, ResetPassword, DeletePartner, AddPartner, ModifyPartners } from '@/api/PartnerManagement'
export default {
  components: {
    search,
    lsButton
  },
  data() {
    return {
      PartnerDetails: {
        name: '',
        contact: '',
        mobile: '',
        ratio: ''
      }, // 合作商详情
      PartnerData: {}, // 合作商数据
      dialogVisible: false, // 查看详情弹框
      jub: true, // 判断修改还是添加
      title: '新增合作商',
      dialogVisible1: false, // 新增弹出层
      formData: {
        password: '',
        account: '',
        ratio: '',
        mobile: '',
        contact: '',
        name: ''
      }, // 新增数据
      formRules: {
        name: [
          { required: true, message: '请输入合作商名称', trigger: 'change' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' }
        ],
        account: [
          { required: true, message: '请输入账号', trigger: 'change' }
        ],
        ratio: [
          { required: true, message: '请输入比例', trigger: 'change' },
          { type: 'number', message: '比例必须为数字值' }
        ],
        mobile: [
          { required: true, message: '请输入联系电话', trigger: 'change' },
          { min: 11, max: 11, message: '请输入11位手机号码', trigger: 'blur' },
          {
            pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
            message: '请输入正确的手机号码'
          }
        ],
        contact: [
          { required: true, message: '请输入联系人', trigger: 'change' }
        ]
      }, // 表单校验
      searchName: '' // 搜索框数据
    }
  },
  computed: {},
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.PartnerSearch()
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {

  },
  methods: {
    // 获取供应商数据
    async PartnerSearch() {
      const { data } = await PartnerSearch({
        pageSize: 1000000,
        name: this.searchName
      })
      this.PartnerData = data
    },
    // 重置合作商密码
    async ResetPassword(id) {
      this.$confirm('此操作将会重置合作商密码', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        ResetPassword(id)
        this.$message.success('重置成功')
      })
    },
    // 查看详情
    DetailsBtn(val) {
      this.PartnerDetails.ratio = val.ratio
      this.PartnerDetails.name = val.name
      this.PartnerDetails.mobile = val.mobile
      this.PartnerDetails.contact = val.contact
      this.dialogVisible = true
    },
    // 删除合作商
    async DeletePartner(id) {
      this.$confirm('此操作将会依旧删除合作商', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        DeletePartner(id)
        await this.PartnerSearch()
        this.$message.success('删除成功')
      })
    },
    // 添加合作商
    async AddPartner() {
      try {
        await this.$refs.formData.validate()
        if (this.jub) {
          const res = await AddPartner(this.formData)
          if (res) {
            this.$message.success('添加成功')
            await this.PartnerSearch()
            this.dialogVisible1 = false
          }
        } else {
          const res = await ModifyPartners(this.formData.id, this.formData)
          if (res) {
            this.$message.success('修改成功')
            await this.PartnerSearch()
            this.dialogVisible1 = false
          }
        }
      } catch (err) {
        1
      }
    },
    Modify(val) {
      this.formData = val
      this.dialogVisible1 = true
      this.jub = false
      this.title = '修改合作商'
    }
  }
}
</script>
<style scoped lang="scss">
/* 头部 */
.top {
  width: 100%;
  height: 60px;
  background-color: #fff;
  padding: 10px 20px;
  margin: 20px;
  border-radius: 10px;
  .el-form--label-right {
    width: 400px;
    display: flex;
  }
  /* 查询按钮 */
  .search {
    height: 40px;
  }
}
.addWorkBtn{
 display: flex;
 justify-content: center;
 align-items: center;
}
.grid-content{
  margin-bottom: 20px;
}
.el-form-item__label{
 white-space: nowrap;
 font-size: 12px !important;
}
</style>
