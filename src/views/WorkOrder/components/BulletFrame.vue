<!--  -->
<template>
  <div>
    <el-form
      ref="fromData"
      v-model="fromData"
      class="el-input"
      label-width="96px"
      label-position="left"
      :model="fromData"
      :rules="formRules"
    >
      <el-form-item label="设备编号:" ref="innerCode" prop="innerCode">
        <el-input v-model="fromData.innerCode" @input="getWorkOrderType" />
      </el-form-item>
      <el-form-item label="工单类型:" prop="productType">
        <el-select
          v-model="fromData.productType"
          filterable
          placeholder="请选择"
        >
          <el-option
            v-for="item in list"
            :key="item.typeId"
            :label="item.typeName"
            :value="item.typeId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="补货数量：" prop="details">
        <el-button type="text" @click="replenishmentListClick">
          <i class="el-icon-notebook-2" /> 补货清单</el-button
        >
      </el-form-item>
      <el-form-item label="运营人员:" prop="assignorId">
        <el-select
          v-model="fromData.assignorId"
          filterable
          placeholder="请选择"
        >
          <el-option
            v-for="item in ListOperators"
            :key="item.userId"
            :label="item.userName"
            :value="item.userId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="备注:" prop="desc">
        <el-input v-model="fromData.desc" type="textarea" />
      </el-form-item>
      <div class="addWorkBtn">
        <lsButton title="取消" color="config" @click="onClose" />
        <lsButton title="确定" color="addBtn" @click="onSave" />
      </div>
    </el-form>
    <!-- 新建——补货清单对话框 -->
    <el-dialog
      title="补货详情"
      :visible.sync="dialogVisible1"
      width="50%"
      :modal="false"
    >
      <div class="replenishmentDetails">
        <el-table
          ref="aabb"
          empty-text="暂无数据"
          :data="replenishmentDetailsData"
        >
          <el-table-column prop="channelCode" label="货道编号">
          </el-table-column>
          <el-table-column prop="sku.brandName" label="商品名称">
          </el-table-column>
          <el-table-column prop="currentCapacity" label="当前数量">
          </el-table-column>
          <el-table-column prop="expectCapacity1" label="还可添加">
          </el-table-column>
          <el-table-column prop="expectCapacity" label="补满数量">
            <template slot-scope="scope">
              <el-input-number
                v-if="scope.row.price"
                v-model="scope.row.expectCapacity"
                controls-position="right"
                :min="0"
                :max="scope.row.Capacity"
              ></el-input-number>
              <span v-else>货道暂无商品</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="addWorkBtn">
          <lsButton title="取消" color="config" @click="onClose1" />
          <lsButton title="确定" color="addBtn" @click="onSave1" />
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  CreateWorkOrder,
  createWorkOrder,
  getListOperatorsBasedOnVendingMachines
} from "@/api/WorkOrder";
import { getMachineRoad } from "@/api/machine";
import lsButton from "@/components/ls-button";
import Dialog from "@/components/Dialogue";
import tableColumn from "@/components/tablecolumn";
export default {
  components: {
    lsButton,
    Dialog,
    tableColumn,
  },
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      ListOperators: {},
      replenishmentDetailsData: [],
      //控制新建——补货清单对话框显示隐藏
      dialogVisible: false,
      //控制新建——补货清单对话框显示隐藏
      dialogVisible1: false,
      replenishmentQuantity: 10,
      show: true,
      fromData: {
        desc: "", // 备注
        userId: 1, // 用户id
        innerCode: "", // 设备编号
        productType: "", // 工单类型
        createType: 1, // 工单类型
        details: [], // 补货信息
        assignorId: "", // 运营人员
      },
      formRules: {
        innerCode: [
          { required: true, message: "请输入设备编号", trigger: "change" },
        ],
        productType: [
          { required: true, message: "请选择工单类型", trigger: "change" },
        ],
        details: [{ required: true, message: "请选择", trigger: "change" }],
        assignorId: [
          { required: true, message: "请选择运营人员", trigger: "change" },
        ],
        desc: [{ required: true, message: "请输入备注", trigger: "change" }],
      },
    };
  },
  computed: {},
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  methods: {
    // 设备编号发生改变，请求新的运营人员
    async getWorkOrderType() {
      if (this.fromData.innerCode.trim() === "") {
        return;
      }
      const { data } = await getListOperatorsBasedOnVendingMachines(
        this.fromData.innerCode
      );
      this.ListOperators = data;
      console.log(data);
    },
    // 新增工单按钮事件
    async addCreateWorkOrder() {
      await CreateWorkOrder(this.fromData);
    },
    //补货清单按钮点击事件
    replenishmentListClick() {
      this.$refs.fromData.validateField("innerCode", async (err) => {
        // console.log(err);
        if (!err) {
          this.dialogVisible1 = true;
          const { data } = await getMachineRoad(this.fromData.innerCode);
          console.log(data);
          data.forEach((item) => {
            item.Capacity = item.maxCapacity - item.currentCapacity;
            if (item.currentCapacity > 10) {
              item.expectCapacity1 = 0;
              item.expectCapacity = 0;
            } else {
              item.expectCapacity = item.maxCapacity - item.currentCapacity;
              item.expectCapacity1 = item.maxCapacity - item.currentCapacity;
            }
            if (item.sku === null) {
              item.sku = {};
              item.sku.brandName = "-";
            }
            if (item.sku.brandName == "-" && item.currentCapacity === 0) {
              item.expectCapacity1 = "-";
              item.currentCapacity = "-";
            }
          });
          this.replenishmentDetailsData = data;
        }
      });
      //补货详情
    },
    //新建确定按钮
    async onSave() {
      await this.$refs.fromData.validate()
      const res = await createWorkOrder(this.fromData);
      // console.log(res);
    },
    //新建取消按钮
    onClose() {
      this.$emit("onClose");
    },
    //补货清单确定按钮
    onSave1() {
      this.replenishmentDetailsData.forEach((ele, index) => {
        this.fromData.details[index] = {};
        this.fromData.details[index].channelCode = ele.channelCode;
        this.fromData.details[index].expectCapacity = ele.expectCapacity;
        this.fromData.details[index].skuName = ele.skuName;
        this.fromData.details[index].skuImage = ele.skuImage;
        this.fromData.details[index].skuId = ele.skuId;
      });
      // console.log(this.fromData.details);
      this.dialogVisible1 = false;
    },
    //补货清单取消按钮
    onClose1() {
      this.dialogVisible1 = false;
      
    },
  },
};
</script>
<style scoped>
.addWorkBtn {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
}
.replenishmentDetails {
  /* height: 300px; */
  /* overflow: hidden; */
}
</style>
