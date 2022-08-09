<!--  -->
<template>
  <div>
    <el-form ref="fromData" v-model="fromData" class="el-input" label-width="80px" label-position="left">
      <el-form-item label="设备编号:">
        <el-input v-model="fromData.innerCode" />
      </el-form-item>
      <el-form-item label="工单类型:">
        <el-select v-model="fromData.productType" filterable placeholder="请选择">
          <el-option
            v-for="item in list"
            :key="item.typeId"
            :label="item.typeName"
            :value="item.typeId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="补货数量：">
        <el-button type="text"> <i class="el-icon-notebook-2" /> 补货清单</el-button>
      </el-form-item>
      <el-form-item label="运营人员:">
        <el-select v-model="fromData.userId" filterable placeholder="请选择">
          <el-option
            v-for="item in ListOperators.currentPageRecords"
            :key="item.id"
            :label="item.userName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="备注:">
        <el-input v-model="fromData.desc" type="textarea" />
      </el-form-item>
      <div class="addWorkBtn">
        <lsButton title="取消" color="config" />
        <lsButton title="确定" color="addBtn" @click="addCreateWorkOrder" />
      </div>
    </el-form>
  </div>
</template>

<script>
import { GetPeopleList, CreateWorkOrder } from '@/api/WorkOrder'
import lsButton from '@/components/ls-button'
export default {
  components: {
    lsButton
  },
  props: {
    list: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      ListOperators: {},
      fromData: {
        desc: '', // 描述信息
        userId: 1, // 用户id
        innerCode: '', // 设备编号
        productType: '', // 工单类型
        createType: 1, // 工单类型
        details: [], // 补货信息
        assignorId: '' // 运营ren
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
    async getWorkOrderType() {
      const { data } = await GetPeopleList()
      this.ListOperators = data
      console.log(data)
    },

    async addCreateWorkOrder() {
      await CreateWorkOrder(this.fromData)
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
