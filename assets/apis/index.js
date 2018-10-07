export default {
  //会员注册
  'member-register': {
    url: '/api/member/register',
    method: 'get'
  },
  //会员登陆
  'member-login': {
    url: '/api/member/login',
    method: 'post'
  },

  //会员信息
  'member-info': {
    url: '/api/member/info',
    method: 'post'
  },
  //获取图片上传token
  'upload-token': {
    url: '/api/uptoken',
    method: 'get'
  },
  ////////////课程系类////////////////
  //新建课程系列
  'create-course-series': {
    url: '/api/course-series/creat',
    method: 'post'
  },

  //获取所有课程系列
  'find-all-course-series': {
    url: '/api/course-series/findAll',
    method: 'get'
  },

  ////////////上传课程///////////////

  //上传课程
  'create-course': {
    url: '/api/course/create',
    method: 'post'
  },

  //获取所有课程系列
  'find-course': {
    url: '/api/course/find',
    method: 'get'
  },

  ////////////课程管理///////////////
  //获取所有课程系列
  'find-all-course': {
    url: '/api/course/findAll',
    method: 'get'
  }
}
