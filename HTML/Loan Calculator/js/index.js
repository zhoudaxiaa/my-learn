/**
 * Created by Administrator on 2017/4/5.
 */
function calculate(){
    var amount = document.getElementById("amount");
    var apr = document.getElementById("apr");
    var years = document.getElementById("years");
    var zipcode = document.getElementById("zipcode");
    var total = document.getElementById("total");
    var totalinterest = document.getElementById("totalinterest");

    //假设所有的输入都是合法的，将从input元素中获取输入数据
    //将百分比格式转换为小数格式，并从年利率转换为月利率
    //将年度赔付转换为月度赔付
    var principal = parseFloat(amount.value);
    var interest = parseFloat(apr.value)/100/12;
    var payments = parseFloat(years.value)*12;

    //现在计算月度赔付的数据
    var x = Math.pow(1 + interest,payments);  //Math.pow()  进行幂次运算
    var monthly = (principal * x * interest) /(x-1);

    //如果结果没有超过javascript能表示的数字范围，且用户的输入也正确
    //这里所展示的结果就是合法的

    if(isFinite(monthly)){
        //将数据填至输出字段的位置，四舍五入到小数点后两位数字
        payments.innerHTML = monthly.toFixed(2);
        total.innerHTML = (monthly * payments).toFixed(2);
        totalinterest.innerHTML = ((monthly * payments) - principal).toFixed(2);

        //将用户的输入数据保存下来，这样在下次访问时也能取到数据
        save(amount.value,apr.value,years.value,zipcode.value);

        //找到并展示本地放贷人，但忽略网络错误
        try{
            //捕获这段代码抛出的所有异常
            getLenders(amount.value,apr.value,years.value,zipcode.value);
        }catch(e){/* 忽略这些异常 */}

        //最后，用图表展示贷款余额，利息和资产收益
        chart(principal,interest,monthly,payments);
    }else{
        //计算结果不是数字或者无穷大，意味着输入数据是非法或不完整的
        //清空之前的输出数据
        payments.innerHTML = "";    //清空元素的文本内容
        total.innerHTML = "";
        totalinterest.innerHTML = "";
        chart();    //不穿参数的话就是清除图表
    }
}

//将用户的输入保存至localStorage对象的属性中
//这些属性在再次访问时还会继续保存在原位置
//如果你在浏览器中按照file://URL的方式直接打开本地文件，
//则无法在某些浏览器中使用储存功能(比如 firefox)
//而通过HTTP打开文件是可行的

function save(amount,apr,years,zipcode){
    if(window.localStorage){  //只有在浏览器支持的时候才运行这里的代码
        localStorage.loan_amount = amount;
        localStorage.loan_apr = apr;
        localStorage.loan_years = years;
        localStorage.loan_zipcode = zipcode;
    }
}

//在文档首次加载时，将会尝试还原输入字段
window.onload = function(){
    //如果浏览器支持本地储存并且上次保存的值是存在的
    if(window.localStorage && localStorage.loan_amount){
        document.getElementById("amount").value = localStorage.loan_amount;
        document.getElementById("apr").value = localStorage.loan_apr;
        document.getElementById("years").value = localStorage.loan_years;
        document.getElementById("zipcode").value = localStorage.loan_zipcode;
    }
};

//将用户的输入发送至服务器端脚本（理论上）
//将返回一个本地放贷人的链接列表，在这个例子中并没用实现这种查找房贷人的服务
//但如果该服务存在，该函数会使用它

function getLenders(amount,apr,years,zipcode){
    //如果浏览器不支持XMLHttpRequest对象，则退出
    if(!window.XMLHttpRequest) return;

    //找到要显示房贷人列表的元素
    var ad = document.getElementById("lenders");
    if(!ad) return;     //如果返回为空，则退出

    //将用户的输入数据进行URL编码，并作为查询参数附加在URL里
    var url = "getLenders.php" +    //处理数据的URL地址
    "?amt=" + encodeURIComponent(amout) +   //使用查询串中的数据
        "&apr=" + encodeURIComponent(apr) +
            "&yrs=" + encodeURIComponent(years) +
            "&zip=" +encodeURIComponent(zipcode);

    //通过XMLHttpRequest对象来提取返回数据
    var req = new XMLHttpRequest();     //发起一个新的请求
    req.open("GET",url);      //通过URL发起一个HTTP GET请求
    req.send(null);       //不带任何正文发送这个请求

    //在返回数据之前，注册了一个事件处理函数，
    // 这个处理函数将会在服务器的响应返回至客服端的时候调用
    //这种异步变成模型在客户端javascript中是非常常见的
    req.onreadystatechange = function(){
        if(req.readyState == 4 && req.status == 200){
            //如果代码运行到这里，说明我们得到了一个合法且完成的HTTP响应
            var response = req.responseText;     //HTTP响应是以字符串的形式呈现的
            var lenders = JSON.parse(response);    //将其解析为json数组
            //将数组中的放贷人对象转换为HTML字符串形式
            var list = "";
            for(var i = 0;i < lenders.length; i++){
                list += "<li><a href='" + lenders[i].url +" '>"+
                    lenders[i].name +"</a>"
            }

            //将数据在HTML元素中呈现出来
            ad.innerHTML = "<ul>" + list + "</ul>";
        }
    }
}

//在HTML<canvas>元素中用图表展示月度贷款余额、利息和资产收益
//如果不传入参数的话，则清空之前的图表数据
function chart(principal,interest,monthly,payments){
    var graph = document.getElementById("graph");   //得到<canvas>标签
    graph.width = graph.width;  //用一种巧妙的手法清除并重置画布

    //如果不传入参数，或者浏览器不支持画布,则直接返回
    if(arguments.length == 0 || !graph.getContext) return;

    //获得画布元素的"context"对象，这个对象定义了一组绘画API
    var g = graph.getContext("2d");        //所有的绘画操作都将基于这个对象
    var width = graph.width,
    height = graph.height;    //获取画布大小

    //这里的函数作用是将付款数字和美元数据转换为像素
    function paymentToX(n){
        return n * width / payments;
    }
    function amountToY(a){
        return height - (a * height / (monthly * payments * 1.05));
    }

    //付款数据是一条从（0,0）到（payments，monthly*payments）的直线
    g.moveTo(paymentToX(0),amountToY(0));     //从左下方开始
    g.lineTo(paymentToX(payments),amountToY(monthly * payments));   //绘至右上方
    g.lineTo(paymentToX(payments),amountToY(0));   //再至右下方
    g.closePath();           //将结尾连接至开头
    g.fillStyle = "#f88";          //亮红色
    g.fill();            //填充矩形
    g.font = "bold 12px sans-serif";     //定义一种字体
    g.fillText("Total Interest Payments",20,20);          //将文字绘制到画布上

    //很多资产数据并不是线性的，很难将其反应至图标中
    var equity = 0;
    g.beginPath();      //开始绘制新图形
    g.moveTo(paymentToX(0),amountToY(0));      //从左下方开始
    for(var p = 1;p <= payments;p++){
        //计算出每一笔赔付的利息
        var thisMonthsInterest = (principal - equity) * interest;
        equity += (monthly - thisMonthsInterest);    //得到资产额
        g.lineTo(paymentToX(p),amountToY(equity));    //将数据绘制画布
    }
    g.lineTo(paymentToX(payments),amountToY(0));    //将数据线绘制至x轴
    g.closePath();         //将线条结尾连接至线条开头
    g.fillStyle = "green";
    g.fill();
    g.fillText("Total Equity",20,35);

    //再次循环，余额数据显示为黑色粗线条
    var bal = principal;
    g.beginPath();
    g.moveTo(paymentToX(0),amountToY(bal));
    for(var p = 1;p <= payments;p++){
        var thisMonthsInterest = bal * interest;
        bal -= (monthly - this.MonthsInterest);   //得到资产额
        g.lineTo(paymentToX(p),amountToY(bal));    //将直线连接至某点
    }
    g.lineWidth = 3;
    g.stroke();         //绘制余额的曲线
    g.fillStyle = "black";
    g.fillText("Loan Balance",20,50);

    //讲过年度数据在X轴做标记
    g.textAlign = "center";     //文字居中对齐
    var y = amountToY(0);    //y坐标设为0
    for(var year = 1;year * 12 <= payments;year++){      //遍历每年
        var x = paymentToX(year * 12);
        g.fillRect(x - 0.5,y -3,1,3);
        if(year == 1) g.fillText("Year",x,y - 5);
        if(year % 5 == 0 && year * 12 !== payments)
            g.fillText(String(year),x,y - 5);
    }

    //将赔付数额标记在右边界
    g.textAlign = "right";
    g.textBaseline = "middle";      //文字垂直居中
    var ticks = [monthly * payments,principal];
    var rightEdge = paymentToX(payments);
    for(var i = 0;i < ticks.length; i++){
        var y = amountToY(ticks[i]);
        g.fillRect(rightEdge - 3,y - 0.5, 3, 1);
        g.fillText(String(ticks[i].toFixed(0)),rightEdge - 5, y);
    }
}

