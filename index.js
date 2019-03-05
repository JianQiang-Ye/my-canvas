var canvas = document.getElementById('canvasX')
var context = canvas.getContext('2d')

var usingBrush = false // 是否使用刷子，左键点击即开启

var lastPoint = { 'x': undefined, 'y': undefined }  //两点之间的上一个点
var newPoint = { 'x': undefined, 'y': undefined } //两点之间下一个点



autoSetCanvasSize(canvas) //自动设置画布大小

context.fillStyle = 'white'
context.fillRect(0, 0, canvas.width, canvas.height)
// 
if (document.body.ontouchstart === undefined) {
    // pc设备
    listenToMouse(canvas)
    } else {
    //触屏设备
    // 按下手指
    canvas.ontouchstart = function (ev) {
        var x = ev.touches[0].clientX
        var y = ev.touches[0].clientY

        usingBrush = true

        if (usingBrush) {
            if (usingEraser) {
                // 使用橡皮擦
                context.fillStyle = 'white'
                context.fillRect(x - 5, y - 5, 10, 10)
            } else {
                drawCircle(x, y, 3)
                lastPoint = { 'x': x, 'y': y }
            }
        }
    }

    // 移动手指
    canvas.ontouchmove = function (ev) {
        var x = ev.touches[0].clientX
        var y = ev.touches[0].clientY

        newPoint = { 'x': x, 'y': y }

        if (usingBrush) {
            if (usingEraser) {
                context.fillStyle = 'white'
                context.fillRect(x - 5, y - 5, 10, 10)
            }
            else {
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
                // 当对象之间使用=的时候，赋值的时候要小心，
                // 如果是.赋值，则两个对象会一起改变
                // 如果是{}赋值，则相互之间不会改变
            }
        }
    }

    //松开鼠标
    canvas.ontouchend = function (ev) {
        usingBrush = false
    }
}

function listenToMouse(canvas) {
    //按下鼠标
    canvas.onmousedown = function (ev) {
        var x = ev.clientX
        var y = ev.clientY

        usingBrush = true

        if (usingBrush) {
            if (usingEraser) {
                context.fillStyle = 'white'
                context.fillRect(x - 5, y - 5, 10, 10)
            } else {
                drawCircle(x, y, 3)
                lastPoint = { 'x': x, 'y': y }
            }
        }

    }


    //移动鼠标
    canvas.onmousemove = function (ev) {
        var x = ev.clientX
        var y = ev.clientY

        newPoint = { 'x': x, 'y': y }

        if (usingBrush) {
            if (usingEraser) {
                context.fillStyle = 'white'
                context.fillRect(x - 5, y - 5, 10, 10)
            }
            else {
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
                // 当对象之间使用=的时候，赋值的时候要小心，
                // 如果是.赋值，则两个对象会一起改变
                // 如果是{}赋值，则相互之间不会改变
            }
        }

    }

    //松开鼠标
    canvas.onmouseup = function (ev) {
        usingBrush = false
    }

}


//工具函数
//画一个圆
function drawCircle(x, y, radius) {
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2)
    context.fill()
    context.closePath()
}
// 画一条线
function drawLine(x1, y1, x2, y2) {
    context.beginPath()
    context.lineWidth = 5  //线的宽度
    context.moveTo(x1, y1) // 起点
    context.lineTo(x2, y2) // 终点
    context.stroke()  //画线
    context.closePath()
}

var eraser = document.getElementById('eraser')
var brush = document.getElementById('brush')
var clear = document.getElementById('clear')
var save = document.getElementById('save')


// 橡皮擦按钮
var usingEraser = false // 橡皮擦的状态
eraser.onclick = function (e) {
    usingEraser = true //当橡皮擦被点击时，橡皮擦的状态改变
    eraser.classList.add('active') //橡皮擦被点击时，高亮
    brush.classList.remove('active') //其他按钮恢复正常
    clear.classList.remove('active')
    save.classList.remove('active')
}
// 画笔按钮
brush.onclick = function (e) {
    usingBrush = false
    usingEraser = false
    brush.classList.add('active')
    eraser.classList.remove('active')
    clear.classList.remove('active')
    save.classList.remove('active')
}
// 清除画板
clear.onclick = function (e) {
    usingEraser = false

    clear.classList.add('active')
    brush.classList.add('active')
    eraser.classList.remove('active')
    save.classList.remove('active')
    setTimeout(function(){ clear.classList.remove('active'); }, 200);    
    // setTimeout(() => {
    //     clear.classList.remove('active')
    // }, 200);//设置延迟执行,这种写法在某些手机浏览器上不支持

    context.fillStyle = 'white'
    context.fillRect(0, 0, canvas.width, canvas.height)
}
// 保存
save.onclick = function (e) {
    save.classList.add('active')
    setTimeout(function(){ save.classList.remove('active'); }, 200);    

    var url = canvas.toDataURL('image/png')
    var a = document.createElement('a')
    document.body.append(a)
    a.href = url
    a.download = '你画的佩奇也太可爱了吧！' //download的属性值是下载的名字
    a.click()
}
// 设置canvas的大小
function setCanvasSize() {
    var pageHeigh = document.documentElement.clientHeight
    var pageWidth = document.documentElement.clientWidth
    canvas.width = pageWidth
    canvas.height = pageHeigh
}
// 自动设置canvas的大小
function autoSetCanvasSize(canvas) {
    setCanvasSize();
    // 刷新Canvas的大小
    // window.onresize = function () {
    //     setCanvasSize();
    // }
}
// 颜料盘
var red = document.getElementById('red')
var blue = document.getElementById('blue')
var pink = document.getElementById('pink')
var black = document.getElementById('black')

red.onclick = function (e) {
    red.classList.add('active')
    black.classList.remove('active')
    blue.classList.remove('active')
    pink.classList.remove('active')

    context.fillStyle = '#ea5b52'
    context.strokeStyle = '#ea5b52'
}
blue.onclick = function (e) {
    blue.classList.add('active')
    black.classList.remove('active')
    red.classList.remove('active')
    pink.classList.remove('active')

    context.fillStyle = '#0776c2'
    context.strokeStyle = '#0776c2'
}
pink.onclick = function (e) {
    pink.classList.add('active')
    black.classList.remove('active')
    blue.classList.remove('active')
    red.classList.remove('active')

    context.fillStyle = '#f2a7c8'
    context.strokeStyle = '#f2a7c8'
}
black.onclick = function (e) {
    black.classList.add('active')
    blue.classList.remove('active')
    red.classList.remove('active')
    pink.classList.remove('active')

    context.fillStyle = '#000401'
    context.strokeStyle = '#000401'
}

