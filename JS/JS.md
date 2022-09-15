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



# 5. var、let 和 const

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