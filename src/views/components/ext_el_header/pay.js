const Order = {}
Order.total_amount = 1
Order.subject = '测试'
Order.out_trade_no = Date.now()
let back2
function setPay(back) {
  init()
  back && back()
}
function init() {
  $('#pay-close').css('content', 'url(/libs/pay/image/close.png)')

  $('#tipsPay').click(function() {
    Order.out_trade_no = Date.now()
    $('#out_trade_no').html(Order.out_trade_no)
    if ($(this).html() === '支付宝支付') {
      Tips_Click('微信支付')
    } else if ($(this).html() === '微信支付') {
      Tips_Click('支付宝支付')
    }
  })
  $('.close').click(function() {
    if (wxPayClient1 != null) wxPayClient1.abort()
    if (wxPayClient2 != null) wxPayClient2.abort()
    if (alPayClient1 != null) alPayClient1.abort()
    if (alPayClient2 != null) alPayClient2.abort()
    wxPayStatusUrl = ''
    alPayStatusUrl = ''
    clearTimeout(alPayDispatcherTimer)
    clearTimeout(wxPayDispatcherTimer)
    /* 关闭支付界面*/
    $(this).parent().parent().hide()
  })
  $('#out_trade_no').html(Order.out_trade_no)
  $('#subject').html(Order.subject)
  $('#total_amount').html((Number(Order.total_amount) / 100.0).toFixed(2) + '元')
}

let wxPayClient1 = null
let wxPayClient2 = null
let alPayClient1 = null
let alPayClient2 = null

const time = 3000

let wxPayStatusUrl = ''
let alPayStatusUrl = ''
const InvalidNumbers = 1
let TMP = 0

let wxPayDispatcherTimer = 0
let alPayDispatcherTimer = 0

function al() {
  $('#QRAreaPay').css({ border: '1px solid orange' })
  window.clearTimeout(alPayDispatcherTimer)
  console.log('al')
  if (alPayStatusUrl === '') {
    $('#QRpay').empty()
    $('#tipsPay').html('支付宝支付')
    alPayClient1 = $.ajax({
      url: '//tanglei.top/ali/dangmianfu_demo_php/f2fpay/qrpay.php',
      type: 'post',
      cache: false,
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify(Order),
      success: function(data) {
        /* 获取二维码*/
        if (data.data !== '支付宝创建订单二维码失败!!!') {
          alPayStatusUrl = data.status
          $('QRpay').empty()
          $('#QRpay').qrcode({
            render: 'canvas',
            width: 100,
            height: 100,
            text: data.data,
            background: '#ffffff',
            foreground: '#000000'
          })
          alPayDispatcherTimer = setTimeout(al, time)
          $('#QRAreaPay').css({ border: '1px solid red' })
        } else {
          console.log('订单已经被使用')
          $('#QRAreaPay').css({ border: '1px solid red' })
          $('#QRpay').empty()
        }
      },
      error: function(e) {
        console.error(e)
      }, complete: function() {
        alPayClient1.abort()
        alPayClient1 = null
      }
    })
  } else {
    alPayClient2 = $.ajax({
      url: alPayStatusUrl,
      type: 'post',
      cache: false,
      contentType: 'application/json',
      dataType: 'json',
      data: '{"out_trade_no":' + Order.out_trade_no + '}',
      success: function(data) {
        /* 获取二维码状态*/
        if (data.code === '40004') { // 交易不存在
          console.log('交易不存在')
          $('.log').html(data.sub_msg)
          $('#QRAreaPay').css({ border: '1px solid red' })
          alPayDispatcherTimer = setTimeout(al, time)
        } else if (data.code === '10000') {
          if (data.trade_status === 'TRADE_SUCCESS') {
            $('#QRAreaPay').css({ border: '1px solid green' })
            $('.maskPay').css({ 'background': 'url(/libs/pay/image/payed.png) no-repeat', 'background-size': 'contain' })
            console.log('支付成功')
            $('#tipsPay').unbind('click')
            back2 && back2()
          } else if (data.trade_status === 'WAIT_BUYER_PAY') {
            $('#QRAreaPay').css({ border: '1px solid red' })
            $('.maskPay').css({ 'background': 'url(/libs/pay/image/paying.png) no-repeat', 'background-size': 'contain' })
            console.log('待支付')
            alPayDispatcherTimer = setTimeout(al, time)
          } else if (data.trade_status === 'TRADE_CLOSED') {
            $('.maskPay').css({ 'background': 'url(/libs/pay/image/pay_closed.png) no-repeat', 'background-size': 'contain' })
            $('#QRAreaPay').css({ border: '1px solid black' })
            console.log('交易关闭')
            alPayStatusUrl = ''
            if (TMP > 0) {
              TMP = TMP - 1
              Order.out_trade_no = $('#out_trade_no').val()
              alPayDispatcherTimer = setTimeout(al, time)
            } else {
              // failure.Visibility = Visibility.Visible;
            }
          } else {
            console.log('未知状态', data.trade_status)
          }
        }
      },
      error: function(e) {
        // 1.无网或服务器主动关闭会调用
        // 2.服务器一直无数据返回
        // 3.主动关闭HTTP请求。
        // 其他
        console.error(e)

        // 无网2194ms后System.Net.Http.HttpRequestException
        // 有网无返回10101ms后System.Threading.Tasks.TaskCanceledException（暂不考虑）
        // 有网服务器主动关闭8390ms后System.Net.Http.HttpRequestException
        // 客户端主动Dispose()7007ms后System.Threading.Tasks.TaskCanceledException
        // printTime();
        // if (e.GetType().ToString() == "System.Net.Http.HttpRequestException")
        // {
        //     QR.Source = null;
        //     alPayStatusUrl = "";
        //     alPayDispatcherTimer.Start();//无网或服务器主动关闭会调用
        // }
        // else if (e.GetType().ToString() == "System.Threading.Tasks.TaskCanceledException")
        // {
        //     if (alPayClient2.closedForever == false)
        //     {
        //         Console.WriteLine("服务器一直无数据返回");
        //         failure.Visibility = Visibility.Visible;
        //     }
        //     else
        //     {
        //         Console.WriteLine("主动关闭HTTP请求。");
        //     }
        // }
        // else
        // {
        //     Console.WriteLine(e.GetType());
        // }
      }, complete: function() {
        alPayClient2.abort()
        alPayClient2 = null
      }
    })
  }
}
function wx() {
  $('#QRAreaPay').css({ border: '1px solid orange' })
  clearTimeout(wxPayDispatcherTimer)
  console.log('wx')
  if (wxPayStatusUrl === '') {
    $('#QRpay').empty()
    $('#tipsPay').html('微信支付')
    wxPayClient1 = $.ajax({
      url: '//tanglei.top/WxpayAPI_php/php_sdk_v3.0.10/example/native2.php',
      type: 'post',
      cache: false,
      // contentType:'application/json',
      dataType: 'json',
      data: JSON.stringify(Order),
      success: function(data) {
        /* 获取二维码*/
        if (data.data != null) {
          wxPayStatusUrl = data.status
          $('#QRpay').empty()
          $('#QRpay').qrcode({
            render: 'canvas',
            width: 100,
            height: 100,
            text: data.data,
            background: '#ffffff',
            foreground: '#000000'
          })
          wxPayDispatcherTimer = setTimeout(wx, time)
          $('#QRAreaPay').css({ border: '1px solid red' })
        } else {
          console.log('订单已经被使用')
          $('#QRAreaPay').css({ border: '1px solid red' })
          $('#QRpay').empty()
        }
      },
      error: function(e) {
        throw e
        // document.write(e.responseText)
      }, complete: function() {
        wxPayClient1.abort()
        wxPayClient1 = null
      }
    })
  } else {
    wxPayClient2 = $.ajax({
      url: wxPayStatusUrl,
      type: 'post',
      // contentType:'application/json',
      dataType: 'json',
      cache: false,
      data: '{"out_trade_no":' + Order.out_trade_no + '}',
      success: function(data) {
        /* 获取二维码状态*/
        if (data.result_code === 'FAIL') {
          console.log('订单不存在')
          $('.log').html(data.result.sub_msg)
          $('#QRAreaPay').css({ border: '1px solid red' })
          wxPayDispatcherTimer = setTimeout(wx, time)
        } else if (data.result_code === 'SUCCESS') {
          if (data.trade_state === 'SUCCESS') {
            $('#QRAreaPay').css({ border: '1px solid green' })
            $('.maskPay').css({ 'background': 'url(/libs/pay/image/payed.png) no-repeat', 'background-size': 'contain' })
            console.log('支付成功')
            $('#tipsPay').unbind('click')
            back2 && back2()
          } else if (data.trade_state === 'NOTPAY') {
            console.log('未支付')
            $('#QRAreaPay').css({ border: '1px solid red' })
            wxPayDispatcherTimer = setTimeout(wx, time)
          }
        } else {
          console.log('未知状态', data.result_code)
        }
      },
      error: function(e) {
        // 1.无网或服务器主动关闭会调用
        // 2.服务器一直无数据返回
        // 3.主动关闭HTTP请求。
        // 其他
        console.error(e)

        // 无网2194ms后System.Net.Http.HttpRequestException
        // 有网无返回10101ms后System.Threading.Tasks.TaskCanceledException（暂不考虑）
        // 有网服务器主动关闭8390ms后System.Net.Http.HttpRequestException
        // 客户端主动Dispose()7007ms后System.Threading.Tasks.TaskCanceledException
        // printTime();
        // if (e.GetType().ToString() == "System.Net.Http.HttpRequestException")
        // {
        //     QR.Source = null;
        //     wxPayStatusUrl = "";
        //     wxPayDispatcherTimer.Start();//无网或服务器主动关闭会调用
        // }
        // else if (e.GetType().ToString() == "System.Threading.Tasks.TaskCanceledException")
        // {
        //     if (wxPayClient2.closedForever == false)
        //     {
        //         Console.WriteLine("服务器一直无数据返回");
        //         failure.Visibility = Visibility.Visible;
        //     }
        //     else
        //     {
        //         Console.WriteLine("主动关闭HTTP请求。");
        //     }
        // }
        // else
        // {
        //     Console.WriteLine(e.GetType());
        // }
      }, complete: function() {
        wxPayClient2.abort()
        wxPayClient2 = null
      }
    })
  }
}

function Tips_Click(arg, order, back) {
  if (back !== undefined) {
    back2 = back
  }
  if (order !== undefined) {
    Order.total_amount = order.total_amount
    Order.subject = order.subject
    Order.out_trade_no = order.out_trade_no
    $('#out_trade_no').html(Order.out_trade_no)
    $('#subject').html(Order.subject)
    $('#total_amount').html((Number(Order.total_amount) / 100.0).toFixed(2) + '元')
  }
  $('.dialog-panel-pay').show()
  $('.maskPay').css('background', '')

  if (wxPayClient1 != null)wxPayClient1.abort()
  if (wxPayClient2 != null)wxPayClient2.abort()
  if (alPayClient1 != null) alPayClient1.abort()
  if (alPayClient2 != null) alPayClient2.abort()
  wxPayStatusUrl = ''
  alPayStatusUrl = ''
  window.clearTimeout(wxPayDispatcherTimer)
  window.clearTimeout(alPayDispatcherTimer)

  TMP = InvalidNumbers

  if (arg === '微信支付') {
    wx()
  } else if (arg === '支付宝支付') {
    al()
  } else { /* 其他支付方式*/ }
}
export { setPay, Tips_Click }
