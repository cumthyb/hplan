<!--  -->
<template>
  <div class='customer-info-center-panel'>
    <Menu :active-name="currentMenuItem"
      class='menu'
      @on-select='onMenuChange'>
      <MenuItem name="create">
      <Icon type="md-add-circle"></Icon>
      新建课程
      </MenuItem>
      <MenuItem name="upload">
      <Icon type="ios-cloud-upload"></Icon>
      上传课程
      </MenuItem>
      <MenuItem name="manage">
      <Icon type="ios-construct"></Icon>
      管理课程
      </MenuItem>
      <MenuItem name="homework">
      <Icon type="ios-create"></Icon>
      批改作业
      </MenuItem>
    </Menu>
    <div class='content'>
      <transition>
        <keep-alive include="create,upload,manage,homework">
          <component :is="view"></component>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>
<script>
import createCourse from './createCourse.vue'
import uploadCourse from './uploadCourse.vue'
import manageCourse from './manageCourse.vue'
import correctHomework from './correctHomework.vue'
export default {
  name: 'personalcenter-customer',
  components: {
    'create': createCourse,
    'upload': uploadCourse,
    'manage': manageCourse,
    'homework': correctHomework
  },
  data() {
    return {
      currentMenuItem: 'create',
      username: '',
      view: 'create',
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
    display: flex;
    height:  ~"calc(100% - 130px)";
    .menu {
        width: 240px;
    }
    .content {
        flex: 1;
    }
}
</style>