/* eslint-disable no-unused-vars */
let wxTimer = 0
let wxStatusUrl = ''

let qqTimer = 0
let qqStatusUrl = ''

let wxXhr1 = ''
let wxXhr2 = ''
let wxXhr3 = ''

let qqXhr1 = ''
let qqXhr2 = ''
let qqXhr3 = ''

const InvalidNumbers = 1// 二维码失效后，自动刷新次数
let TMP = 0
var debug = false

function wxTask() {
  debug && console.log('wx')
  window.clearInterval(wxTimer)
  if (wxStatusUrl === '') {
    $('#QR').empty()
    $('#tips>p').html('微信登录')
    $('#QRArea').css({ border: '1px solid orange' })
    wxXhr1 = $.ajax({
      url: 'https://union.tanglei.top/wx',
      type: 'get',
      cache: false,
      success: function(data) {
        const serverData = JSON.parse(data)
        $('#QRArea').css({ border: '1px solid green' })
        $('#QR').empty()
        $('#QR').qrcode({ render: 'canvas',
          correctLevel: 0, // 纠错等级
          width: 96,
          height: 96,
          text: serverData.target,
          background: '#ffffff',
          foreground: '#000000' })
        wxStatusUrl = serverData.status
        wxTimer = window.setInterval(wxTask, 1000)
      },
      error: function(e) {
        $('#QRArea').css({ border: '1px solid red' })
        debug && console.error(e)
        if (e.statusText !== 'abort') {
          wxTimer = window.setInterval(wxTask, 1000)
        }
      }
    })
  } else {
    $('#QRArea').css({ border: '1px solid orange' })
    wxXhr2 = $.ajax({
      url: wxStatusUrl,
      type: 'get',
      success: function(data) {
        if (data.status === '正在验证二维码') {
          $('#QRArea').css({ border: '1px solid blue' }); wxTimer = window.setInterval(wxTask, 1000)
          $('#tips>p').html('扫描成功')
        } else if (data.status === '二维码未失效') {
          $('#QRArea').css({ border: '1px solid green' }); wxTimer = window.setInterval(wxTask, 1000)
        } else if (data.status === '二维码已失效') {
          debug && console.log('二维码已失效')
          $('#QRArea').css({ border: '1px solid red' })
          if (TMP > 0) {
            wxStatusUrl = ''
            TMP = TMP - 1; $('#QRArea').css({ border: '1px solid red' }); wxTimer = window.setInterval(wxTask, 1000)
          } else {
            $('#QRArea').append('<div id="failure" onclick="wx()">请点击刷新</div>')
          }
        } else if (data.status === '已取消授权') {
          $('#tips>p').html('授权失败')
          wxStatusUrl = ''; $('#QRArea').css({ border: '1px solid orange' }); wxTimer = window.setInterval(wxTask, 1000)
        } else if (data.status === '请求二维码扫码结果超时') {
          debug && console.log(data.status)
          wxTimer = window.setInterval(wxTask, 1000)
          $('#QRArea').css({ border: '1px solid red' })
        } else if (data.status === '授权超时') {
          debug && console.log(data.status)
          wxStatusUrl = ''
          wxTimer = window.setInterval(wxTask, 1000)
          $('#QRArea').css({ border: '1px solid red' })
        } else {
          $('#QRArea').css({ border: '1px solid green' })
          $('#tips>p').html('授权成功')
          wxAuthorized(data)
        }
      },
      error: function(e) {
        $('#QRArea').css({ border: '1px solid green' })
        if (e.statusText !== 'abort') {
          debug && console.error(e)
          wxTimer = window.setInterval(wxTask, 1000)
        } else {
          debug && console.error(e.statusText)
        }
      }
    })
  }
}
function wx() {
  // 如果InvalidNumbers=0，大约5*60秒后需要调用此方法重新生成二维码
  $('#failure').remove()
  wxStatusUrl = ''
  reset()
  wxTask()
}
function qqTask() {
  debug && console.log('qq')
  window.clearInterval(qqTimer)
  if (qqStatusUrl === '') {
    $('#QR').empty()
    $('#tips>p').html('扣扣登录')
    $('#QRArea').css({ border: '1px solid orange' })
    qqXhr1 = $.ajax({
      url: 'https://union.tanglei.top/qq',
      type: 'get',
      cache: false,
      success: function(data) {
        const serverData = JSON.parse(data)
        $('#QRArea').css({ border: '1px solid green' })
        $('#QR').empty()
        $('#QR').qrcode({ render: 'canvas',
          correctLevel: 0, // 纠错等级
          width: 96,
          height: 96,
          text: serverData.target,
          background: '#ffffff',
          foreground: '#000000' })
        qqStatusUrl = serverData.status
        qqTimer = window.setInterval(qqTask, 1000)
      },
      error: function(e) {
        $('#QRArea').css({ border: '1px solid red' })
        debug && console.error(e)
        if (e.statusText !== 'abort') {
          qqTimer = window.setInterval(qqTask, 1000)
        }
      }
    })
  } else {
    $('#QRArea').css({ border: '1px solid orange' })
    qqXhr2 = $.ajax({
      url: qqStatusUrl,
      type: 'get',
      success: function(data) {
        if (data.status === '正在验证二维码') {
          $('#QRArea').css({ border: '1px solid blue' }); qqTimer = window.setInterval(qqTask, 1000)
          $('#tips>p').html('扫描成功')
        } else if (data.status === '二维码未失效') {
          $('#QRArea').css({ border: '1px solid red' }); qqTimer = window.setInterval(qqTask, 1000)
        } else if (data.status === '二维码已失效') {
          debug && console.log('二维码已失效')
          $('#QRArea').css({ border: '1px solid red' })
          if (TMP > 0) {
            qqStatusUrl = ''
            TMP = TMP - 1; $('#QRArea').css({ border: '1px solid red' }); qqTimer = window.setInterval(qqTask, 1000)
          } else {
            $('#QRArea').append('<div id="failure" onclick="qq()">请点击刷新</div>')
          }
        } else if (data.status === '已取消授权') {
          $('#QRArea').css({ border: '1px solid red' })
          $('#tips>p').html('授权失败')
          qqStatusUrl = ''; $('#QRArea').css({ border: '1px solid orange' }); qqTimer = window.setInterval(qqTask, 1000)
        } else {
          $('#QRArea').css({ border: '1px solid green' })
          $('#tips>p').html('授权成功')
          qqAuthorized(data)
        }
      },
      error: function(e) {
        $('#QRArea').css({ border: '1px solid red' })
        debug && console.error(e)
        if (e.statusText !== 'abort') {
          qqTimer = window.setInterval(qqTask, 1000)
        }
      }
    })
  }
}
function qq() {
  // 如果InvalidNumbers=0，2*60秒后需要调用此方法重新生成二维码
  $('#failure').remove()
  qqStatusUrl = ''
  reset()
  qqTask()
}
function wxAuthorized(obj) {
  wxXhr3 = $.ajax({
    url: obj.info,
    type: 'get',
    success: function(data) {
      $('#QR').empty()
      // $('body').html(data);
      const person = JSON.parse(data)
      window.clearInterval(wxTimer)
      const user = {}
      user['nickname'] = person.nickname
      user['sex'] = person.sex === undefined ? undefined : person.sex === 1 ? '男' : '女'
      user['figureurl'] = person.headimgurl
      user['unionid'] = person.unionid
      user['openid'] = person.openid
      authorized('微信登录', user)
    },
    error: function(e) {
      debug && console.error(e)
      if (e.statusText !== 'abort') {
        wxTimer = window.setInterval(wxTask, 1000)
      }
    }, complete: function() {
      // $('#container').remove();
      wxStatusUrl = ''
    }
  })
}
function qqAuthorized(obj) {
  qqXhr3 = $.ajax({
    url: obj.info,
    type: 'get',
    success: function(data) {
      $('#QR').empty()
      // $('body').html(data);
      const person = JSON.parse(data)
      window.clearInterval(qqTimer)
      const user = {}
      user['nickname'] = person.nickname
      user['sex'] = person.gender
      user['figureurl'] = person.figureurl_qq_2
      user['unionid'] = person.unionid
      user['openid'] = person.openid
      authorized('扣扣登录', user)
    },
    error: function(e) {
      debug && console.error(e)
      if (e.statusText !== 'abort') {
        qqTimer = window.setInterval(qqTask, 1000)
      }
    },
    complete: function() {
      // $('#container').remove();
      qqStatusUrl = ''
    }
  })
}

let callback
function authorized(loginType, user) {
  Abort()
  callback && callback(loginType, user)
  // let user = {"nickname":"唐雷","sex":"男","figureurl":"http://thirdwx.qlogo.cn/mmopen/vi_32/oxHxHIksqSyhVuPHibImxAjStotv218cZRD287glf6W8Og5sicArvOsnzcV0RwUiatc3vR65oKT3C1TM8gSJakIlw/132","unionid":"o4dYU1gcUceNS6WzFeydGG3jgjto","openid":"osFlhwnJr0ypXmEzu7rWIJ2PNzqg"}
  // let user = {"nickname":"唐雷","sex":"男","figureurl":"http://thirdqq.qlogo.cn/g?b=oidb&k=4HiaQCNicmXCGxzOv3361P1w&s=100&t=1573549417","unionid":"UID_9736DD1DEE7C081ED03F2A20282E33CA","openid":"A1265BF244757FD9EC99C2D5FE498ABF"}
  // $("body").html(JSON.stringify(user));
  // window.location.href = "http://tanglei.top:7777"
  // window.location.href = "http://tanglei.top/nps/nps04?params="+$.base64.encode(JSON.stringify(user));
  // window.location.replace("?params="+$.base64.encode(JSON.stringify(user)));
}

export function init(back) {
  callback = back
  reset()
  // wxTask();//默认微信登录
  $('#tips>p').click(function() {
    if ($(this).html() === '微信登录') {
      QQ()
    } else if ($(this).html() === '扣扣登录') {
      WX()
    }
  })
}
export function Abort() {
  wxXhr1 !== '' && wxXhr1.abort(); wxXhr1 = ''
  wxXhr2 !== '' && wxXhr2.abort(); wxXhr2 = ''
  wxXhr3 !== '' && wxXhr3.abort(); wxXhr3 = ''
  window.clearInterval(wxTimer)
  wxStatusUrl = ''

  qqXhr1 !== '' && qqXhr1.abort(); qqXhr1 = ''
  qqXhr2 !== '' && qqXhr2.abort(); qqXhr2 = ''
  qqXhr3 !== '' && qqXhr3.abort(); qqXhr3 = ''
  window.clearInterval(qqTimer)
  qqStatusUrl = ''
}
export function WX() {
  reset()
  $('#failure').remove()
  qqXhr1 !== '' && qqXhr1.abort(); qqXhr1 = ''
  qqXhr2 !== '' && qqXhr2.abort(); qqXhr2 = ''
  qqXhr3 !== '' && qqXhr3.abort(); qqXhr3 = ''
  debug && console.log('2wx')
  window.clearInterval(qqTimer)
  wxStatusUrl = ''; wxTask()
}
export function QQ() {
  reset()
  $('#failure').remove()
  wxXhr1 !== '' && wxXhr1.abort(); wxXhr1 = ''
  wxXhr2 !== '' && wxXhr2.abort(); wxXhr2 = ''
  wxXhr3 !== '' && wxXhr3.abort(); wxXhr3 = ''
  debug && console.log('2qq')
  window.clearInterval(wxTimer)
  qqStatusUrl = ''; qqTask()
}

export function reset() {
  TMP = InvalidNumbers
}

// $(function(){
//    let user = {"nickname":"唐雷","sex":"男","figureurl":"http://thirdwx.qlogo.cn/mmopen/vi_32/oxHxHIksqSyhVuPHibImxAjStotv218cZRD287glf6W8Og5sicArvOsnzcV0RwUiatc3vR65oKT3C1TM8gSJakIlw/132","unionid":"o4dYU1gcUceNS6WzFeydGG3jgjto","openid":"osFlhwnJr0ypXmEzu7rWIJ2PNzqg"};
//    let loginType = "微信登录";
//    axios.post(apiUrl+'/login.php',{loginType:loginType,user:user},{withCredentials : true,timeout:10000}).then(res=>{
//        let result = res.data;
//        if(result.code===20000){
//            $('.btn-success').text('登录成功');
//            info();
//        }else if(result.code===60204){
//            $('.btn-success').button('reset');
//            show_message("red","<?php //echo lng('Login failed. Invalid username or password')?>//");
//        }else{
//            document.write(result)
//        }
//    }).catch(function (error) {
//        debug&&console.error(error)
//        $('.btn-success').button('reset');
//        show_message("red","Login failed.")
//        // show_message("orange","Login timeout.")
//    });
// })
// $(function(){
//    let user = {"nickname":"唐雷","sex":"男","figureurl":"http://thirdqq.qlogo.cn/g?b=oidb&k=4HiaQCNicmXCGxzOv3361P1w&s=100&t=1573549417","unionid":"UID_9736DD1DEE7C081ED03F2A20282E33CA","openid":"A1265BF244757FD9EC99C2D5FE498ABF"};
//    let loginType = "扣扣登录";
//    axios.post(apiUrl+'/login.php',{loginType:loginType,user:user},{withCredentials : true,timeout:10000}).then(res=>{
//        let result = res.data;
//        if(result.code===20000){
//            $('.btn-success').text('登录成功');
//            info();
//        }else if(result.code===60204){
//            $('.btn-success').button('reset');
//            show_message("red","<?php //echo lng('Login failed. Invalid username or password')?>//");
//        }else{
//            document.write(result)
//        }
//    }).catch(function (error) {
//        debug&&console.error(error)
//        $('.btn-success').button('reset');
//        show_message("red","Login failed.")
//        // show_message("orange","Login timeout.")
//    });
// })
