<template>
  <Dialog title="批量策略管理" :visible.sync="visible2">
    <el-form class="dialog-form" ref="form" label-width="80px">
      <el-form-item label="选择策略">
        <el-select
          style="width: 90%"
          v-model="checkTactics"
          placeholder="请选择策略管理"
        >
          <el-option
            v-for="item in tacticsList"
            :key="item.policyId"
            :label="item.policyName"
            :value="item.policyName"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="bottom-btn">
      <Button color="config" title="取消" @click="callMachine"></Button>
      <Button color="addBtn" title="确认" @click="addMachine"></Button>
    </div>
  </Dialog>
</template>

<script>
import Dialog from "@/components/Dialogue";
import Button from "@/components/ls-button";
export default {
  components: {
    Dialog,
    Button,
  },
  props: {
    dialogTactics: {
      type: Boolean,
      default: false,
    },
    tacticsList: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      checkTactics: "",
    };
  },

  created() {},

  methods: {
    callMachine() {
      console.log("取消");
    },
    addMachine() {
      console.log("确认修改");
    },
  },

  computed: {
    visible2: {
      get() {
        return this.dialogTactics;
      },
      set(val) {
        this.$emit("on-change", val);
      },
    },
  },
};
</script>

<style scoped lang="scss">
.dialog-form {
  padding: 0 50px;
}
.bottom-btn {
  width: 40%;
  margin: 0 auto;
}
</style>
