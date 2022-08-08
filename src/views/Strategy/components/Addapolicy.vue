<template>
  <el-dialog
    :title="showTitle"
    :visible="visible"
    width="630px"
    :before-close="btnCancel"
    :center="false"
  >
    <div>
      <el-form ref="ruleForm" size="medium" :rules="rules" :model="ruleForm" status-icon label-width="140px" class="demo-ruleForm">
        <el-form-item label="策略名称" prop="policyName">
          <el-input
            v-model="ruleForm.policyName"
            style="width:400px"
            type="text"
            placeholder="请输入"
            maxlength="15"
            show-word-limit
          /></el-form-item>
        <el-form-item label="策略方案" prop="discount">
          <el-input-number v-model="ruleForm.discount" style="width:400px" controls-position="right" :min="undefined" :max="90" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="btnCancel">取 消</el-button>
        <el-button type="primary" @click="btnOK">确 定</el-button>
      </span>
    </div>
  </el-dialog>
</template>

<script>
import { addPolicy, amendPolicy } from '@/api/strategy'
export default {

  // 组件
  components: {

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
      ruleForm: {
        policyName: '',
        discount: ''
      },
      rules: {
        policyName: [
          { required: true, message: '请输入策略名称', trigger: 'blur' },
          { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
        ],
        discount: [
          { required: true, message: '请输入', trigger: 'blur' },
          { type: 'number', message: '必须为数字值', trigger: 'change' }
        ]
      },
      dialogVisible: true,
      policyId: ''
    }
  },
  // 计算属性
  computed: {
    showTitle() {
      return this.policyId === '' ? '新增策略' : '修改策略'
    }
  },

  // 创建后
  created() {

  },

  // 函数
  methods: {
    // 确定
    btnOK() {
      this.$refs.ruleForm.validate(async isOK => {
        if (isOK) {
          var arr = {}
          if (this.policyId === '') {
            arr = await addPolicy(this.ruleForm)
          } else {
            arr = await amendPolicy(this.ruleForm, this.policyId)
          }
          console.log(arr.data)
          if (arr.data) {
            this.ruleForm = {
              policyName: '',
              discount: ''
            }
            this.$emit('refresh')
            this.$emit('update:visible', false) // 关闭
          }
        }
      })
    },
    btnCancel() {
      this.$emit('update:visible', false) // 关闭
      //   this.$refs.deptForm.resetFields() // 重置校验字段
      this.ruleForm = {
        policyName: '',
        discount: ''
      }
    },
    // 编辑项
    getDetail(row) {
      this.ruleForm.policyName = row.policyName
      this.ruleForm.discount = row.discount
      this.policyId = row.policyId
    }
  }

}
</script>

<style scoped>

</style>
