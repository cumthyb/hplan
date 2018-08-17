<template>
    <Card class="com-login-card">
        <Avatar icon="ios-person"
                size="large" />
        <div class="btns">
            <Button class="btn">登陆</Button>
            <Button type="primary"
                    class="btn">注册</Button>
        </div>

    </Card>
</template>
<script>
export default {}
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
