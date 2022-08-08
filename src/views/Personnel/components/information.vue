<template>
  <el-dialog width="60%" :visible="visible" title="编辑人员" @close="onClose">
    <el-form label-width="120px">
      <!-- 人员名称 -->
      <el-form-item label="人员名称：">
        <el-input style="width: 80%" placeholder="请输入" />
      </el-form-item>
      <!-- 人员名称 -->

      <!-- 角色 -->
      <el-form-item label="角色：">
        <el-select
          style="width: 80%"
          placeholder="请选择"
          :value="item"
          v-model="formData.roleName"
        >
          <el-option
            v-for="item in peoples"
            :key="item.id"
            :label="item.roleName"
            :value="item.roleName"
          />
        </el-select>
      </el-form-item>
      <!-- 角色 -->

      <!-- 联系电话 -->
      <el-form-item label="联系电话：">
        <el-input style="width: 80%" placeholder="请输入" />
      </el-form-item>
      <!-- 联系电话 -->

      <!-- 负责区域 -->
      <el-form-item label="负责区域：">
        <el-select style="width: 80%" placeholder="请选择" :value="item">
          <el-option
            v-for="item in peoples"
            :key="item.id"
            :label="item.roleName"
            :value="item.roleName"
          />
        </el-select>
      </el-form-item>
      <!-- 负责区域 -->

      <!-- 图片 -->
      <el-form-item label="头像：">
        <el-image style="width: 100px; height: 100px" :src="url" />
        <div class="jpg-png">支持扩展名：jpg、png，文件不得大于100kb</div>
      </el-form-item>
      <!-- 图片 -->

      <!-- 状态 -->
      <el-form-item label="状态：">
        <el-checkbox v-model="checked">是否启用</el-checkbox>
      </el-form-item>
      <!-- 状态 -->

      <el-form-item>
        <LsButton title="取消" color="config" @click="onClose" />
        <LsButton title="确认" color="addBtn" />
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { getUserRoleApi, getUserRegionSearchApi } from "@/api/essential";
import LsButton from "@/components/ls-button"; //按钮
export default {
  data() {
    return {
      item: 0,
      url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      checked: true,
      formData: {
        userName: "", //人员名称
        regionName: "", //归属区域
        roleName: "", //角色
        mobile: "", //联系电话
      },
      peoples: [], // 接收获取的角色列表的数据
    };
  },
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      item: 0,
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      checked: true
    }
  },

  created() {
    this.getUserRoleApi();
    this.getUserRegionSearch()
  },

  methods: {
    onClose() {
      this.$emit("update:visible", false);
    },

    // 角色列表
    async getUserRoleApi() {
      const { data } = await getUserRoleApi();
      this.peoples = data;
      // console.log(this.peoples);
    },

    async getUserRegionSearch () {
      const res = await getUserRegionSearchApi()
      // console.log(res);
    }
  },
};
</script>

<style scoped lang="scss">
.jpg-png {
  color: #bac0cd;
}
</style>
