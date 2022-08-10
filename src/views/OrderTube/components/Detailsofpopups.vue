<template>
  <div>
    <div class="headimg">
      <img :src="imgleft" alt="" class="task-status">
      <span class="headimg-text">{{ particulars.status }}</span>
      <img class="pic" :src="imgright" alt="">
    </div>
    <el-form
      :inline="true"
      :model="particulars"
      class="demo-form-inline"
      label-width="110px"
      size="medium"
    >
      <el-form-item>
        <template slot="label">
          <span class="label-text"> 订单编号: </span>
        </template>
        <span class="form-item">{{ particulars.orderNo }}</span>
      </el-form-item>
      <el-form-item>
        <template slot="label">
          <span class="label-text"> 商品名称: </span>
        </template>
        <span class="form-item">{{ particulars.skuName }}</span>
      </el-form-item>
      <el-form-item>
        <template slot="label">
          <span class="label-text"> 订单金额: </span>
        </template>
        <span class="form-item">{{ particulars.amount }}</span>
      </el-form-item>
      <el-form-item>
        <template slot="label">
          <span class="label-text"> 设备编号: </span>
        </template>
        <span class="form-item">{{ particulars.innerCode }}</span>
      </el-form-item>
      <el-form-item>
        <template slot="label">
          <span class="label-text"> 创建时间: </span>
        </template>
        <span class="form-item">{{ particulars.createTime }}</span>
      </el-form-item>
      <el-form-item>
        <template slot="label">
          <span class="label-text"> 完成时间: </span>
        </template>
        <span class="form-item">{{ particulars.updateTime }}</span>
      </el-form-item>
      <el-form-item>
        <template slot="label">
          <span class="label-text"> 支付方式: </span>
        </template>
        <span class="form-item">{{ particulars.payType }}</span>
      </el-form-item>
      <el-form-item>
        <template slot="label">
          <span class="label-text"> 设备地址: </span>
        </template>
        <span class="form-item">{{ particulars.addr }}</span>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import clearOkimgright from '../assets/pic.png'
import clearOkimgleft from '../assets/Snipaste.png'
export default {
  // 组件
  components: {},
  // 数据
  data() {
    return {
      particulars: {},
      imgleft: '',
      imgright: ''
    //   pic,
    //   Snipaste
    }
  },

  // 计算属性
  computed: {},

  // 创建后
  created() {},

  // 函数
  methods: {
    getDetail(row) {
      this.particulars = this.datatreating({ ...row })
    },
    //   数据处理
    datatreating(row) {
      const index = row.addr.lastIndexOf('-') + 1
      row.addr = row.addr.slice(index)
      switch (row.payType) {
        case '1':
          row.payType = '支付宝'
          break
        case '2':
          row.payType = '微信'
          break
      }
      console.log(row.status)
      switch (row.status) {
        case 0:
          row.status = '未支付'
          break
        case 1:
          row.status = '支付完成'
          break
        case 2:
          row.status = '出货成功'
          this.imgleft = clearOkimgleft
          this.imgright = clearOkimgright
          break
        case 3:
          row.status = '出货失败'
          break
      }
      return row
    }
  }
}
</script>

<style lang="scss" scoped>
.headimg {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 54px;
    margin-bottom: 30px;
    background-color: hsla(0,0%,92.5%,.39);
    .pic{
    margin-right: 76px;
    margin-bottom: 7px;
    }
    .task-status{
        margin-left: 22px;
    }
    .headimg-text{
        flex: 1;
        margin-left: 16px;
        color: rgba(0,0,0,.85);
    }
}

.el-form-item {
  margin: 0;
  .form-item {
    display: block;
    width: 185px;
  }
}
.label-text {
  font-weight: 400;
}
</style>
