function requestFullScreen() {
    const element = document.documentElement
    let requestMethod = element.requestFullScreen
    || element.webkitRequestFullScreen //谷歌
    || element.mozRequestFullScreen  //火狐
    || element.msRequestFullScreen; //IE11
    if (requestMethod) {     
        requestMethod.call(element);   //执行这个请求的方法
    } else if (typeof window.ActiveXObject !== "undefined") {  //               window.ActiveXObject判断是否支持ActiveX控件    
        //这里其实就是模拟了按下键盘的F11，使浏览器全屏
        const wscript = new ActiveXObject("WScript.Shell"); //创建ActiveX  
        if (wscript !== null) {    //创建成功
            wscript.SendKeys("{F11}");//触发f1  
        }   
    }   
}

function cancelFullScreen(element) {
    if (document.cancelFullScreen) {
        document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

export default {
    requestFullScreen,
    cancelFullScreen
}