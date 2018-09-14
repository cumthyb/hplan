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
  }
}