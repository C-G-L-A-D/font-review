# 1. JS 的数据类型

* 原始数据类型
  * Number
  * String
  * Boolean
  * Symbol
  * BigInt
    * 整数末尾加上n，例如： 143n
    * BigInt("23") 或 BigInt(18)
  * Undefined
  * Null
* 复杂类型
  * Object
    * Array
    * Function
    * Date
    * ...



# 2. 如何检测 JS 变量的数据类型

## 2.1 typeof

```javascript
// 1. Number类型
console.log(typeof 1) // 'number'

// 2. String类型
console.log(typeof 'sadf') // 'string'

// 3. Symbole类型
let sym = Symbol()
console.log(typeof sym) // 'symbol'

// 4. Boolean
console.log(typeof true) // 'boolean'

// 5. Null
console.log(typeof null) // 'object'

// 6. Undefined
console.log(typeof undefined) // 'undefined'

// 7. BigInt
console.log(typeof 10n) // 'bigint'

// 8. Object
console.log(typeof []) // 'object'
console.log(typeof {}) // 'object'
console.log(typeof function (){}) // 'function'
```

由上述代码可看出，`typeof` 操作符检测不出 `null` 和 `Object` 类型的具体数据类型，可以检测 `Function` 的类型



## 2.2 intanceof

​	 只能判断 `对象` 类型，不能判断基本数据类型。因为 `instanceof` 是通过判断该类型在原型链上找原型进行确定的。

```javascript
// 1. Number
console.log(1 instanceof Number) // false

// 2. String
console.log('df' instanceof String) // false

// 3. Boolean
console.log(true instanceof Boolean) // false

// 4. Null
console.log(null instanceof Object) // false

// 5. Symbol
console.log(Symbol() instanceof Symbol) // false

// 6. BigInt
console.log(43n instanceof BigInt) // false

// 7. Array
console.log([] instanceof Array) // true

// 8. Function
console.log(function(){} instanceof Function) // true

// 9. Object
console.log({} instanceof Object) // true
```



## 2.3 constructor

​	当对象通过constructor属性改变它的原型对象为其他自定义对象后，就不能判断出来他的数据类型。

```javascript
// 1. Number
console.log((2).constructor) // ƒ Number() { [native code] }
// 2. String
console.log(('243').constructor) // ƒ String() { [native code] }
// 3. BigInt
console.log((10n).constructor) // ƒ BigInt() { [native code] }
// 4. Boolean
console.log((true).constructor) // ƒ Boolean() { [native code] }
// 5. Symbol
console.log((Symbol()).constructor) // ƒ Symbol() { [native code] }
// 6. Array
console.log(([]).constructor) // ƒ Array() { [native code] }
// 7. Object
console.log(({}).constructor) // ƒ Object() { [native code] }
// 8. Function
console.log((function(){}).constructor)  // ƒ Function() { [native code] }
```



## 2.4 Object.prototype.toString.call()

​		不同对象类型调用的toString()方法输出的结果不一样，因为不同对象类型的toString()都是经过重写的。所以只能通过调用原型对象上的toString()方法来输出，并且要通过call方法进行改写this指向为传入参数，不然输出对象指的是原型对象。

```javascript
var output = Object.prototype.toString

console.log(output.call([])) // '[Object Array]'
console.log(output.call({})) // '[Object Object]'
console.log(output.call(new Date())) // '[Object Date]'
console.log(output.call(function(){})) // '[Object Function]'
console.log(output.call(2)) // '[Object Number]'
console.log(output.call(true)) // '[Object Boolean]'
console.log(output.call('adfa')) // '[Object String]'
console.log(output.call(Symbol())) // '[Object Symbol]'
console.log(output.call(145n)) // '[Object BigInt]'
console.log(output.call(null)) // '[Object Null]'
console.log(output.call(undefined)) // '[Object Undefined]'
```



# 3.  Object.is()、==和===

1. === 是严格相等，两边的类型和值都要相等，并且 +0 不严格等于 -0，NaN 也不严格等于 NaN

2. Object.is() 在 === 的基础上修复了一些失误，Object.is(+0, -0) 和 Object.is(NaN, NaN) 都返回 true

3. == 比较时，如果值相同，类型不同也会返回true。例如，'1' 和 1。并且 == 在比较时，还涉及类型转换。转换规则如下：

   * 首先判断两边的类型是否相同，类型相同则判断值是否相同。
   * 判断两边是否是 null 或者 undefined。

   <img src="https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/4964/image-20220915204817419.png" alt="image-20220915204817419" style="zoom:50%;" />

   * 判断两边是否为字符串类型（String）或者数字类型（Number），是的话将String类型转换为Number类型在进行比较。
   * 判断其中一方是不是Boolean类型，是的话就将Boolean类型转换为Number类型，在进行比较。
   * 如果其中一方为Object，且另一方为String、Number或者Symbol，会将Object转换成字符串，再 进行比较。



# 4. [] == ![]

​	1. 要先进行类型转换，因为有 `!(取反符号)` 所以要先将 `![]` 转换为布尔值。

	2. `![]` 转换为布尔值之前，要先将 `[]` 转换为布尔值，Boolean([]) 为 true
 	3. `[]` 的布尔值取反为 false。
 	4. 根据 == 比较类型转换规则，如果有一方是布尔值，则需要转换为Number类型进行比较。此时相当于进行 `[] == false`
 	5. Number([]) 为 0，Number(false) 为 0
 	6. 所以最后比较情况其实是 `0 == 0` ，因此输出结果当然为 `true`



# 5. JS的整数

​	通过 Number 类型来表示，遵循IEEE754标准，通过64位来表示一个数字。最大的安全数字是 `2^53 - 1` 。因为十进制（符号位，指数位，小鼠部分有效位）=> （1，11，53）

​	如果后台发送了一个超过安全数字的数，会进行截断。结果为 JS支持的最大数



# 6. var、let 和 const

* **var：**
  * 作用域：函数作用域
  * 存在变量提升，可以先使用声明。
  * 值可改变；
  * 可以在同一个作用域声明多次；
  * 当在全局上下文中声明变量时，该变量时全局变量，与全局对象有关系。
* **let：**
  * 作用域：块级作用域；
  * 存在变量提升，但是也存在暂时性死区，所以必须声明后使用；
  * 值可改变；
  * 不可以在同一个作用域声明多次；
  * 在全局上下文中，声明的变量与全局对象无关。
* **const：**
  * 作用域：块级作用域；
  * 存在变量提升，但是也存在暂时性死区，所以必须声明后使用；
  * 不可以在同一作用域，多次声明。
  * 值不可以改变，定义的是常量，所以必须要在声明的同时进行赋值；
  * 在全局上下文中，声明的变量与全局对象无关。



# 7. Symbol 有什么用

1. 创建独一无二的变量**防止命名冲突**
2. 因为 `Symbol` 不会被常规的方法遍历到，所以可以用来**模拟私有变量**。
3. 因为有 `Symbol.iterator` 的对象才可以使用 `for...of` 循环，统一处理数据结构。所以可以用来**提供遍历接口**。调用之后会返回一个遍历器对象，使用其 next 方法可以得到两个返回值，{value, done}。done表示是否遍历完成，value表示当前执行位置的值。



# 8. 作用域、作用域链

​	ES5中只有全局作用域和函数作用域。ES6新增了块级作用域。

* **作用域：** 确定了当前执行的代码区域对变量的访问权限。因此可以隔离变量。

* **作用域链：** 需要访问一个变量时，首先会从当前作用域查找，如果没有找到，就到上一层作用域中查找。同理，如果没找到，就一直往上层寻找。知道找到全局作用域。如果在全局作用域还没找到，则该变量不存在。而作用域链就是每层作用域的层级关系链。



# 9. 执行上下文

​	执行 JS 代码时，会创建其对应的执行上下文。其中，每个执行上下文都包含一下三个重要属性：

* 变量（VO）
* 作用域链（Scope chain）
* this



# 10. 闭包

## 10.1 什么是闭包	

​	闭包是值有权访问另一个作用域中的变量



## 10.2 闭包的本质

​	当前环境中存在指向父级作用域的引用。例如：

```javascript
function f1() {
    var a = 2
    function f2 { // 拥有自身作用域
        console.log(a) // 为了寻找到a变量，向上级作用域中寻找
     	// 所以，此时包含自身作用域和父级作用域   
    }
    return f2
}
var x = f1() // 返回f2函数
x() // 在全局作用域下直接调用f2函数。此时f2包含自身作用域、f1作用域和全局作用域。
```



## 10.3 闭包形成条件

1. 函数嵌套
2. 内部函数引用外部函数的局部变量



##  10.4 闭包的表现形式（应用场景）

1. 返回一个函数
2. 作为函数参数进行传递
3. 在异步事件中使用了回调函数
4. 立即执行函数（当前作用域、全局作用域）



## 10.5 闭包优缺点

* 优点：延长局部变量的声明周期
* 缺点：导致内存泄漏，因为闭包变量保存在堆内存中。



# 11.  原型、原型链

* 原型：每一个对象（除null外）在创建的时候都会关联另外一个对象，这个对象就是原型。每一个对象都会从原型中继承属性。
* 原型链：相互关联的原型组成的链状结构。

![image-20220915232732340](https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/4964/image-20220915232732340.png)



# 12. this

* 全局上下文中，严格模式的this为 undefined。非严格模式，this指向全局对象
* 普通函数直接调用，this指向全局对象
* 函数作为对象方法进行调用，this指向该对象 
* dom元素监听事件中，this只想dom元素
* 构造器中，this指向实例对象
* 箭头函数没有自己的this。箭头函数里的this是最近的this
* call、apply和bind可以进行显示帮顶

> ps：优先级 new > call、appiy、bind  > 对象方法 > 直接调用



# 13. call、apply 和 bind
​    都可以改掉this指向(除了箭头函数)。

区别：
* call的参数为多个，调用后立即执行
* apply的参数为this将要指向的对象和原函数的参数数组，调用后立即执行
* bind函数可以不立即执行



# 14. 继承

## 14.1 原型链继承

​	**核心：** 将子类的原型替换父类的实例对象，即 `Child.prototype = new Parent(); Child.prototype.constructor = Child` ，由此，子类的实例对象就可以共享父类实例对象的变量和方法。从而实现继承。

​	**缺点：**

		1. 父类中的引用对象会被子类的实例对象共用；
  		2. 在创建子类的实例对象时，不能给父类传参。



## 14.2 盗用构造函数(经典继承)

​	**核心：**在子类构造函数中调用父类的构造函数，通过更改父类构造函数的this指向为子类的实例对象。即 

```javascript
function Child() {
    // 构造函数中的this指向实例对象
    Parent.call(this)
}
```

​	**优点：**

  1. 可以在子类构造函数中，向父类构造函数传递参数；

  2. 避免了父类引用类型共用，因为每创建一个子类的实例对象，都会再运行一次父类的构造函数。

     

​	**缺点：**

​		因为方法都在构造函数中定义，而每创建一次子类的实例对象都会再运行一次构造函数，导致每次创建实例对象都会再创建一遍方法。因此，方法不能重用。



## 14.3 组合继承（伪经典继承）

​	**核心：**使用原型链继承原型对象上的属性和方法， 通过盗用构造函数继承实例对象属性

```javascript
function Child(args) {
    Parent.apply(this,args)
}
Child.prototype = new Parent()
Child.prototype.constructor = Child
```

​	**优点：**

​			融合原型链继承和构造函数的优点，是 JS 中最常用的继承模式。



## 14.4 原型式继承

​	**核心：**通过 ES5 的 `Object.create()` 模拟继承，将传入的对象作为创建的对象原型。创建一个临时的构造函数，将传入的对象作为该构造函数的原型对象，然后将构造函数返回。

```javascript
function createObj(o) {
    function F() {}
    F.prototype = o
    return new F()
}
```

​	**缺点：**

​		跟原型链继承一样，会共享引用类型的属性值。



## 14.5 寄生式继承

​	**核心：**



## 14.6 寄生组合式继承

​	**核心：** 通过使用 `Object.create` 创建原型对象来避免重复执行父类构造函数。或者通过创建临时构造函数，临时构造函数的原型指向父类原型。然后再将子类原型指向临时构造函数的实例对象。



## 14.7 ES6 继承语法

​	使用 `class` 关键字定义类，使用 `extends` 继承父类。`super` 传递向父类传递参数。



# 15. 类数组

​		函数中传递的参数 `argument` 是类数组。

​	因为类数组不能调用数组的方法，但是类数组有 `length`、`callee` 属性



## 15.2 将类数组转换为数组

1. `Array.prototype.slice.call()`

   ​	调用数组方法通过 `slice` 函数来创建类数组元素为数组。但是因为类数组不是数组不能调用数组的函数，所以只能通过数组原型上的方法再改变 this 指向为类数组就可以使用了。

   

2. Array.from()

3. ES6 展开运算符： [...arguments]

4. `Array.prototype.concat.apply`

   ​	apply 可以把传递的参数展开，然后再通过数组原型的 `concat` 方法将参数再连接成数组。

   

5. for循环将类数组的元素放入新数组中



# 16. new实现机制

1. 创建一个临时空对象并绑定原型
2. 更改构造函数的this指向为临时对象，并传入参数执行构造函数。
3. 判断构造函数返回结果是否是引用对象



# 17. 事件循环（Event Loop）

​	在 JS 中，大部分的任务都是在主线程上执行的，常见的包括：

* 渲染事件（解析DOM、计算布局、绘制等）
* 用户交互事件（鼠标点击、滚动页面、放大缩小等）
* JavaScript 脚本执行事件
* 网络请求、文件读写完成事件等



​		为了协调这些任务在主线程上有条不紊地执行，页面引入了**消息队列**和**事件循环机制**。渲染进程内部会维护多个消息队列，比如延迟执行队列和普通的消息队列。然后主线程采用一个 for 循环，不断地从这些任务队列中取出任务并执行任务。我们把这些消息队列中的任务称为宏任务。

​		宏任务可以满足我们大部分的日常需求。但是不能精确的控制执行时间的间隔，因为宏任务的时间粒度比较大。所以


