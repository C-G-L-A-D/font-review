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

* **margin: 0 auto;**
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

**介绍**：

​		header、footer 部分固定高度，left、right 部分固定宽度。center 部分自适应，并且优先渲染。



圣杯布局和双飞翼布局的区别：

​	![image-20220915175757621](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/4964/image-20220915175757621.png)

双飞翼布局优化了圣杯布局开启定位的方式



##  10.1 圣杯布局

* flex布局（弹性）：

  [源码地址](https://github.com/C-G-L-A-D/font-review/blob/main/code/%E5%9C%A3%E6%9D%AF%E5%B8%83%E5%B1%80/flex%E5%B8%83%E5%B1%80.html)

  **主要思路：**

  ​	将父元素设置display: flex; 中间区域设置flex=1，左右两边设置固定宽度。

  

* **！！float布局1（浮动）：**

  [源码地址](https://github.com/C-G-L-A-D/font-review/blob/main/code/%E5%9C%A3%E6%9D%AF%E5%B8%83%E5%B1%80/%E6%B5%AE%E5%8A%A8%E5%B8%83%E5%B1%801.html)

  ​	**主要思路：**

  ​		1. 通过内边距将中间整体部分的左右两边置空,

  ​		2. 将中间展示区域的宽度设置为父元素的宽度，

  ​		3. 再将左右两边移动到内边距的部分就可以了。



​			但是由于，中间区域先渲染，且占据父元素100%的宽度，即使使用浮动，也会将左右区域挤到下一行。

​			但是在浮动的情况下，可以通过 margin-left = -100% 将左边区域拉到中间区域的开头部分，如下图：

<img src="https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/4964/20220915165649.png" alt="圣杯布局-float版本1-1" style="zoom:50%;" />

​			然后再通过定位，将左边区域占据父元素左边距就可以。

​			右边区域可以通过 margin-left = -父元素的margin-left 将右边区域拉到中间区域的尾部部分

<img src="https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/4964/image-20220915170932762.png" alt="image-20220915170932762" style="zoom:50%;" />

​			同理，也是通过定位将其移动到父元素右边距区域。



* float布局2（浮动）：

  [源码地址](https://github.com/C-G-L-A-D/font-review/blob/main/code/%E5%9C%A3%E6%9D%AF%E5%B8%83%E5%B1%80/%E6%B5%AE%E5%8A%A8%E5%B8%83%E5%B1%802.html)

​		**主要思路：**

​			优先渲染左右两区域，然后将左右两区域分别靠左靠右浮动。



* 绝对定位布局：

  [源码地址](https://github.com/C-G-L-A-D/font-review/blob/main/code/%E5%9C%A3%E6%9D%AF%E5%B8%83%E5%B1%80/%E7%BB%9D%E5%AF%B9%E5%AE%9A%E4%BD%8D.html)

  **主要思路：**

  ​	父元素使用相对定位，左右两边区域使用绝对定位，将固定在两边。

  ​	中间区域可以使用外边距留出左右两边的区域，或者也使用绝对定位，设置left和right为左右两边宽度大小。



* grid布局（网格）：

  [源码地址](https://github.com/C-G-L-A-D/font-review/blob/main/code/%E5%9C%A3%E6%9D%AF%E5%B8%83%E5%B1%80/%E7%BD%91%E6%A0%BC%E5%B8%83%E5%B1%80.html)

  **主要思路：**



## 10.1 双飞翼布局

​		优化了圣杯布局的浮动版本1开启定位的方式。在中间区域包含在一个容器里。这个容器与左右两区域同层级。原先在浮动情况下，左边区域通过 margin-left 设置为 -中间区域的宽度，可以移动到中间区域开头部分。但是由于两边空白的区域是中间区域的内边距设置的，所以还需要通过定位进行移动。

​		但是，圣杯布局在中间区域包含在一个容器内，通过设置中间区域的外边距来留出左右两边空位。中间区域的父容器与左右两边同层级，则左边区域的 margin-left 可以设置为 -中间区域父容器的宽度，就可以不使用定位。

​	[源码地址](https://github.com/C-G-L-A-D/font-review/blob/main/code/%E5%8F%8C%E9%A3%9E%E7%BF%BC%E5%B8%83%E5%B1%80/index.html)


