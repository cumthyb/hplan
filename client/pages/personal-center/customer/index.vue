<!--  -->
<template>
  <div class='customer-info-center-panel'>
    <Menu mode="horizontal"
          :active-name="currentMenuItem"
          class='menu'
          @on-select='onMenuChange'>
      <MenuItem name="course">
      <Icon type="ios-paper"></Icon>
      我的课程
      </MenuItem>
      <MenuItem name="task">
      <Icon type="ios-list"></Icon>
      我的作业
      </MenuItem>
      <MenuItem name="psninfo">
      <Icon type="ios-person"></Icon>
      个人信息
      </MenuItem>
    </Menu>
    <div class='content'>
      <transition>
        <keep-alive include="psninfo,task,course">
          <component :is="view"></component>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>
<script>
import psninfo from './psninfo.vue'
import course from './course.vue'
import task from './task.vue'
export default {
  name: 'personalcenter-customer',
  components: {
    psninfo,
    course,
    task
  },
  data() {
    return {
      currentMenuItem: 'course',
      username: '',
      view: 'course',
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
    },
    onMenuChange(name) {
      this.view = name
    }
  }
}
</script>
<style lang='less'>
.customer-info-center-panel {
  width: 1200px;
  height: 100%;
  margin: 20px auto;
  .content {
  }
}
</style>