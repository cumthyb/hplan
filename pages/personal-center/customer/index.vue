<!--  -->
<template>
  <div class='personal-info-center-panel'>
    <Menu mode="horizontal"
          :active-name="currentMenuItem"
          class='menu'>
      <MenuItem name="1">
      <Icon type="ios-paper"></Icon>
      我的课程
      </MenuItem>
      <MenuItem name="2">
      <Icon type="ios-list"></Icon>
      我的作业
      </MenuItem>
      <MenuItem name="3">
      <Icon type="ios-person"></Icon>
      个人信息
      </MenuItem>
    </Menu>
    <div class='content'>
      <transition>
        <keep-alive>
          <component :is="view"></component>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>
<script>
export default {
  name: 'personalcenter-customer',

  data() {
    return {
      currentMenuItem:'1',
      username: '',
      formItem: {
        username: '',
        aliasname: '',
        email: '',
        tel: '',
        password: ''
      }
    }
  },
  mounted() {
    this.username = this.$route.params.username

    this.viewPersonalInfo(this.username)
  },
  methods: {
    viewPersonalInfo(username) {
      this.$http
        .post('member-info', { username: username })
        .then(r => {
          this.formItem = r.data
        })
        .catch(error => {
          this.$Notice.error({
            title: error.message
          })
        })
    }
  }
}
</script>
<style lang='less'>
.personal-info-center-panel {
  width: 1200px;
  height: 100%;
  margin: 20px auto;
  .content {
  }
}
</style>