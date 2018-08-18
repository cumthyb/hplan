<template>
  <div>
    <Card class="com-login-card">
      <Avatar icon="ios-person"
              size="large" />
      <div class="btns">
        <Button type="primary"
                class="btn"
                @click="onLogin">登陆</Button>
        <Button class="btn"
                @click="onRegister">注册</Button>
      </div>
    </Card>
    <Modal v-model="modalRegister"
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
          <FormItem label="邮箱"
                    prop="mail">
            <Input v-model="formRegister.mail"
                   placeholder="Enter your e-mail"></Input>
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
                    @click="handleSubmit('formRegister')">注册</Button>
            <Button @click="handleReset('formRegister')"
                    style="margin-left: 8px">取消</Button>
          </FormItem>
        </Form>
      </div>
      <div slot='footer'> </div>
    </Modal>
    <Modal v-model="modalLogin"
           title="会员登陆">
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
                    @click="handleSubmit('formLogin')">登陆</Button>
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
export default {
  data() {
    return {
      modalLogin: false,
      modalRegister: false,
      formRegister: {
        username: '',
        mail: '',
        tel: '',
        password: ''
      },
      ruleRegister: {
        username: [
          {
            required: true,
            message: 'The username cannot be empty',
            trigger: 'blur'
          }
        ],
        mail: [
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
            min: 20,
            message: 'Introduce no less than 20 words',
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
      },
      formLogin: {
        username: 'admin',
        password: 'admin'
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
    onRegister() {
      this.modalRegister = true
    },

    handleSubmit(username) {
      this.$refs[username].validate(valid => {
        if (valid) {
          this.$http
            .post('member-login',this.formLogin)
            .then(response => {
              debugger
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
.com-login-card {
  text-align: center;
  height: 100%;
  .ivu-card-body {
    height: 100%;
    .ivu-avatar-large {
      width: 120px;
      height: 120px;
      line-height: 120px;
      border-radius: 60px;
      font-size: 80px;
      margin: 20px;
    }
  }
  .btns {
    padding-top: 20px;
    .btn {
      margin: 0 15px;
    }
  }
}
</style>
