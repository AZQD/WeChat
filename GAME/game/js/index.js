var jsonData =
    {
        "challenger": {
            "name": "肉球猫",
            "img": "http://image.youkongwan.com/rqdld/cat.png",
            "invicode": "ABHLT"
        },
        "boss": {
            "name":"12阶苍狼",
            "img": "http://image.youkongwan.com/rqdld/wolf.png"
        },
        "download":"http://h.youkongwan.com/rqdld/index.html"
    };

var lang = getParamByUrl('lang');
if((lang == 'false') || (lang == 'zh')){
    alert('中文');
}else if(lang == 'zhf'){
    $('.container .partA .partAImg2').attr('src', 'image/partAImg2_f.png');
}

//复制功能
$('#copyBtn').unbind('click').bind('click', function (ev) {
    ev = ev || event;
    if(ev.preventDefault){
        ev.preventDefault();
    }else{
        return false;
    }
    var Url1=document.getElementById("copyCode");
    console.log(Url1);
    Url1.select(); // 选择对象
    document.execCommand("Copy"); // 执行浏览器复制命令
    alert('复制成功!');
    document.documentElement.style.webkitUserSelect = 'none';
    document.documentElement.style.webkitTouchCallout = 'none';
});

//前往下载
$('#downloadBtn').unbind('click').bind('click', function(){
    alert(1);
});

//马上协助
$('#helpBtn').unbind('click').bind('click', function(){
    alert(2);
});