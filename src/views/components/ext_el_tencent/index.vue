
<template>
  <!--<img ref="img">-->
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="new-password" label-position="left" style="position:relative">

      <div class="title-container">
        <h3 class="title">Union</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg id="icon-user" style="fill:#889aa4;width:14px;height:14px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130 130"><path d="M63.444 64.996c20.633 0 37.359-14.308 37.359-31.953 0-17.649-16.726-31.952-37.359-31.952-20.631 0-37.36 14.303-37.358 31.952 0 17.645 16.727 31.953 37.359 31.953zM80.57 75.65H49.434c-26.652 0-48.26 18.477-48.26 41.27v2.664c0 9.316 21.608 9.325 48.26 9.325H80.57c26.649 0 48.256-.344 48.256-9.325v-2.663c0-22.794-21.605-41.271-48.256-41.271z" stroke="#979797" /></svg>
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="new-password"
        />
      </el-form-item>

      <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item prop="password">
          <span class="svg-container">
            <svg id="icon-password" style="fill:#889aa4;width:14px;height:14px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path d="M108.8 44.322H89.6v-5.36c0-9.04-3.308-24.163-25.6-24.163-23.145 0-25.6 16.881-25.6 24.162v5.361H19.2v-5.36C19.2 15.281 36.798 0 64 0c27.202 0 44.8 15.281 44.8 38.961v5.361zm-32 39.356c0-5.44-5.763-9.832-12.8-9.832-7.037 0-12.8 4.392-12.8 9.832 0 3.682 2.567 6.808 6.407 8.477v11.205c0 2.718 2.875 4.962 6.4 4.962 3.524 0 6.4-2.244 6.4-4.962V92.155c3.833-1.669 6.393-4.795 6.393-8.477zM128 64v49.201c0 8.158-8.645 14.799-19.2 14.799H19.2C8.651 128 0 121.359 0 113.201V64c0-8.153 8.645-14.799 19.2-14.799h89.6c10.555 0 19.2 6.646 19.2 14.799z" /></svg>
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="Password"
            name="password"
            tabindex="2"
            autocomplete="new-password"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon v-if="false" :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            <svg id="icon-eye" style="fill:#889aa4;width:14px;height:14px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 64"><path d="M127.072 7.994c1.37-2.208.914-5.152-.914-6.87-2.056-1.717-4.797-1.226-6.396.982-.229.245-25.586 32.382-55.74 32.382-29.24 0-55.74-32.382-55.968-32.627-1.6-1.963-4.57-2.208-6.397-.49C-.17 3.086-.399 6.275 1.2 8.238c.457.736 5.94 7.36 14.62 14.72L4.17 35.96c-1.828 1.963-1.6 5.152.228 6.87.457.98 1.6 1.471 2.742 1.471s2.284-.49 3.198-1.472l12.564-13.983c5.94 4.416 13.021 8.587 20.788 11.53l-4.797 17.418c-.685 2.699.686 5.397 3.198 6.133h1.37c2.057 0 3.884-1.472 4.341-3.68L52.6 42.83c3.655.736 7.538 1.227 11.422 1.227 3.883 0 7.767-.49 11.422-1.227l4.797 17.173c.457 2.208 2.513 3.68 4.34 3.68.457 0 .914 0 1.143-.246 2.513-.736 3.883-3.434 3.198-6.133l-4.797-17.172c7.767-2.944 14.848-7.114 20.788-11.53l12.336 13.738c.913.981 2.056 1.472 3.198 1.472s2.284-.49 3.198-1.472c1.828-1.963 1.828-4.906.228-6.87l-11.65-13.001c9.366-7.36 14.849-14.474 14.849-14.474z" /></svg>
          </span>
        </el-form-item>
      </el-tooltip>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">Login</el-button>

      <div>
        <div class="quickLogin">
          <svg class="wx" aria-hidden="true"><use xlink:href="#iconwx" /></svg>
          <svg class="qq" aria-hidden="true"><use xlink:href="#iconqq" /></svg>
        </div>
        <div class="sweep">
          <div id="container" style="position:relative;display: flex;justify-content: center;flex-direction:column;align-items: center;">
            <div id="QRArea">
              <div style="display: flex;justify-content: center;align-items: center;width: 96px;height:96px;background: gray;position: absolute;left:6px;top:6px;">
                <div class="loading" />
              </div>
              <div id="QR" />
            </div>
            <div id="tips"><p style="margin:0;">登录方式</p></div>
          </div>
          <svg class="back" aria-hidden="true"><use xlink:href="#iconback" /></svg>
        </div>
      </div>
    </el-form>
    <svg ref="close" style="position:absolute;top:0;right:0;width:20px;height:20px;margin:10px" class="wx" aria-hidden="true"><use xlink:href="#iconclose-bold" /></svg>
  </div>
</template>
<script>

window.info = function() {
  return new Promise((resolve, reject) => {
    axios.get(process.env.VUE_APP_BASE_API + '/libs/db/src/login.php', { withCredentials: false, timeout: 10000 }).then(async res => {
      await localforage.setDriver(localforage.INDEXEDDB)
      const result = res.data
      if (result.code === 20000) {
        var user = await localforage.getItem('user')
        if (!user) {
          user = {}
        }
        user.sessionid = $.cookie('Admin-Token')// 将上次保存的SESSION_ID更新为当前使用的SESSION_ID
        user.avatar = result.data.avatar
        user.loginType = result.data.loginType
        user.nickname = result.data.nickname
        user.user_path = result.data.user_path
        user.debug_enable = result.data.debug_enable
        user.username = result.data.username
        !user.expandStatus && (user.expandStatus = {})
        await localforage.setItem('user', user)
        resolve(user)
      }
    })
  })
}

import { init, WX, QQ, Abort } from './js/index.js'
import axios from 'axios'
import { baseURL } from '@/utils/request2.js'
import { validUsername } from '@/utils/validate.js'
export default {
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('The password can not be less than 5 digits'))
      } else {
        callback()
      }
    }
    return {
      baseURL,
      emitMessage: {
        from: this.$options.__file,
        type: '',
        data: {}
      },
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      capsTooltip: false,
      passwordType: 'password',
      loading: false
    }
  },
  mounted() {
    const that = this
    var debug = false

    $(that.$refs['close']).click(function() {
      that.emitMessage.type = '隐藏登录窗口'
      that.$bus.$emit('Message', that.emitMessage)
    })
    window.info().then((user) => {
      that.emitMessage.data = user
      that.emitMessage.type = '用户登录后获取的数据'
      that.$bus.$emit('Message', that.emitMessage)
    })

    init((loginType, user) => {
      console.log(user)
      user.user_path = '/users/' + user.unionid
      axios.post(process.env.VUE_APP_BASE_API + '/libs/db/src/login.php', { loginType: loginType, user: user }, { withCredentials: false, timeout: 10000 }).then(res => {
        const result = res.data
        if (result.code === 20000) {
          window.info().then((user) => {
            that.emitMessage.data = user
            that.emitMessage.type = '用户登录后获取的数据2'
            that.$bus.$emit('Message', that.emitMessage)
            that.emitMessage.type = '用户登录后获取的数据'
            that.$bus.$emit('Message', that.emitMessage)
            $(that.$refs['close']).click()
            that.loading = false

            // that.$store.dispatch('user/changeRoles', ['admin']).then(() => {
            //   this.$emit('change')
            // })
          })
        } else if (result.code === 60204) {
          $('.btn-success').button('reset')
          console.error('red', 'Login failed. Invalid username or password')
        } else {
          document.write(result)
        }
      }).catch(function(error) {
        debug && console.error(error)
        console.error('red', 'Login failed.')
        // show_message("orange","Login timeout.")
      })

      // user.user_path = '/users/'+user.unionid+'/'
      // axios.post(apiUrl+'/login.php',{loginType:loginType,user:user},{withCredentials : true,timeout:10000}).then(res=>{
      //   let result = res.data;
      //   if(result.code===20000){
      //       $('.btn-success').text('登录成功');
      //       info();
      //   }else if(result.code===60204){
      //       $('.btn-success').button('reset');
      //       console.error("red","Login failed. Invalid username or password");
      //   }else{
      //       document.write(result)
      //   }
      // }).catch(function (error) {
      //   debug&&console.error(error)
      //   $('.btn-success').button('reset');
      //   console.error("red","Login failed.");
      //   // show_message("orange","Login timeout.")
      // });
    })
    $(function() {
      $('.card-body').css({ 'min-width': $('.card-body').width(), 'min-height': $('.card-body').height() + 20 })
      $('.quickLogin>svg').click(function() {
        $('.form-signin').hide()
        $('.sweep').css({ 'display': 'flex' })
        const loginType = $(this).attr('class')
        if (loginType === 'wx') {
          WX()
        } else if (loginType === 'qq') {
          QQ()
        } else {
          console.log('暂时只支持微信扣扣第三方登录！')
        }
      })

      $('.back').click(function() {
        $('.form-signin').show()
        $('.sweep').css({ 'display': 'none' })
        Abort()
      })
    })
  },
  destroyed() {
  },
  methods: {
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
      const that = this
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          $.ajax({
            url: baseURL + '/libs/db/src/login.php',
            type: 'post',
            dataType: 'json',
            contentType: 'application/json;charset=UTF-8',
            data: JSON.stringify(this.loginForm),
            success: function(res) {
              if (res.code === 20000) {
                window.info().then((user) => {
                  that.emitMessage.data = user
                  that.emitMessage.type = '用户登录后获取的数据'
                  that.$bus.$emit('Message', that.emitMessage)
                  that.emitMessage.type = '用户登录后获取的数据2'
                  that.$bus.$emit('Message', that.emitMessage)
                  $(that.$refs['close']).click()
                  that.loading = false
                })

              // window.top.location.replace(window.top.location.origin+window.top.location.pathname)
              } else {
                that.$message({
                  message: res.message,
                  type: 'error'
                })
                that.loading = false
              }
            }
          })
          // this.$store.dispatch('user/login', this.loginForm)
          //   .then(() => {
          //     this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
          //     this.loading = false
          //   })
          //   .catch(() => {
          //     this.loading = false
          //   })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    }
  }
}
</script>

<style>
  @import url(./css/index.css);
</style>
<style lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg:#283443;
  $light_gray:#fff;
  $cursor: #fff;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
      color: $cursor;
    }
  }

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;
        max-height: 0px;
        background-clip: content-box;
        &::first-line {
          color: #fff;
        }
        // &:-webkit-autofill {
        //   box-shadow: 0 0 0px 1000px $bg inset !important;
        //   -webkit-text-fill-color: $cursor !important;
        // }
      }
    }

    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }
</style>

<style lang="scss" scoped>
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;

  .login-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;
    background-image: url('../../../assets/images/bg-small.png');
    background-size:cover;

    .login-form {
      position: relative;
      width: 520px;
      max-width: 100%;
      padding: 160px 35px 0;
      margin: 0 auto;
      overflow: hidden;
    }

    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .title-container {
      position: relative;

      .title {
        font-size: 26px;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
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
