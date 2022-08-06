<template>
  <div class="navbar">

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <el-dropdown-menu>
          <div class="avatar-wrapper">
            <img v-imgError="defaultImg" :src="userInfo.image+'123'" class="user-avatar">
            <div class="username">欢迎你：{{ userInfo.userName }}</div>
            <el-tooltip class="item" effect="dark" content="退出登录" placement="bottom">
              <el-button @click="logout"><span>退出</span> <i class="el-icon-caret-bottom" /></el-button>
            </el-tooltip>
          </div>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import userPhoto from '@/assets/user.jpg'
export default {
  components: {
  },
  data() {
    return {
      defaultImg: userPhoto
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  // background: #fff;
  background-image: url("./img/navbar.png");
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    width: 250px;

    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      // color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        color:#fff;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -10px;
          // top: 25px;
          font-size: 12px;
        }
      }
    }
  }
  .username{
    margin-left: 30px;
    margin-right: 20px;
  }
  .el-button{
      border:unset;
      background:unset;
      color: #fff;
      padding: 0;
  }
}
</style>
