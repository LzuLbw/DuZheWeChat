<template>
  <view class="container">
    <view class="example">
      <uni-forms ref="form" :model="user" labelWidth="80px">
        <uni-forms-item label="用户名" name="username">
          <uni-easyinput v-model="user.username" placeholder="请输入用户名" />
        </uni-forms-item>
        <uni-forms-item label="密码" name="password">
          <uni-easyinput v-model="user.password" placeholder="请输入密码" />
        </uni-forms-item>
        
      </uni-forms>
      <button type="primary" @click="submit">提交</button>
    </view>
    </view>
  </view>
</template>

<script>

  import { register } from "@/api/login"

  export default {
    data() {
      return {
		  codeUrl: "",
		  captchaEnabled: true,
		  globalConfig: getApp().globalData.config,
        user: {
          username: "zhang",
          password: "zhang",
        }
      }
    },
    onLoad() {

    },
    onReady() {
      this.$refs.form.setRules(this.rules)
    },
    methods: {

      submit(ref) {
        this.$refs.form.validate().then(res => {
          register(this.user).then(response => {
            this.$modal.msgSuccess("注册成功")
          })
        })
      }
    }
  }
</script>

<style lang="scss">
  page {
    background-color: #ffffff;
  }

  .example {
    padding: 15px;
    background-color: #fff;
  }

  .segmented-control {
    margin-bottom: 15px;
  }

  .button-group {
    margin-top: 15px;
    display: flex;
    justify-content: space-around;
  }

  .form-item {
    display: flex;
    align-items: center;
    flex: 1;
  }

  .button {
    display: flex;
    align-items: center;
    height: 35px;
    line-height: 35px;
    margin-left: 10px;
  }
</style>
