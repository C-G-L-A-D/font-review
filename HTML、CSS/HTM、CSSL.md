# 1. HTML5 新特性、语义化

  1. 概念：

     ​	HTML5的语义化指的是 `合理正确的使用语义化标签来创建页面的结构`

  3. 语义化的优点

* 在没有CSS样式下，也能呈现很好得结构效果；
* 代码结构清晰，易于阅读；
* 利于开发和维护，方便其他设备解析，并根据语义渲染页面；
* 有利于搜索引擎优化SEO，根据不同的标签赋予不同的权重。



# 2. CSS选择器和优先级

## 2.1 CSS选择器

1. id选择器（#myId）
2. class选择器（.myClass）
3. 伪类选择器（:hover、:active）
4. 属性选择器（[alt="加载图片失败"]）
5. 标签选择器（div、p）
6. 相邻选择器（h1 + p）—— **+**， 第一个p
7. 父子选择器（h1 > p）—— **>** ， 只包含子代
8. 后代选择器（h1 p）—— 包括子、孙...代
9. 兄弟选择器（h1 ~ p）—— **~**， h1后的所有p
10. 通配符选择器（*）



## 2.2 优先级

1. `!important`
2. 内联选择器
3. ID选择器
4. Class选择器、属性选择器、伪类选择器
5. 伪元素选择器、标签选择器
6. 关系选择器、通配符选择器

> ps：不论哪个选择器的数量多，都是通过优先级进行判断。比如 #ff > .lasd + .sd 。
>
> 而当优先级相同的时候，比较选择器的数量，例如： #df #fh > #hg
>
> 当选择器优先级相同，数量相同时，谁近选谁。



#  3. CSS的position（定位）

* **static 默认定位**： 默认值，没有定位，正常流。
* **relative 相对定位**： 该元素相对于它本身原来的位置进行移动。
* **absolute 绝对定位**： 该元素相当于它最近的父元素的位置进行移动。
* **fixed 固定定位**： 该元素是相对于浏览器窗口的位置进行移动，窗口滚动，位置也不变。
* **sticky 粘性定位**： 结合 `相对定位` 和 `固定定位` 。当所处定位没有超过设置的定位时，为 `相对定位` ，超过后为 `固定定位` 。



# 4. CSS 的盒子模型

* 标准盒模型：width = 内容的宽度
* IE盒模型： width = 内容宽度 + 内边距宽度 + 边框宽度

![image-20220911175731729](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/4964/image-20220911175731729.png)

# 4.2 怎么设置盒子模型

​	可以通过CSS的**box-sizing**进行设置：

* 标准盒模型： box-sizing: content-box;
* IE盒模型： box-sizing: border-box;
* 继承父元素： box-sizing: inherit;



# 5. BFC（块级格式化上下级）

## 5.1 BFC 概念

​		**BFC** 是一个独立渲染的区域，规定了内部的box如何布局，并且这个区域的子元素不会影响到外面的元素。



## 5.2 BFC 触发条件

* 根元素（HTML）
* `float` 不为 none
* `overflow` 不为  visible
* `position` 不为 static 或 relative
* 行内块元素（display: inline-block;）
* 表格单元格（display: table-cell;）
* 表格标题（display: table-caption;）
* 匿名表挨个单元格元素（display: table;）
* 网格元素（display: grid; / display: inline-grid; 的直接子元素）



## 5.3 BFC 渲染规则

* BFC 垂直方向边距重叠
* BFC 的区域不会与浮动元素的box重叠
* BFC 是一个独立的容器，外面的元素不会影响里面的元素
* 计算 BFC 高度的时候浮动元素也会参与计算



## 5.4 BFC 应用场景

* 防止浮动导致父元素高度塌陷
* 避免 `margin` 折叠
* 避免元素背浮动元素覆盖



# 6. 水平居中

## 6.1 行内元素

​	**text-align: center;**



## 6.2 块级元素

### 6.2.1 确定宽度

* **marginL: 0 auto;**
* position: relative; margin-left: （父width - 子width）/ 2;



### 6.2.2 未知宽度

* 表格元素 margin: 0 auto; （table标签或 display: table;）
* 行内块元素：display: inline-block; text-align: center;
* flex布局：display: flex; justify-content: center;
* 绝对定位：transform: translateX(-50%);



# 7. 垂直居中

* **line-height** 

* 子绝父相，设置子元素：margin: auto;

* flex布局：

  ​	html代码：

  ```html
  <div class="father">
      <div>1</div>
      <div class="son">2</div>
      <div>3</div>
  </div>
  ```

  

  * 子元素设置为 **margin: auto;** 

  <img src="https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/4964/image-20220912202303951.png" alt="image-20220912202303951" style="zoom:50%;" />

  ```css
  .father {
      background-color: yellow;
      width: 250px;
      height: 300px;
      display: flex;
  }
  
  .father > div {
      width: 100px;
      height: 100px;
      border: 1px solid black;
      margin: auto 0;
  }
  ```

  

  

  * 在父元素设置 **align-items: center;**（副轴上将父元素高度平均分成每一行，然后元素在该行内垂直居中）；

  <img src="https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/4964/image-20220912201027940.png" alt="image-20220912201027940" style="zoom:50%;" />

  ```css
  .father {
      background-color: yellow;
      width: 250px;
      height: 300px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
  }
  
  .father > div {
      width: 100px;
      height: 100px;
      border: 1px solid black;
  }
  ```

  

  

  * 在父元素设置 **align-content: center;**（副轴上所有元素整体在父元内素垂直居中）；

  <img src="https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/4964/image-20220912201057528.png" alt="image-20220912201057528" style="zoom:50%;" />

  ```css
  .father {
      background-color: yellow;
      width: 250px;
      height: 300px;
      display: flex;
      flex-wrap: wrap;
      align-content: center;
  }
  
  .father > div {
      width: 100px;
      height: 100px;
      border: 1px solid black;
  }
  ```

  

  * 在子元素设置 **align-self: center;**（该元素在改行上垂直居中）；

  ![image-20220912201301724](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/4964/image-20220912201301724.png)

  ```css
  .father {
      background-color: yellow;
      width: 250px;
      height: 300px;
      display: flex;
      flex-wrap: wrap;
  
  }
  
  .father > div {
      width: 100px;
      height: 100px;
      border: 1px solid black;
  }
  
  .father .son {
      align-self: center;
  }
  ```



* 绝对定位：transform: translateY(-50%);
* 内联元素即单元格：vertical-align: middle;



# 8. 隐藏页面元素

1. **opacity: 0;** 将元素透明度设置为0。隐藏时，绑定该元素得事件可以被触发。**不会引起页面重绘、重拍**。
2. **visibility: hidden;** 将元素隐藏，但该元素在文档中保留原有空间。隐藏时，绑定该元素得事件不会被触发。因此会**引起重绘，不会引起重拍**。
3. **overflow: hidden;** 将DOM元素从文档中移出改变页面布局，从而实现隐藏。因此会**引起重绘重排**。



# 9. 重绘（repaint）、重排/回流（reflow）

## 9.1 介绍

1. **重排**：DOM元素的改变影响了DOM元素的集合变化，使得浏览器需要重新计算元素集合属性，从而需要进行从新布局，这个过程就是 **重排/回流** 。
2. **重绘**：DOM元素的外观发生改变，但是几何属性没有改变，只需要重新渲染元素。这个过程是 **重绘** 。

**重排会引起页面重新生成布局渲染，而重绘会重新渲染页面元素，但是不会引起页面重新布局。因此重排的过程包含重绘。由此可知，重排一定会引起重绘，重绘不会触发重排**。

> ps：重构和重排的代价是昂贵的，会破坏用户体验。两者相比至下，重排引起的性能影响更加大，所以在两者都无法避免的情况下，我们应该选择重绘。



## 9.2 如何触发重排和重绘？

* 添加、删除、更新、移动DOM节点或给DOM节点添加动画。
* 通过display: hidden;隐藏DOM节点 —— 重排和重绘
* 通过 visibility: hidden; 隐藏DOM节点 —— 重绘
* 添加样式表、调整样式属性
* 用户行为，例如：调整窗口大小，改变字号、滚动等



## 9.3 如何避免重排和重绘？

* 通过class集中改变样式，尽量少使用内联样式
* 将复杂的动画效果应在在脱离文档流的元素上（position: absolute / fixed;）
* 尽量少使用CSS表达式，如：calc()
* 尽量避免 JS 操作DOM元素样式，修改多个DOM元素尽量合并为一次操作。
* 重复使用元素属性时，将元素属性值赋值给变量（避免重复查询元素导致回流）



# 10. CSS 布局

## 10.1 上下部分固定，中间三栏布局（中间两边定宽，中间center部分自适应）

**介绍**：

​		header、footer 部分固定高度，left、right 部分固定宽度。center 部分自适应，并且优先渲染。



###  10.1.1 圣杯布局





### 10.1.2 双飞翼布局



## 10.2 两栏布局