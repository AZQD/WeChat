var touchBtn1 = document.getElementById("touchBtn1");
var touchBtn2 = document.getElementById("touchBtn2");
var touchBtn3 = document.getElementById("touchBtn3");
touchBtn1.addEventListener("touchstart",function(ev){
    ev = ev || event;
    if(ev.preventDefault){
        ev.preventDefault();
    }else{
        return false;
    }
});
touchBtn1.addEventListener("touchend",function(ev){
    ev = ev || event;
    if(ev.preventDefault){
        ev.preventDefault();
    }else{
        return false;
    }
    var Url1=document.getElementById("copyCode1");
    Url1.select(); // 选择对象
    document.execCommand("Copy"); // 执行浏览器复制命令
    alert('复制成功，小助在等你哦');
    document.documentElement.style.webkitUserSelect = 'none';
    document.documentElement.style.webkitTouchCallout = 'none';
});

touchBtn2.addEventListener("touchstart",function(ev){
    ev = ev || event;
    if(ev.preventDefault){
        ev.preventDefault();
    }else{
        return false;
    }
});
touchBtn2.addEventListener("touchend",function(ev){
    ev = ev || event;
    if(ev.preventDefault){
        ev.preventDefault();
    }else{
        return false;
    }
    var Url1=document.getElementById("copyCode2");
    Url1.select(); // 选择对象
    document.execCommand("Copy"); // 执行浏览器复制命令
    alert('复制成功，小助在等你哦');
    document.documentElement.style.webkitUserSelect = 'none';
    document.documentElement.style.webkitTouchCallout = 'none';
});

touchBtn3.addEventListener("touchstart",function(ev){
    ev = ev || event;
    if(ev.preventDefault){
        ev.preventDefault();
    }else{
        return false;
    }
});
touchBtn3.addEventListener("touchend",function(ev){
    ev = ev || event;
    if(ev.preventDefault){
        ev.preventDefault();
    }else{
        return false;
    }
    var Url1=document.getElementById("copyCode3");
    Url1.select(); // 选择对象
    document.execCommand("Copy"); // 执行浏览器复制命令
    alert('复制成功，小助在等你哦');
    document.documentElement.style.webkitUserSelect = 'none';
    document.documentElement.style.webkitTouchCallout = 'none';
});