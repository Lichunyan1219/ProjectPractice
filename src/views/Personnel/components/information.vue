<template>
  <el-dialog
    width="60%"
    :visible="visible"
    :title="dialogTitle"
    @close="onClose"
  >
    <el-form
      label-width="120px"
      :model="formData"
      ref="deptForm"
      :rules="formDataRules"
    >
      <!-- 人员名称 -->
      <el-form-item label="人员名称：" prop="userName">
        <el-input
          style="width: 80%"
          placeholder="请输入"
          maxlength="5"
          show-word-limit
          v-model="formData.userName"
        />
      </el-form-item>
      <!-- 人员名称 -->

      <!-- 角色 -->
      <el-form-item label="角色：" prop="roleId">
        <el-select
          style="width: 80%"
          placeholder="请选择"
          v-model="formData.roleId"
        >
          <el-option
            v-for="(item, index) in peoples"
            :key="index"
            :label="item.roleName"
            :value="item.roleId"
          />
        </el-select>
      </el-form-item>
      <!-- 角色 -->

      <!-- 联系电话 -->
      <el-form-item label="联系电话：" prop="mobile">
        <el-input
          style="wroleidth: 80%"
          placeholder="请输入"
          maxlength="11"
          show-word-limit
          v-model="formData.mobile"
        />
      </el-form-item>
      <!-- 联系电话 -->

      <!-- 负责区域 -->
      <el-form-item label="负责区域：" prop="regionName">
        <el-select
          style="width: 80%"
          placeholder="请选择"
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
        <el-upload
          class="avatar-uploader"
          action=" "
          :show-file-list="false"
          :http-request="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="formData.image" :src="formData.image" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>

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
  putUserIDApi,
} from "@/api/essential";
import { getPhoto } from "@/api/public";
import LsButton from "@/components/ls-button"; //按钮
export default {
  data() {
    return {
      formData: {
        userName: "", //人员名称
        regionName: "", //归属区域
        mobile: "", //联系电话
        image: "", //头像
        roleId: "",//角色Id
        regionId: "", //所属区域Id
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
        roleId: [
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
  computed: {
    dialogTitle() {
      return this.formData.id ? "编辑部门" : "添加部门";
    },
  },

  created() {
    this.getUserRoleApi1();
    this.getUserRegionSearch();
  },

  methods: {
    // 上传图片
    async handleAvatarSuccess(file) {
      const formData = new FormData();
      formData.append("fileName", file.file);
      const { data } = await getPhoto(formData);
      // console.log(data);
      this.formData.image = data;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },

    // 取消
    onClose() {
      this.$emit("update:visible", false);
      this.$refs.deptForm.resetFields();
      this.formData = {
        userName: "", //人员名称
        regionName: "", //归属区域
        mobile: "", //联系电话
        image: "", //头像
        roleId: "",
        status: false, //启用状态
        regionId: ''
      };
    },

    // 确认
    async onSelect(val) {
      await this.$refs.deptForm.validate();
      const res = await putUserIDApi(this.formData);
      // this.$message.success('编辑成功')
      console.log(res);

      // const res = await postUserApi({
      //   userName: this.formData.userName,
      //   regionName: this.formData.regionName,
      //   mobile: this.formData.mobile,
      //   image: this.formData.image,
      //   roleId: this.formData.roleId,
      //   status: this.formData.status,
      //   regionId: this.formData.regionId
      // })
      // console.log(res);
    },

    // 角色列表
    async getUserRoleApi1() {
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

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 89px;
  height: 89px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 89px;
  height: 89px;
  display: block;
}
</style>
