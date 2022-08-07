<template>
  <Dialog title="新增设备类型" :visible.sync="visible2">
    <el-form ref="form" :model="machineInfo" label-width="80px">
      <el-form-item label="型号名称" required>
        <el-input
          placeholder="请输入"
          maxlength="10"
          show-word-limit
          v-model="machineInfo.name"
        ></el-input>
      </el-form-item>
      <el-form-item label="型号编码" required>
        <el-input
          placeholder="请输入（限制数字、字母、中划线、下划线）"
          maxlength="15"
          show-word-limit
          v-model="machineInfo.model"
        ></el-input>
      </el-form-item>
      <el-form-item label="货道行数" required>
        <el-input-number
          controls-position="right"
          v-model="machineInfo.vmRow"
          :min="1"
          :max="10"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="货道列数" required>
        <el-input-number
          controls-position="right"
          v-model="machineInfo.vmCol"
          :min="1"
          :max="10"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="货道容量" required>
        <el-input-number
          controls-position="right"
          v-model="machineInfo.channelMaxCapacity"
          :min="1"
          :max="10"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="设备图像" required>
        <el-upload
          class="avatar-uploader"
          action=""
          :show-file-list="false"
          :before-upload="beforeAvatarUpload"
          :http-request="handleAvatarSuccess"
        >
          <img
            v-if="machineInfo.image"
            :src="machineInfo.image"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        支持扩展名：jpg、png，文件不得大于100kb
      </el-form-item>
    </el-form>
    <div class="bottom-but">
      <Button color="config" title="取消"></Button>
      <Button color="addBtn" title="确认" @click="addcheckYes"></Button>
    </div>
  </Dialog>
</template>

<script>
import Button from "@/components/ls-button";
import Dialog from "@/components/Dialogue";
import { getPhoto } from "@/api/public";
export default {
  props: {
    visible: {
      type: Boolean,
    },
  },
  components: {
    Button,
    Dialog,
  },
  data() {
    return {
      machineInfo: {
        name: "",
        model: "",
        vmRow: 1,
        vmCol: 1,
        channelMaxCapacity: 1,
        image: "",
      },
    };
  },
  created() {},

  methods: {
    async handleAvatarSuccess(file) {
      console.log(file.file);
      const formData = new FormData();
      formData.append("fileName", file.file);
      const { data } = await getPhoto(formData);
      console.log(data);
      // this.machineInfo.image = URL.createObjectURL(file.raw);
      this.machineInfo.image = data;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt100kb = file.size / 1024 / 1024 < 0.1;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt100kb) {
        this.$message.error("上传头像图片大小不能超过 100KB!");
      }
      return isJPG && isLt100kb;
      // return isLt100kb;
    },
    addcheckYes() {
      this.$emit("addcheckYes", this.machineInfo);
    },
  },

  computed: {
    visible2: {
      get() {
        return this.visible;
      },
      set(val) {
        //grants_改变由父组件控制
        this.$emit("on-change", val);
      },
    },
  },
};
</script>

<style scoped lang="scss">
.el-input {
  width: 90%;
}
.el-input-number {
  width: 90%;
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
  background-color: #f3f6fb;
  font-size: 28px;
  color: #000;
  width: 76px;
  height: 76px;
  line-height: 76px;
  text-align: center;
}
.avatar {
  width: 76px;
  height: 76px;
  display: block;
}
.bottom-but {
  display: flex;
  justify-content: center;
}
</style>
