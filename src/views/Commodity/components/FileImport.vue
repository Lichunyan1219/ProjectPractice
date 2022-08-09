<!--  -->
<template>
  <div>
    <el-upload
      class="upload-demo"
      action=""
      :limit="1"
      :show-file-list="false"
      :before-upload="beforeAvatarUpload"
      accept=".xls, .xlsx"
      :http-request="handlePictureCardPreview"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传xls/xlsx文件，且不超过1MB</div>
    </el-upload>
    <div class="addWorkBtn">
      <lsButton title="取消" color="config" @click="CancelBtn" />
      <lsButton title="确定" color="addBtn" @click="addFileList" />
    </div>
  </div>
</template>

<script>
import { CommodityDataImport } from '@/api/CommodityManagement'
import lsButton from '@/components/ls-button'
export default {
  components: {
    lsButton
  },
  data() {
    return {
      fileList: [],
      file: ''
    }
  },
  computed: {},
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {

  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {

  },
  methods: {
    // 取消关闭弹框
    CancelBtn() {
      this.$emit('CancelBtn')
    },
    async  addFileList() {
      console.log(this.file)
      try {
        var formData = new FormData()
        formData.append('fileName', this.file.file)
        await CommodityDataImport(formData)
        this.$emit('CancelBtn')
        this.$message.success('导入成功')
      } catch (err) { 1 }
    },
    beforeAvatarUpload(file) {
      console.log(file)
      const isLt2kb = file.size / 1024 / 1024 < 1
      if (!isLt2kb) {
        this.$message.error('上传头像图片大小不能超过 1MB!')
      }
      return isLt2kb
    },
    async handlePictureCardPreview(file) {
      this.file = file
    }
  }
}
</script>
<style scoped>
.addWorkBtn{
 display: flex;
 justify-content: center;
 align-items: center;
}
</style>
