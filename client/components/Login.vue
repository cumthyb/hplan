<template>
    <div class='formLogin'>
        <Form ref="formLogin"
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
                <Button @click="cancelLogin"
                    style="margin-left: 8px">取消</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
export default {
    components: {

    },
    data() {
        return {
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
                        message: 'Please enter a personal password',
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
        handleLogin(username) {
            this.$refs[username].validate(valid => {
                if (valid) {
                    this.$http
                        .post('member-login', this.formLogin)
                        .then(response => {
                            this.$Notice.info({
                                title: '登陆成功'
                            })
                            setTimeout(() => {
                                this.$store.commit('login', response.data)
                                this.$emit('login-success', response.data)
                            }, 200)
                        })
                        .catch(error => {
                            this.$Notice.error({
                                title: error.message
                            })
                            this.$emit('login-fail')
                        })
                } else {
                    this.$Message.error('表单填写不完整')
                }
            })
        },
        cancelLogin() {
            this.$emit('login-cancel')
        }
    },
}
</script>

<style lang="less">
.formLogin {
    padding-right: 20px;
}
</style>
