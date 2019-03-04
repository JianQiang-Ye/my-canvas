var canvas = document.getElementById('canvasX')
var context = canvas.getContext('2d')

var usingBrush = false // 是否使用刷子，左键点击即开启

var lastPoint = { 'x': undefined, 'y': undefined }  //两点之间的上一个点
var newPoint = { 'x': undefined, 'y': undefined } //两点之间下一个点

autoSetCanvasSize(canvas)

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
                context.clearRect(x - 5, y - 5, 10, 10)
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
                context.clearRect(x - 5, y - 5, 10, 10)
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
                context.clearRect(x - 5, y - 5, 10, 10)
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
                context.clearRect(x - 5, y - 5, 10, 10)
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
    context.fillStyle = 'black'
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
// 橡皮擦
var eraser = document.getElementById('eraser')
var usingEraser = false // 橡皮擦的状态
eraser.onclick = function (e) {
    usingEraser = !usingEraser //当橡皮擦被点击时，橡皮擦的状态改变
    actions.className = 'actions x'
}
brush.onclick = function (e) {
    usingBrush = false
    usingEraser = false
    actions.className = 'actions'
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
