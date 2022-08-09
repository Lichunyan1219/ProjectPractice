<template>
  <el-dialog width="60%" :visible="visible" title="添加人员" @close="onClose">
    <el-form label-width="120px" :model="formData" ref="deptForm" :rules="formDataRules">
      <!-- 人员名称 -->
      <el-form-item label="人员名称：" prop="userName">
        <el-input
          style="width: 80%"
          placeholder="请输入"
          v-model="formData.userName"
        />
      </el-form-item>
      <!-- 人员名称 -->

      <!-- 角色 -->
      <el-form-item label="角色：" prop="roleName">
        <el-select
          style="width: 80%"
          placeholder="请选择"
          :value="item"
          v-model="formData.roleName"
        >
          <el-option
            v-for="(item, index) in peoples"
            :key="index"
            :label="item.roleName"
            :value="item.roleName"
          />
        </el-select>
      </el-form-item>
      <!-- 角色 -->

      <!-- 联系电话 -->
      <el-form-item label="联系电话：" prop="mobile">
        <el-input
          style="width: 80%"
          placeholder="请输入"
          v-model="formData.mobile"
        />
      </el-form-item>
      <!-- 联系电话 -->

      <!-- 负责区域 -->
      <el-form-item label="负责区域：" prop="regionName">
        <el-select
          style="width: 80%"
          placeholder="请选择"
          :value="item"
          v-model="formData.regionName"
        >
          <el-option
            v-for="item in district"
            :key="item.id"
            :label="item.name"
            :value="item.name"
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
        <el-checkbox v-model="formData.status">是否启用</el-checkbox>
      </el-form-item>
      <!-- 状态 -->

      <el-form-item>
        <LsButton title="取消" color="config" @click="onClose" />
        <LsButton title="确认" color="addBtn" @click="onSelect" />
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import {
  getUserRoleApi,
  getUserRegionSearchApi,
  postUserApi,
} from "@/api/essential";
import LsButton from "@/components/ls-button"; //按钮
export default {
  data() {
    return {
      item: 0,
      url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      formData: {
        userName: "", //人员名称
        regionName: "", //归属区域
        roleName: "", //角色
        mobile: "", //联系电话
        image: "", //头像
        status: false, //启用状态
      },
      peoples: [], // 接收获取的角色列表的数据
      district: [], //接收获取的区域列表的数据

      // 判断
      formDataRules: {
        userName: [
          {
            required: true,
            message: "人员名称不能为空",
            trigger: "blur",
          },
        ],
        roleName: [
          {
            required: true,
            message: "角色不能为空",
            trigger: "blur",
          },
        ],
        mobile: [
          {
            required: true,
            message: "联系电话不能为空",
            trigger: "blur",
          },
        ],
        regionName: [
          {
            required: true,
            message: "负责区域不能为空",
            trigger: "blur",
          },
        ],
      },
    };
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },
  components: {
    LsButton,
  },

  created() {
    this.getUserRoleApi();
    this.getUserRegionSearch();
  },

  methods: {
    onClose() {
      this.$emit("update:visible", false);
    },

    async onSelect() {
      const res = await postUserApi(this.formData);
      console.log(res);
    },

    // 角色列表
    async getUserRoleApi() {
      const { data } = await getUserRoleApi();
      this.peoples = data;
      // console.log(this.peoples);
    },
    // 区域列表
    async getUserRegionSearch() {
      const { data } = await getUserRegionSearchApi();
      this.district = data.currentPageRecords;
      // console.log(this.district);
    },
  },
};
</script>

<style scoped lang="scss">
.jpg-png {
  color: #bac0cd;
}
</style>
