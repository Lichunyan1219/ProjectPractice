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
        <el-select style="width: 80%" placeholder="请选择" :value="item">
          <el-option
            :value="'打打打'"
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
            :value="'打打打'"
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
import LsButton from '@/components/ls-button' // 按钮
export default {

  components: {
    LsButton
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

  created() {},

  methods: {
    onClose() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style scoped lang="scss">
.jpg-png {
  color: #bac0cd;
}
</style>
