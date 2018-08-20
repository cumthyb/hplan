<!--  -->
<template>
    <div class='personal-info-center-panel'>
        <Menu active-name="1-2"
              :open-names="['1']">
            <Submenu name="1">
                <template slot="title">
                    <Icon type="ios-filing"></Icon>
                    个人信息
                </template>
                <MenuItem name="1-1"
                          @on-select='viewPersonalInfo(username)'>账号信息</MenuItem>
            </Submenu>
            <Submenu name="2">
                <template slot="title">
                    <Icon type="ios-gear"></Icon>
                    我的课程
                </template>
                <MenuItem name="2-1">课程一</MenuItem>
                <MenuItem name="2-2">课程二</MenuItem>
            </Submenu>
        </Menu>
        <div class='info-panel'>
            <p>{{formItem.username}}</p>
            <p>{{formItem.aliasname}}</p>
            <p>{{formItem.email}}</p>
            <p>{{formItem.tel}}</p>
            <p>{{formItem.password}}</p>
        </div>
    </div>
</template>

<script>
export default {
  name: 'personalcenter-customer',

  data() {
    return {
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
    debugger
    this.viewPersonalInfo( this.username)
  },
  methods: {
    viewPersonalInfo(username) {
      debugger
      this.$http
        .post('member-info', {'username':username})
        .then(r => {
          debugger
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
}
</style>