$(function(){
    //加载球
    if($("canvas#canvas-loading-ball")){
        canvasLoadingBall();
        function canvasLoadingBall(){
            // console.log($("#canvas-loading-ball"));
            $("canvas#canvas-loading-ball").css({"background":"rgba(0,0,0,0.5)"});
            var w=$("canvas#canvas-loading-ball").width();
            var h=$("canvas#canvas-loading-ball").height();
            //使用get把jq对象转换为js对象
            var context=$("canvas#canvas-loading-ball").get(0).getContext('2d');
            var Rot=0;
            var R_init=0;
            var timer=null;
            var targent_R=Math.round(w/10);
            setInterval( function(){
                R_init=R_init+1;
                if(R_init<targent_R+1)
                {
                    Drawcilrcle(context,R_init);
                    if(R_init===targent_R){
                        setTimeout(function(){
                            clearInterval(timer);
                            timer=	setInterval( function(){
                                Rot=Rot+1;
                                if(Rot<180)
                                {
                                    Drawcilrcle(context,targent_R);
                                    Drawmove(context,targent_R,Rot);
                                    Drawmove_bottom(context,targent_R,Rot);
                                    Drawtext(context,Rot)
                                }
                                else if(Rot===180){
                                    Drawcilrcle(context,targent_R);
                                    Drawfinsh(context,targent_R,360);
                                    Drawtext(context,Rot);
                                }
                            },100);
                        },50);
                    }
                }
            },5);

            function Drawcilrcle(cxt,r){
                cxt.clearRect(0,0,w,h);
                cxt.beginPath();
                cxt.arc(w/2,h/2, r, 0 ,2*Math.PI);
                cxt.fillStyle="rgba(255,255,255,0.2)";
                cxt.fill();
                cxt.beginPath();
                cxt.arc(w/2,h/2, r+20,0 ,2*Math.PI);
                cxt.strokeStyle="rgba(0,0,0,0.2)";
                cxt.lineWidth=1;
                cxt.stroke();
                cxt.closePath();
            }

            function Drawmove_bottom(cxt,r,rot){
                cxt.save();
                cxt.beginPath();
                cxt.translate(w/2,h/2);//将画布坐标系原点移至中心
                cxt.rotate(rot/180*Math.PI);
                cxt.translate(-(w/2),-(h/2));//修正画布坐标系
                cxt.arc(w/2,h/2, r+20, 0,rot/180*Math.PI);
                cxt.strokeStyle="rgba(255,255,255,0.3)";
                cxt.lineWidth=6;
                cxt.stroke();
                cxt.closePath();
                cxt.restore();
            }

            function Drawmove(cxt,r,rot){
                cxt.save();
                cxt.beginPath();
                cxt.translate(w/2,h/2);//将画布坐标系原点移至中心
                cxt.rotate(rot/180*Math.PI);
                cxt.translate(-(w/2),-(h/2));//修正画布坐标系
                cxt.arc(w/2,h/2, r+20,180/180*Math.PI,(rot+180)/180*Math.PI);
                cxt.strokeStyle="rgba(255,255,255,0.3)";
                cxt.lineWidth=6;
                cxt.stroke();
                cxt.restore();
                cxt.closePath();

            }

            function Drawfinsh(cxt,r,rot){
                cxt.save();
                cxt.beginPath();
                cxt.arc(w/2,h/2, r+20,0,2*Math.PI);
                cxt.strokeStyle="rgba(255,255,255,0.3)";
                cxt.lineWidth=6;
                cxt.stroke();
                cxt.restore();
                cxt.closePath();

            }

            function Drawtext(cxt,rot){
                cxt.save();
                cxt.beginPath();
                cxt.textAlign="center";
                cxt.font=" 20pt  Aira";
                cxt.fillStyle="rgba(255,255,255,1)";
                cxt.fillText(Math.round(rot/180*100)+"%",w/2,h/2+10);
                cxt.restore();
                cxt.closePath();

            }
        }
    }
    //加载方块
    if($("canvas#canvas-loading-square")){
        canvasLoadingSquare()
        function canvasLoadingSquare(){
            // console.log($("canvas#canvas-loading-square").get(0));
            var w=$("canvas#canvas-loading-square").width();
            var h=$("canvas#canvas-loading-square").height();
            //使用get把jq对象转换为js对象
            var ctx=$("canvas#canvas-loading-square").get(0).getContext('2d');

            /*初始化参数配置*/
            var step = 10;//方块尺寸
            var origin_squre = {
                x: w / 2,
                y: h / 2 - 150 / 2
            };
            var shaow_height = 100;//阴影距离方块高度

            /*方块位置信息，携带编号*/
            var squre1 = {
                x : 100,
                y : 50,
                increase : step,
                num : 1
            };
            var squre2 = {
                x : 120,
                y : 60,
                increase : step,
                num : 2
            };
            var squre3 = {
                x : 80,
                y : 60,
                increase : step,
                num : 3
            };
            var squre4 = {
                x : 60,
                y : 50,
                increase : step,
                num : 4
            };


            /*初始化方块位置信息*/
            function init_squre(x,y){
                squre1.x = x;
                squre1.y = y;

                squre2.x = x + step * 2;
                squre2.y = y + step;

                squre3.x = x - step * 2;
                squre3.y = y + step;

                squre4.x = x - step * 4;
                squre4.y = y;
            }

            init_squre(origin_squre.x,origin_squre.y);

            /*初次绘制方块*/
            draw_squre(squre4);
            draw_squre(squre1);
            draw_squre(squre2);
            draw_squre(squre3);


            /*阴影位置信息*/
            var shaow_begin = [
                {
                    x : squre1.x,
                    y : squre1.y + shaow_height,
                    increase : squre1.increase
                },
                {
                    x : squre2.x,
                    y : squre2.y + shaow_height,
                    increase : squre2.increase
                },{
                    x : squre3.x,
                    y : squre3.y + shaow_height,
                    increase : squre3.increase
                },{
                    x : squre4.x,
                    y : squre4.y + shaow_height,
                    increase : squre4.increase
                }
            ];

            /*重置阴影位置信息，依赖方块位置*/
            function get_shaow_pos(){
                shaow_begin = [
                    {
                        x : squre1.x,
                        y : squre1.y + shaow_height,
                        increase : squre1.increase
                    },
                    {
                        x : squre2.x,
                        y : squre2.y + shaow_height,
                        increase : squre2.increase
                    },{
                        x : squre3.x,
                        y : squre3.y + shaow_height,
                        increase : squre3.increase
                    },{
                        x : squre4.x,
                        y : squre4.y + shaow_height,
                        increase : squre4.increase
                    }
                ];
            }

            /*绘制一个方块的阴影*/
            function draw_shaow(x,y,increase){
                if(typeof x === "object"){
                    y = x.y;
                    increase = x.increase;
                    x = x.x;
                }
                ctx.fillStyle = "#e9e5dd"
                ctx.beginPath();
                ctx.moveTo(x,y);
                ctx.lineTo(x +increase * 2,y + increase);
                ctx.lineTo(x,y + increase * 2);
                ctx.lineTo(x - increase * 2,y + increase);
                ctx.closePath();
                ctx.fill();
            }

            /*绘制所有阴影*/
            for(var i in shaow_begin){
                draw_shaow(shaow_begin[i]);
            }

            /*绘制一个方块*/
            function draw_squre(x,y,increase,num){
                if(typeof x === "object"){
                    y = x.y;
                    increase = x.increase;
                    num = x.num;
                    x = x.x;
                }
                ctx.fillStyle = "#fffce6"
                ctx.beginPath();
                ctx.moveTo(x,y);
                ctx.lineTo(x +increase * 2,y + increase);
                ctx.lineTo(x,y + increase * 2);
                ctx.lineTo(x - increase * 2,y + increase);
                ctx.closePath();
                ctx.fill();

                /*测试使用标示方块*/
    //				ctx.font = "10px";
    //				ctx.fillStyle = "black";
    //				ctx.fillText(num,x,y + 10);

                ctx.fillStyle = "#faeba0"
                ctx.beginPath();
                ctx.moveTo(x,y + increase * 2);
                ctx.lineTo(x + increase * 2,y + increase);
                ctx.lineTo(x + increase * 2,y + increase * 3);
                ctx.lineTo(x ,y + increase * 4);
                ctx.closePath();
                ctx.fill();

                ctx.fillStyle = "#f0db70"
                ctx.beginPath();
                ctx.moveTo(x - increase * 2,y + increase);
                ctx.lineTo(x,y + increase * 2);
                ctx.lineTo(x ,y + increase * 4);
                ctx.lineTo(x - increase * 2,y + increase * 3);
                ctx.closePath();
                ctx.fill();
            }

            var for_index = 1;//记录当前执行动画的序列

            /*分析动画，其实动画只有两次的执行*/
            var interval = setInterval(function(){

                if(for_index == 1){
                    if(squre4.x == origin_squre.x - step * 2){
                        for_index = 2;
                    }else{
                        squre2.x -= 2;
                        squre2.y += 1;

                        squre4.x += 2;
                        squre4.y -= 1;
                    }
                }else if(for_index == 2){
                    if(squre4.x == origin_squre.x){
                        for_index = 1;

                        /*重置方块位置信息到初始值*/
                        init_squre(origin_squre.x,origin_squre.y);

                    }else{
                        squre3.x -= 2;
                        squre3.y -= 1;

                        squre2.x -= 2;
                        squre2.y -= 1;

                        squre4.x += 2;
                        squre4.y += 1;

                        squre1.x += 2;
                        squre1.y += 1;
                    }

                }

                ctx.clearRect(0,0,w,h);
                /*重绘方块*/
                if(for_index == 1 || for_index == 2){
                    draw_squre(squre4);
                    draw_squre(squre1);
                    draw_squre(squre3);
                    draw_squre(squre2);
                }

                /*重绘阴影*/
                get_shaow_pos();
                for(var i in shaow_begin){
                    draw_shaow(shaow_begin[i]);
                }

            },1000 / 24);
        }
    }
    //加载球，波浪
    if($("canvas#canvas-loading-wave")){
        canvasLoadingWave();
        function canvasLoadingWave(){
// var canvas = document.getElementById('canvas-loading-wave');
            var ctx = $("canvas#canvas-loading-wave").get(0).getContext('2d');
            var mW=$("canvas#canvas-loading-wave").width();
            var mH=$("canvas#canvas-loading-wave").height();

            //加载进度
            var rangeValue = 50;//加载值
            var nowRange = 0; //用于做一个临时的range

            //画布属性
            var lineWidth = 2;

            //圆属性
            var r = mH / 2; //圆心
            var cR = r - 16 * lineWidth; //圆半径
            //Sin 曲线属性
            var sX = 0;
            var sY = mH / 2;
            var axisLength = mW; //轴长
            var waveWidth = 0.015 ; //波浪宽度,数越小越宽
            var waveHeight = 6; //波浪高度,数越大越高
            var speed = 0.09; //波浪速度，数越大速度越快
            var xOffset = 0; //波浪x偏移量
            ctx.lineWidth = lineWidth;
            //画圈函数
            var IsdrawCircled = false;
            var drawCircle = function(){
                ctx.beginPath();
                ctx.strokeStyle = '#1080d0';
                ctx.arc(r, r, cR+5, 0, 2 * Math.PI);
                ctx.stroke();
                ctx.beginPath();
                ctx.arc(r, r, cR, 0, 2 * Math.PI);
                ctx.clip();
            };
            //画sin 曲线函数
            var drawSin = function(xOffset){
                ctx.save();
                var points=[]; //用于存放绘制Sin曲线的点
                ctx.beginPath();
                //在整个轴长上取点
                for(var x = sX; x < sX + axisLength; x += 20 / axisLength){
                    //此处坐标(x,y)的取点，依靠公式 “振幅高*sin(x*振幅宽 + 振幅偏移量)”
                    var y = -Math.sin((sX + x) * waveWidth + xOffset);
                    var dY = mH * (1 - nowRange / 100 );
                    points.push([x, dY + y * waveHeight]);
                    ctx.lineTo(x, dY + y * waveHeight);
                }
                //封闭路径
                ctx.lineTo(axisLength, mH);
                ctx.lineTo(sX, mH);
                ctx.lineTo(points[0][0],points[0][1]);
                ctx.fillStyle = '#1c86d1';
                ctx.fill();
                ctx.restore();
            };

            //写百分比文本函数
            var drawText = function(){
                ctx.save();
                var size = 0.4*cR;
                ctx.font = size + 'px Microsoft Yahei';
                ctx.textAlign = 'center';
                ctx.fillStyle = "rgba(06, 85, 128, 0.8)";
                ctx.fillText(~~nowRange + '%', r, r + size / 2);
                ctx.restore();
            };

            var render = function(){
                ctx.clearRect(0, 0, mW, mH);
                rangeValue = 50;
                if(IsdrawCircled == false){
                    drawCircle();
                }
                if(nowRange <= rangeValue){
                    var tmp = 1;
                    nowRange += tmp;
                }
                if(nowRange > rangeValue){
                    var tmp = 1;
                    nowRange -= tmp;
                }
                drawSin(xOffset);
                /* if($("canvas#canvas-loading-wave")){
                     drawText();
                 }*/
                drawText();
                xOffset += speed;
                requestAnimationFrame(render);
            };
            render();
        }
    }
    //加载球，圆
    if($("canvas#canvas-loading-circle")){
        canvasLoadingCircle();
        function canvasLoadingCircle(){
            var context = $("canvas#canvas-loading-circle").get(0).getContext('2d');
            var centerX=$("canvas#canvas-loading-circle").width();
            var centerY=$("canvas#canvas-loading-circle").height();
            rad = Math.PI*2/100, //将360度分成100份，那么每一份就是rad度
                speed = 0.1; //加载的快慢就靠它了
            //绘制蓝色外圈
            function blueCircle(n){
                context.save();
                context.strokeStyle = "#2C7DCB"; //设置描边样式
                context.lineWidth = 5; //设置线宽
                context.beginPath(); //路径开始
                context.arc(centerX/2, centerY/2, 50 , -Math.PI/2, -Math.PI/2 +n*rad, false); //用于绘制圆弧context.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
                context.stroke(); //绘制
                context.closePath(); //路径结束
                context.restore();
            }
            //绘制白色外圈
            function whiteCircle(){
                context.save();
                context.beginPath();
                context.strokeStyle = "white";
                context.arc(centerX/2, centerY/2, 50 , 0, Math.PI*2, false);
                context.stroke();
                context.closePath();
                context.restore();
            }
            //百分比文字绘制
            function text(n){
                context.save(); //save和restore可以保证样式属性只运用于该段canvas元素
                context.strokeStyle = "#fff"; //设置描边样式
                context.font = "40px Arial"; //设置字体大小和字体
                //绘制字体，并且指定位置
                context.strokeText(n.toFixed(0)+"%", centerX/2-30, centerY/2+10);
                context.stroke(); //执行绘制
                context.restore();
            }
            //动画循环

            (function drawFrame(){
                window.requestAnimationFrame(drawFrame, $("#canvas-loading-circle"));
                context.clearRect(0, 0, centerX, centerY);
                whiteCircle();
                text(speed);
                blueCircle(speed);
                if(speed > 100) speed = 0;
                speed += 0.1;
            }());
        }
    }
});