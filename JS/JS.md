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

# 2.1 typeof

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



# 2.2 intanceof

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



# 2.3 constructor

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



# 2.4 Object.prototype.toString.call()

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

