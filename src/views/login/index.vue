<template>
  <div class="login-container">
    <el-row class="login-content">
      <el-col :span="16">
        <div class="loginImgDiv">
          广州气象局风雷达组网系统
        </div>
      </el-col>
      <el-col :span="8">
        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          class="login-form"
          autocomplete="on"
          label-position="left"
        >

          <div class="title-container">
            <div>欢迎登录</div>
            <div class="titleLine" />
          </div>

          <el-form-item prop="username">
            <span class="svg-container">
              <svg-icon icon-class="user" />
            </span>
            <el-input
              ref="username"
              v-model="loginForm.username"
              placeholder="账户"
              name="username"
              type="text"
              tabindex="1"
              autocomplete="on"
            />
          </el-form-item>

          <el-tooltip
            v-model="capsTooltip"
            content="Caps lock is On"
            placement="right"
            manual
          >
            <el-form-item prop="password">
              <span class="svg-container">
                <svg-icon icon-class="password" />
              </span>
              <el-input
                :key="passwordType"
                ref="password"
                v-model="loginForm.password"
                :type="passwordType"
                placeholder="密码"
                name="password"
                tabindex="2"
                autocomplete="on"
                @keyup.native="checkCapslock"
                @blur="capsTooltip = false"
                @keyup.enter.native="handleLogin"
              />
              <span
                class="show-pwd"
                @click="showPwd"
              >
                <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
              </span>
            </el-form-item>
          </el-tooltip>

          <el-button
            :loading="loading"
            type="primary"
            style="width:100%;margin-bottom:30px;"
            @click.native.prevent="handleLogin"
          >登录</el-button>

          <div style="position:relative;display:none">
            <el-button
              class="thirdparty-button"
              type="primary"
              @click="showDialog=true"
            >
              Or connect with
            </el-button>
          </div>
        </el-form>
      </el-col>
    </el-row>

    <el-dialog
      title="Or connect with"
      :visible.sync="showDialog"
    >
      Can not be simulated on local, so please combine you own business simulation! ! !
      <br>
      <br>
      <br>
      <social-sign />
    </el-dialog>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import SocialSign from './components/SocialSignin'

export default {
  name: 'Login',
  components: { SocialSign },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 4) {
        callback(new Error('密码不能小于4位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.replace({ path: this.redirect || '/', query: this.otherQuery })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
    // afterQRScan() {
    //   if (e.key === 'x-admin-oauth-code') {
    //     const code = getQueryObject(e.newValue)
    //     const codeMap = {
    //       wechat: 'code',
    //       tencent: 'code'
    //     }
    //     const type = codeMap[this.auth_type]
    //     const codeName = code[type]
    //     if (codeName) {
    //       this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
    //         this.$router.push({ path: this.redirect || '/' })
    //       })
    //     } else {
    //       alert('第三方登录失败')
    //     }
    //   }
    // }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #606266;
$icon_color: #909399;
$input_height: 40px;
$border_base_color: #dcdfe6;

// @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
//   .login-container .el-input input {
//     color: $cursor;
//   }
// }

/* reset element-ui css */
.login-container {
  .el-form-item {
    border: 1px solid $border_base_color;
    box-sizing: border-box;
    padding: 0 12px;
    border-radius: 4px;
    position: relative;
  }
  .el-form-item__content {
    line-height: $input_height;
  }
  .svg-container {
    padding-top: 4px;
    font-size: 16px;
    color: $icon_color;
    vertical-align: middle;
    display: inline-block;
  }
  .show-pwd {
    padding-top: 4px;
    position: absolute;
    // top: 7px;
    font-size: 16px;
    color: $icon_color;
    cursor: pointer;
    user-select: none;
  }
  .el-input {
    display: inline-block;
    height: $input_height;
    width: 85%;

    input {
      color: #606266 !important;
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 8px;
      // color: $light_gray;
      height: $input_height;
      caret-color: $cursor;
      max-height: 0px;
      background-clip: content-box;
      &::first-line {
        // color: #fff;
      }
      // &:-webkit-autofill {
      //   box-shadow: 0 0 0px 1000px $bg inset !important;
      //   -webkit-text-fill-color: $cursor !important;
      // }
    }
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #c0c4cc;
$light_gray: #eee;
.el-form-item__content {
  padding-left: 20px;
}
.login-container {
  height: 100%;
  width: 100%;
  // background-color: $bg;
  overflow: hidden;
  // background-image: url('../../assets/images/bg05/9.png');
  // background-image: url('../../assets/images/bg02/3.jpg');
  // background-image: url('../../assets/images/bg03/5.jpg');
  // background-image: url('../../assets/images/bg04/7.jpg');
  // background-size: cover;
  background: url(../../assets/images/bg05/9.png) bottom no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;

  .login-content {
    width: 1200px;
    height: 600px;
    box-shadow: 4px 4px 12px 4px rgba(23, 38, 42, 0.49);
  }

  .loginImgDiv {
    height: 600px;
    background: url(../../assets/images/bg05/10.png) bottom no-repeat;

    font-family: 'SourceHanSansSC-Bold';
    font-weight: 600;
    text-align: left;
    font-size: 46px;
    color: #fff;
    text-shadow: 5px 4px 5px rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px 0 0 4px;
  }

  .login-form {
    height: 600px;
    max-width: 100%;
    padding: 0 35px;
    overflow: hidden;
    border-radius: 0 4px 4px 0;
    background: #fff;
  }

  .title-container {
    position: relative;
    background: none;
    font-size: 30px;
    font-family: Source Han Sans SC;
    font-weight: 400;
    color: #2c84f0;
    padding-top: 120px;
    margin-bottom: 54px;
    .titleLine {
      width: 200px;
      height: 2px;
      background: #2c84f0;
      margin-top: 5px;
    }
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
