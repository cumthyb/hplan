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
            class='user'>欢迎用户{{formLogin.alisename}}</span>
      <span v-if='loginState'
            class='user canclick'>
        <nuxt-link :to="{name:'personal-center-customer',params:{ 'username': formLogin.username }}">个人中心</nuxt-link>
      </span>

      <span v-if='!loginState'
            class='user canclick'
            @click="onLogin">登陆</span>
      <span v-if='!loginState'
            class='user canclick'
            @click="onRegister">注册</span>
      <span v-if='loginState'
            class='user canclick'
            @click="onLogout">退出</span>
    </div>
    <Modal v-model="modalRegister"
           width='350'
           title="会员注册">
      <div class='formRegister'>
        <Form ref="formRegister"
              v-if='modalRegister'
              :model="formRegister"
              :rules="ruleRegister"
              :label-width="80">
          <FormItem label="用户名"
                    prop="username">
            <Input v-model="formRegister.username"
                   placeholder="Enter your username"></Input>
          </FormItem>
          <FormItem label="昵称"
                    prop="alisename">
            <Input v-model="formRegister.alisename"
                   placeholder="Enter your username"></Input>
          </FormItem>
          <FormItem label="性别"
                    prop="sex">
            <RadioGroup v-model="formRegister.sex">
              <Radio label="男"></Radio>
              <Radio label="女"></Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="QQ"
                    prop="qq">
            <Input v-model="formRegister.qq"
                   placeholder="Enter your qq"></Input>
          </FormItem>
          <FormItem label="邮箱"
                    prop="email">
            <Input v-model="formRegister.email"
                   placeholder="Enter your e-email"></Input>
          </FormItem>
          <FormItem label="手机"
                    prop="tel">
            <Input v-model="formRegister.tel"
                   placeholder="Enter your tel"></Input>
          </FormItem>
          <FormItem label="密码"
                    prop="password">
            <Input v-model="formRegister.password"
                   type='password'
                   placeholder="Enter your password"></Input>
          </FormItem>
          <FormItem label="确认密码"
                    prop="password">
            <Input v-model="formRegister.password"
                   type='password'
                   placeholder="Enter your password"></Input>
          </FormItem>
          <FormItem>
            <Button type="primary"
                    @click="handleRegister('formRegister')">注册</Button>
            <Button @click="handleReset('formRegister')"
                    style="margin-left: 8px">取消</Button>
          </FormItem>
        </Form>
      </div>
      <div slot='footer'> </div>
    </Modal>
    <Modal v-model="modalLogin"
           title="会员登陆"
           width='350'>
      <div class='formLogin'>
        <Form ref="formLogin"
              v-if='modalLogin'
              :model="formLogin"
              :rules="ruleLogin"
              :label-width="80">
          <FormItem label="用户名"
                    prop="username">
            <Input v-model="formLogin.username"
                   placeholder="Enter your username"></Input>
          </FormItem>
          <FormItem label="密码"
                    prop="password">
            <Input v-model="formLogin.password"
                   type='password'
                   placeholder="Enter your password"></Input>
          </FormItem>
          <FormItem>
            <Button type="primary"
                    @click="handleLogin('formLogin')">登陆</Button>
            <Button @click="modalLogin=false"
                    style="margin-left: 8px">取消</Button>
          </FormItem>
        </Form>
      </div>
      <div slot='footer'> </div>
    </Modal>
  </div>
</template>
<script>
import Mock from 'mockjs'
export default {
  data() {
    return {
      loginState: false,
      modalLogin: false,
      modalRegister: false,
      formRegister: {
        username: '1',
        alisename: '',
        email: 'email@server.com',
        tel: '18513040628',
        password: '2',
        sex: '男',
        qq: 787
      },
      ruleRegister: {
        username: [
          {
            required: true,
            message: 'The username cannot be empty',
            trigger: 'blur'
          }
        ],
        alisename: [
          {
            required: true,
            message: 'The alisename cannot be empty',
            trigger: 'blur'
          }
        ],
        qq: [
          {
            required: true,
            message: 'The alisename cannot be empty',
            trigger: 'blur'
          }
        ],
        sex: [
          {
            required: true,
            message: 'The alisename cannot be empty',
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            message: 'Mailbox cannot be empty',
            trigger: 'blur'
          },
          { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
        ],

        tel: [
          {
            required: true,
            message: 'Please enter a personal introduction',
            trigger: 'blur'
          },
          {
            type: 'string',
            max: 11,
            message: 'Introduce no more than 11 words',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: 'Please enter a personal introduction',
            trigger: 'blur'
          },
          {
            type: 'string',
            max: 20,
            message: 'Introduce no more than 20 words',
            trigger: 'blur'
          }
        ]
      },
      formLogin: {
        username: 'Daniel',
        password: '2'
      },
      ruleLogin: {
        username: [
          {
            required: true,
            message: 'The username cannot be empty',
            trigger: 'blur'
          }
        ],

        password: [
          {
            required: true,
            message: 'Please enter a personal introduction',
            trigger: 'blur'
          },
          {
            type: 'string',
            max: 20,
            message: 'Introduce no less than 20 words',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    onLogin() {
      this.modalLogin = true
    },
    onLogout() {
      this.loginState = false
      this.$emit('logout', this.formLogin.alisename)
    },
    onRegister() {
      this.modalRegister = true
      this.formRegister.username = Mock.Random.first()
      this.formRegister.alisename = Mock.Random.cname()
    },

    handleLogin(username) {
      this.$refs[username].validate(valid => {
        if (valid) {
          let _this = this
          this.$http
            .post('member-login', this.formLogin)
            .then(response => {
              _this.$Notice.info({
                title: '登陆成功'
              })
               _this.formLogin.alisename = response.data.alisename
              _this.loginState = true
              setTimeout(() => {
                _this.modalLogin = false               
                _this.$emit('login', response.data.alisename)
              }, 200)
            })
            .catch(error => {
              this.$Notice.error({
                title: error.message
              })
            })
        } else {
          this.$Message.error('表单填写不完整')
        }
      })
    },
    handleRegister(username) {
      this.$refs[username].validate(valid => {
        if (valid) {
          this.$http
            .post('member-register', this.formRegister)
            .then(response => {
              this.$Notice.info({
                title: '注册成功'
              })
              setTimeout(() => {
                this.modalRegister = false
              }, 1000)
            })
            .catch(error => {
              this.$Notice.error({
                title: error.message
              })
            })
        } else {
          this.$Message.error('表单填写不完整')
        }
      })
    },
    handleReset(username) {
      this.$refs[username].resetFields()
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
  }
}
.formLogin,
.formRegister {
  padding-right: 20px;
}
</style>
