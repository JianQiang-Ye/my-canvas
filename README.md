# my-canvas
# 效果预览图
预览连接：https://jianqiang-ye.github.io/my-canvas/
![image.png](https://upload-images.jianshu.io/upload_images/15770018-89714ea5327a4e68.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
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

4. 关于对象复制，发现一个坑。
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
