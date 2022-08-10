<!--  -->
<template>
  <div>
    <el-form ref="fromData" :model="fromData" :hide-required-asterisk="true" :rules="fromRules" class="el-input" label-width="80px" label-position="left">
      <el-form-item label="设备编号:" prop="innerCode">
        <el-input v-model="fromData.innerCode" @input="OperationsStaff" />
      </el-form-item>
      <el-form-item label="工单类型:" prop="productType">
        <el-select v-model="fromData.productType" filterable placeholder="请选择">
          <el-option
            v-for="item in ListOperators"
            :key="item.typeId"
            :value="item.typeId"
            :label="item.typeName"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="运营人员:" prop="assignorId">
        <el-select v-model="fromData.assignorId" filterable placeholder="请选择">
          <el-option
            v-for="item in DevopsList"
            :key="item.userId"
            :value="item.userId"
            :label="item.userName"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="备注:" prop="desc">
        <el-input v-model="fromData.desc" type="textarea" />
      </el-form-item>
      <div class="addWorkBtn">
        <lsButton title="取消" color="config" @click="$emit('create')" />
        <lsButton title="确定" color="addBtn" @click="CreateWorkOrder" />
      </div>
    </el-form>
  </div>
</template>

<script>
import { getWorkOrderType, CreateWorkOrder } from '@/api/WorkOrder'
import { OperationsStaff } from '@/api/OperationsStaff'
import lsButton from '@/components/ls-button'
export default {
  components: {
    lsButton
  },
  props: {
  },
  data() {
    return {
      ListOperators: {},
      fromData: {
        desc: '',
        userId: '1',
        innerCode: '',
        productType: '',
        assignorId: '',
        createType: 1
      },
      DevopsList: [],
      fromRules: {
        innerCode: [
          { required: true, message: '请输入设备编号', trigger: 'blur' }
        ],
        productType: [
          { required: true, message: '请选择工单类型', trigger: 'blur' }
        ],
        assignorId: [
          { required: true, message: '请选择运营人员', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请输入备注', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getWorkOrderType()
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {

  },
  methods: {
    // 获取运维人员列表
    async OperationsStaff() {
      if (this.fromData.innerCode === '') {
        return
      }
      const { data } = await OperationsStaff(this.fromData.innerCode)
      this.DevopsList = data
    },
    // 获取工单状态
    async getWorkOrderType() {
      const { data } = await getWorkOrderType()
      this.ListOperators = data.filter((ele) => (ele.type === 1))
      console.log(this.ListOperators)
    },
    // 新建工单
    async CreateWorkOrder() {
      await this.$refs.fromData.validate()
      const data = await CreateWorkOrder(this.fromData)
      if (data) {
        this.$message.success('添加成功')
      }
      await this.$refs.fromData.resetFields()
      this.$emit('create')
    }
  }
}
</script>
<style scoped>
.addWorkBtn{
 display: flex;
 justify-content: center;
 align-items: center;
 margin-top: 30px;
}
</style>
