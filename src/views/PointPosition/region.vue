<!-- 区域管理 -->
<template>
  <div class="regionalManagement">
    <!-- 头部 -->
    <div class="top">
      <el-form class="form" label-position="right" label-width="80px">
        <search title="区域搜索:" :model.sync="searchContent" />
        <lsButton
          icon="el-icon-search"
          size="mini"
          title="查询"
          @click="getAreaList()"
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
        @click="dialogVisible = true"
      />
      <el-table ref="aabb" :data="regionalManagementData.currentPageRecords">
        <el-table-column label="日期">
          <template slot-scope="scope">
            <el-button
              type="text"
              class="viewDetails"
              @click="viewDetailsClick(scope.row)"
            >查看详情</el-button>
            <el-button type="text" class="modify">修改</el-button>
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
          :pag="regionalManagementData.pageIndex"
        />
        <tableColumn title="区域名称" label="name" />
        <tableColumn title="点位数" label="nodeCount" />
        <tableColumn title="备注说明" label="remark" />
      </el-table>
      <!-- 新增对话框 -->
      <Dialog :visible.sync="dialogVisible" class="newDialog" title="新增区域">
        <el-form
          ref="form"
          :model="formData"
          :rules="formRules"
          label-width="100px"
          class="demo-ruleForm"
        >
          <div class="zoneName">
            <el-form-item label="区域名称" prop="regionName">
              <el-input
                v-model="formData.regionName"
                placeholder="请输入"
                maxlength="15"
                show-word-limit
              />
            </el-form-item>
          </div>
          <div class="remarks">
            <el-form-item label="备注说明" required prop="remark">
              <el-input
                v-model="formData.remark"
                placeholder="请输入备注(不超过40字)"
                maxlength="40"
                show-word-limit
              />
            </el-form-item>
          </div>
          <div class="dialogButton">
            <lsButton
              size="mini"
              title="取消"
              color="cancel"
              @click="dialogVisible = false"
            />
            <lsButton
              size="mini"
              title="确认"
              color="addBtn"
              @click="onSave"
            />
          </div>
        </el-form>
      </Dialog>
      <!-- 查看详情对话框 -->
      <Dialog :visible.sync="dialogVisible1" class="newDialog" title="区域详情">
        <p>
          区域名称：<span>{{ zoneName }}</span>
        </p>
        <div class="pointPosition">
          <span>包含点位：</span>
          <el-table ref="aabb" :data="areaDetailsList.currentPageRecords">
            <tableColumn title="设备数量" label="vmCount" />
            <tableColumn
              title="序号"
              type="index"
              :pag="regionalManagementData.pageIndex"
            />
            <tableColumn title="点位名称" label="name" />
          </el-table>
        </div>
      </Dialog>
    </div>
    <!-- 底部 -->
    <div class="bottom">
      <div class="left">
        <span>共<span>{{ regionalManagementData.totalCount }}</span>条记录</span>
        <span>第<span>{{ regionalManagementData.pageIndex }}</span>/<span>{{ regionalManagementData.totalPage }}</span>页</span>
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
import search from '@/components/search'
import lsButton from '@/components/ls-button'
// 点位管理中的接口
import {
  areaList,
  newArea,
  getAreaDetails,
  deleteArea
} from '@/api/pointManagement'
import tableColumn from '@/components/tablecolumn'
import Dialog from '@/components/Dialogue'
export default {
  components: {
    search,
    lsButton,
    tableColumn,
    Dialog
  },
  data() {
    const checkDeptRegionName = (rule, value, callback) => {
      const isRepeat = this.regionalManagementData.currentPageRecords.some(
        (item) => {
          return item.name === value
        }
      )
      if (isRepeat) return callback(new Error('已存在此名称的对象'))
      callback()
    }
    return {
      // 区域列表
      regionalManagementData: {},
      // 区域详情列表
      areaDetailsList: {},
      // 区域名称
      zoneName: '',
      pageIndex: 1,
      disable: false,
      disable1: false,
      searchContent: '',
      // 新增区域对话框
      dialogVisible: false,
      dialogVisible1: false,
      text: '',
      formData: {
        regionName: '',
        remark: ''
      },
      formRules: {
        regionName: [
          { required: true, message: '请输入区域名称', trigger: 'blur' },
          { validator: checkDeptRegionName, trigger: 'blur' }
        ],
        remark: [
          { required: true, message: '请输入备注说明', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getAreaList()
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  methods: {
    // 获取区域列表
    async getAreaList() {
      const { data } = await areaList({
        pageIndex: this.pageIndex,
        name: this.searchContent
      })
      this.regionalManagementData = data
      console.log(this.regionalManagementData)
    },
    // 上一页按钮点击事件
    previousPageClick() {
      // this.pageIndex--;
      // this.getAreaList();

      if (this.pageIndex < 2) {
        this.disable = true
      } else {
        this.pageIndex--
        this.getAreaList()
        document.getElementById('nextPage').disabled = false
      }
    },
    // 下一页按钮点击事件
    nextPageClick() {
      if (this.pageIndex >= this.regionalManagementData.totalPage) {
        this.disable1 = true
      } else {
        this.pageIndex++
        this.getAreaList()
        this.disable = false
      }
    },
    // 新建按钮点击事件
    newClick() {
      this.showNewDialog = true
    },
    // 新增确定按钮点击事件
    async onSave() {
      await this.$refs.form.validate()
      try {
        const res = await newArea(this.formData)
        console.log(res)
        this.$message.success('新增区域成功')
        this.dialogVisible = false
        this.getAreaList()
      } catch (error) {
        // console.log(111111);
        this.$message.error('新增部门失败')
      }
    },
    // 查看详情点击事件
    async viewDetailsClick(val) {
      console.log(val)
      this.zoneName = val.name
      this.dialogVisible1 = true
      // 获取区域详情
      const res = await getAreaDetails(val.id)
      this.areaDetailsList = res.data
      console.log(res.data)
    },
    // 删除点击事件
    async delClick(value) {
      const res = await deleteArea(value.id)
      console.log(res)
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
// 新建按钮
.new {
  background-color: #fff;
  padding: 20px 15px 19px 17px;
  span {
    margin-right: 8px;
  }
  .viewDetails {
    color: #5f84ff;
  }
  .modify {
    color: #5f84ff;
  }
  .del {
    color: red;
  }
  .zoneName {
    display: flex;
    margin-bottom: 20px;
  }
  .remarks {
    display: flex;
    margin-bottom: 20px;
  }
  .is-required {
    width: 600px;
  }
  .text {
    width: 85px;
  }
  .dialogButton {
    display: flex;
    justify-content: center;
  }
  .pointPosition {
    display: flex;
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
    margin-right: 120px;
  }
}
</style>
