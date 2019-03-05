# 效果预览图
预览连接：https://jianqiang-ye.github.io/my-canvas/

![尽力了](https://upload-images.jianshu.io/upload_images/15770018-d48fbd0ec509daeb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 特点
1. 支持移动端操作
2. 使用 Canvas API
3. 包含橡皮、换颜色、保存等功能
4. 使用原生 JS 开发
5. HTML 5 & CSS 3 inside
## 知识点总结
1. 画笔从画下到松开需要三个鼠标事件`onmouseup`、`onmousemove`、`onmousedown`
2. 关键部分的代码
```
//画一个圆
function drawCircle(x, y, radius) {
    context.beginPath();
    context.fillStyle = 'black' //填充颜色
    context.arc(x, y, radius, 0, Math.PI * 2) //横坐标,纵坐标,半径,初始度数,终点度数
    context.fill() //填充
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
//橡皮擦
context.clearRect(x - 5, y - 5, 10, 10)// 注意橡皮擦是矩形,起点是从矩形的左上角开始
```
3. 如果仅仅是画圆是不够的，会出现断断续续的情况，还需要把圆之间用线连起来，把圆连起来的思路是将上一次监听的点的坐标记录下来，然后将这个点和下一次监听到的坐标连接起来，最后把新监听到的点更新。

4. 关于对象复制，学到对象的引用。
```
//1.现在有两个对象
var a = {'x':1};
var b = {'x':2}
//2.将b复制给a
a = b;
//3.如果此时改变b的属性,那么a的属性值也会跟着改变.例如:
b.x = 5;
a.x  //此时输出结果是5
// 但是,如果换另一种方式改变b的属性
b = {'x': 6}
a.x //此时输出结果还是5
```
5. 更新窗口高度
```
window.onresize = function () {
         setCanvasSize();
}
```
6. 获取页面高度
```
var pageHeigh = document.documentElement.clientHeight
var pageWidth = document.documentElement.clientWidth
```
7. 改变canvas的宽高不能用css中的height、width，要改变其标签属性
8. 切换橡皮擦和画笔按钮时，最好不要共用一个，一个button只做一件事情
```
eraser.onclick = function (e) {
    usingEraser = !usingEraser //当橡皮擦被点击时，橡皮擦的状态改变
    actions.className = 'actions x'
}
brush.onclick = function(e){
    usingBrush = false
    actions.className = 'actions'
}
```
 9. 画笔、橡皮擦等样式是在Iconfront上找的。
10. 橡皮擦实现原理：原本是是想用`canvas`画板的`clearRect`实现的，但是在后续保存时会出现把白色背景擦除的问题。因此改用`fillStyle`，把它当做一个白色画笔。
清除原理实际上是画一个白色大矩形。
```
    context.fillStyle = 'white'
    context.fillRect(0, 0, canvas.width, canvas.height)
```
11. 保存实现原理
```
    var url = canvas.toDataURL('image/png')
    var a = document.createElement('a')
    document.body.append(a)
    a.href = url
    a.download = 'peppa' 
    a.click()
```
12.颜料盘的颜色特地用了纹路(noisy)，目的是为了更逼真一点。实现方法非常简单，只需要一张半透明的纹路图，在网上都可以在生成。
```
    background-image: url(img-noise-361x370.png);    
    background-color: black;
```
13. 考虑到手机的适配。手机的宽度默认会设置成980px，会把图标等比例缩小，因此需要在`html`文件先设置下手机页面的宽度。
```
 <meta name="viewport" content="width=device-width, initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0">
```
14. 判断是否是触摸屏设备
```
document.body.ontouchstart === undefined
```
15. 对应的监听事件也要改为`ontouchstart`,`ontouchmove`,`ontouchend`
16. 刷新窗口大小
```
//刷新Canvas的大小
     window.onresize = function () {
         setCanvasSize();
    }
```
