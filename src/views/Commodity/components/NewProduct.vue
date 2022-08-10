<!--  -->
<template>
  <div>
    <el-form ref="fromData" :model="fromData" class="el-input" label-width="80px" label-position="left" :rules="formRules">
      <el-form-item label="商品名称：" prop="skuName">
        <el-input v-model="fromData.skuName" />
      </el-form-item>
      <el-form-item label="品牌：" prop="brandName">
        <el-input v-model="fromData.brandName" />
      </el-form-item>
      <el-form-item label="价格(元)：" prop="price">
        <el-input-number v-model="fromData.price" controls-position="right" />
      </el-form-item>
      <el-form-item label="商品类型" prop="classId">
        <el-select v-model="fromData.classId" filterable placeholder="请选择">
          <el-option
            v-for="item in ItemTypeList.currentPageRecords"
            :key="item.classId"
            :label="item.className"
            :value="item.classId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="规格：" prop="unit">
        <el-input v-model="fromData.unit" />
      </el-form-item>
      <el-form-item v-model="fromData.skuImage" label="商品图片：" prop="skuImage">
        <el-upload class="avatar-uploader" :show-file-list="false" action="" accept=".jpg, .png" :http-request="handlePictureCardPreview" :before-upload="beforeAvatarUpload">
          <img v-if="!!fromData.skuImage" :src="fromData.skuImage" class="avatar" style="width: 80px; height: 80px">
          <i v-else class="el-icon-upload2 avatar-uploader-icon" style="width: 80px; height: 80px ; font-size: 20px;" />
          <div slot="tip" class="el-upload_tip">仅支持扩展名为jpg/png文件，且不超过100kb</div>
        </el-upload>
      </el-form-item>
      <div class="addWorkBtn">
        <lsButton title="取消" color="config" @click="CancelBtn" />
        <lsButton title="确定" color="addBtn" @click="addCommodity" />
      </div>
    </el-form>
  </div>
</template>

<script>
import { setPictureUpload, getCommodityType, setCommodity } from '@/api/CommodityManagement'
import lsButton from '@/components/ls-button'
export default {
  name: 'NewProduct',
  components: { lsButton },
  props: {
    // eslint-disable-next-line vue/prop-name-casing
    judge: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      fromData: {
        skuImage: '',
        unit: '',
        classId: '',
        price: '',
        brandName: '',
        skuName: ''
      }, // 新增数据
      ItemTypeList: {},
      formRules: { // 表单校验
        skuImage: [{ required: true, message: '请选择图片', trigger: 'blur' }],
        unit: [{ required: true, message: '请输入商品规格', trigger: 'blur' }],
        classId: [{ required: true, message: '请选择商品类型', trigger: 'blur' }],
        price: [{ required: true, message: '请输入商品价格', trigger: 'blur' }],
        brandName: [{ required: true, message: '请输入品牌名称', trigger: 'blur' }],
        skuName: [{ required: true, message: '请输入商品名称', trigger: 'blur' }]
      }
    }
  },
  computed: {},
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getCommodityType()
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {

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
      this.fromData.skuImage = data
    },
    beforeAvatarUpload(file) {
      const isLt2kb = file.size / 1024 / 1024 < 0.100
      if (!isLt2kb) {
        this.$message.error('上传头像图片大小不能超过 100kb!')
      }
      return isLt2kb
    },
    async getCommodityType() {
      const { data } = await getCommodityType()
      this.ItemTypeList = data
      console.log(data)
    },
    async addCommodity() {
      try {
        await this.$refs.fromData.validate()
        if (this.judge) {
          try {
            const res = await setCommodity(this.fromData)
            if (res) {
              this.$emit('AddClose')
              this.$refs.fromData.resetFields()
            }
          } catch (err) { 1 }
        } else {
          this.$emit('Modify')
        }
      } catch (err) { 1 }
    },
    CancelBtn() {
      this.$emit('click')
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
