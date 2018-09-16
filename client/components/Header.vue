<template>
  <div class='header-container'>
    <div class="left">
      <div class="h-logo">
        <img src="https://static1.51cto.com/edu/center/images/home/logo.png"
          width="157"
          height="34">
      </div>
      <div class="h-slogan">
        <img src="https://static1.51cto.com/edu/center/images/home/logo2.png"
          width="157"
          height="34">
      </div>
    </div>
    <div class='right'>
      <span v-if='loginState'
        class='user'>欢迎用户{{user.aliasname}}</span>
      <span v-if='!loginState'
        class='user canclick'
        @click="onLogin">登陆</span>
      <span v-if='!loginState'
        class='user canclick'
        @click="onRegister">注册</span>
      <Menu mode="horizontal"
        active-name="3"
        class='user user-menu'
        v-if='loginState'>
        <Submenu name="3">
          <template slot="title">
            <Avatar src="https://www.easyicon.net/api/resizeApi.php?id=1167486&size=24" />
          </template>
          <MenuItem name="3-1">
          <nuxt-link :to="{name:'personal-center-customer',params:{ 'username': user.username }}">个人中心</nuxt-link>
          </MenuItem>
          <MenuItem name="3-2">
          <span @click="onLogout">退出</span>
          </MenuItem>

        </Submenu>

      </Menu>
    </div>
    <Modal v-model="modalRegister"
      width='350'
      title="会员注册">
      <MemberRegister v-if='modalRegister'
        @register-success='onRegisterSuccess'
        @register-fail='onRegisterFail' />
      <div slot='footer'> </div>
    </Modal>
    <Modal v-model="modalLogin"
      title="会员登陆"
      width='350'>
      <MemberLogin v-if='modalLogin'
        @login-cancel='onLoginCancel'
        @login-success='onLoginSuccess'
        @login-fail='onLoginFail' />
      <div slot='footer'> </div>
    </Modal>
  </div>
</template>
<script>
import MemberRegister from './Register.vue'
import MemberLogin from './Login.vue'

export default {
  components: {
    MemberRegister,
    MemberLogin
  },
  data() {
    return {
      user: {
        username: '',
        aliasname: ''
      },
      loginState: false,
      modalLogin: false,
      modalRegister: false,
    }
  },
  mounted(){
    // let img=new Image(AvatarPic)
  },
  methods: {
    onLogin() {
      this.modalLogin = true
    },
    onLoginCancel() {
      this.modalLogin = false
    },
    onLoginSuccess(data) {
      this.loginState = true
      this.modalLogin = false
      this.user =Object.assign({},data)
    },
    onLoginFail() {
      this.modalLogin = false
    },
    onLogout() {
      this.loginState = false
      this.$emit('logout', this.user.aliasname)
      this.$store.commit('logout')
    },
    onRegister() {
      this.modalRegister = true
    },
    onRegisterSuccess() {
      this.modalRegister = false
    },
    onRegisterFail() {
      this.modalRegister = false
    }
  }
}
</script>
<style lang="less">
.header-container {
    width: 1200px;
    height: 62px;
    margin: 0 auto;
    .left {
        height: 100%;
        display: inline-block;
        .h-logo,
        .h-slogan {
            height: 100%;
            display: inline-block;
            margin-right: 20px;
            position: relative;
            img {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
            }
        }
        .h-logo {
            width: 160px;
        }
        .h-slogan {
            width: 160px;
        }
    }
    .right {
        float: right;
        right: 10px;
        line-height: 62px;
        text-align: center;
        padding-right: 20px;
        .user {
            margin: 0 5px;
        }
        .canclick {
            background: #fff;
            color: #00baf2;
            cursor: pointer;
        }
        .user-menu {
            float: right;
            z-index: 901;
            ul {
            }
        }
    }
}
</style>
