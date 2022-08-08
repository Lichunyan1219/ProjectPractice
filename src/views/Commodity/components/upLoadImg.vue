<template>

  <div>
    <el-form-item v-model="image" label="头像" :prop="prop">
      <el-upload class="avatar-uploader" :show-file-list="false" action="" :http-request="handlePictureCardPreview" :before-upload="beforeAvatarUpload">
        <img v-if="!!image" :src="image" class="avatar" style="width: 80px; height: 80px">
        <i v-else class="el-icon-upload2 avatar-uploader-icon" style="width: 80px; height: 80px ; font-size: 20px;" />
        <div slot="tip" class="el-upload_tip">仅支持扩展名为jpg/png文件，且不超过100kb</div>
      </el-upload>
    </el-form-item>
  </div>
</template>

<script>
import { setPictureUpload } from '@/api/CommodityManagement'
export default {
  namr: 'undata',
  props: {
    model: {
      type: String,
      required: true
    },
    // eslint-disable-next-line vue/require-default-prop
    prop: {
      type: Array
    }
  },
  data() {
    return {
      formInfo: '',
      image: ''
    }
  },
  watch: {
    image: {
      handler(a, b) {
        this.$emit('update:model', a)
      }
    }
  },
  methods: {
    handleRemove(file) {
      // console.log(file)
      this.handlePictureCardPreview()
    },
    async handlePictureCardPreview(file) {
      var formData = new FormData()
      formData.append('fileName', file.file)
      const { data } = await setPictureUpload(formData)
      this.image = data
    },
    handleDownload(file) {
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2kb = file.size / 1024 / 1024 < 0.100

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!')
      }
      if (!isLt2kb) {
        this.$message.error('上传头像图片大小不能超过 100kb!')
      }
      return isJPG && isLt2kb
    }
  }
}
</script>
