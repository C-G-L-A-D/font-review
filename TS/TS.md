# 1. 初识 TypeScript
## 1.1 什么是 TypeScript
​	`TypeScript` 是 `JavaScript` 的超集，扩展的 `JavaScript`。`TS` 与 `JS` 就相当于 `Less/Sass` 和 `CSS` 之间的关系。



## 1.2 TypeScript 的特点
- 支持最新的 `JavaScript` 特性；
- 支持代码静态检查；
- 支持其他强语言的特性，如：枚举、泛型、类型转换、命名空间、声明文件、类、接口等。



## 1.3 安装 TypeScript

```js
npm install typescript -g
```



## 1.4 编译 TypeScript

​	在node环境中不能直接运行 ts 文件，必须将其编译成 js 文件后运行。

```js
tsc xxx.ts
```



## 1.5 编译并运行 TypeScript

​	由于每次编写完 ts 文件都需要像将其编译为 js 文件后才能运行，比较麻烦。所以可以安装 `ts-node` 插件，帮助我们编译运行 ts 文件一步到位。

​	安装 `ts-node`：`npm install -g ts-node`

​	编译并运行ts文件：`ts-node xxx.ts`



## 1.6 tsconfig.json

​	当一个目录下存在 `tsconfig.json` , 那么这意味至该目录 TypeScript 项目的根目录。在 `tsconfig.json` 文件中，我们可以配置编译该项目的一些相关选项。

​	那如何生成  `tsconfig.json` 呢？我们可以手动添加该文件并填写相关配置项。也可以通过 `tsc --init` 命令自动生成该文件和默认的配置。

​	例如：当我们编译 ts 文件时，即使有产生报错，还是会默认生成 js 文件。如果我们想编译报错时不生成对应的 js 文件，我们可以在 `tsconfig.json` 中进行相关配置。除此之外，还可以在 `tsconfig.json` 中配置其他。



* `"strictNullChecks": true` ： 指定只能将 `null` 和 `undefined` 赋值给 `void` 类型和他们各自对应的类型。



# 2. TypeScript 基础（默认严格模式下）

## 2.1 原始数据类型（Primitive Data Types）

​	对应 JavaScript 的 7 中原始数据类型，TypeScript 也能定义对应的数据类型。

```ts
let isDone: boolean = false; // 布尔类型
let decLiteral : number = 6; // 数值类型
let myName : string = 'tom' // 字符串类型
let u : undefined = undefined; // undefined 类型
let n : null = null; // null 类型
let big : bigint = 100n; // bigInt 类型
let sym : symbol = Symbol("hello"); // symbol类型
```



​	与 JavaScript 不同的是 TypeScript 新增了 空值（Void） 类型，其值只能是 `undefined` 和 `null` 两种，可以用于表示没有任何返回值的函数。

```ts
let unusable : void = undefined;

// 如果配置了"strictNullChecks":true会报错
let isNull : void = null;

// 表示该函数没有返回值
function alertName() : void {
    alert('My name is tom.')
}
```

> 注：
>
> 1. 默认情况下，所有类型的值可以是 null 或 undefined；
>
> 2. 原始数据类型赋值时，不能更改该变量的数据类型；
>
> 3. 与 JS 的原始数据类型相同，TS 的原始对应类型的包装类，因此定义时不能混用，会报错。例如：
>
>    ​    let age : number = new Number(18); 
>
>    ​    此时产生的是 Number 对象类型的对象，而变量 age 的类型是原始数据类型 number。将对象类型的数据赋值给原始数据类型，必然会报错。
>
>    ​	正确的定义：
>
>    ​    	let age : Number = new Number(18); 
>
>    ​	或
>
>    ​    	let age : number = Number(18); 
>
>    ​    	不使用 new 关键字来创建对象，Number() 返回的就是个原始数据类型。
>
>    ​	或
>
>    ​    	let age : number = 18; 



## 2.2 任意值类型（Any Type）

​	任意值的数据类型是 `any` ，意思是 `any` 类型的变量可以是任意类型的数据，但不同的是， `any` 类型的变量在赋值的过程中可以更改其数据类型，并且可以访问该变量的任何属性和调用该变量的任何方法。

​	如果变量在声明时，没有指定数据类型并且也没有赋值，则会被识别为任意值类型。

```typescript
let myAge : any = 29; // 显然 myAge 是数值类型的数据
myAge = 'twenty-nine'; // myAge 可以更改为字符串类型的数据。
// 如果 myAge 是用 number 类型来定义的，重新赋值时不可以更改其数据类型，会报错。

// 可以访问任意值类型变量的所有属性，即使没有定义该属性，都不会报错。
console.log(myAge.year) // undefined;

// 可以调用任意值类型变量的所有方法，即使没有定义该方法，也不会报错。但是运行时试运行编译后的js文件，因此运行时会报错。
console.log(myAge.say()) // 运行报错，编译不报错。

let word // 编译会报错
word = '你好！';
// 等价于 let word : any = '你好！';
```



## 2.3 类型推论（Type Inference）

​	如果在定义变量时，没有明确的指定类型，TS 会按照类型推论的规则推断该变量的类型。但是在没有明确指定的类型且进行赋值时，编译会报错。

```typescript
// 没有指明数据类型，会报错。
let myFavoriteNumber = 'seven';

// 但是根据类型推论，等价于 let myFavoriteNumber : string = 'seven';

// 没有指明数据类型，也没进行赋值，也会报错，但会认为是any类型。
let word // 编译会报错
word = '你好！';
// 等价于 let word : any = '你好！';
```



## 2.4 联合类型（Union Types）

​	定义变量时可以设置多个数据类型，在使用该变量时，会通过类型推论规则确定该变量此时的数据类型。在之后联合类型的变量可以更改赋值为指定的数据类型，但是不能设置为除指定的数据类型的其他类型。

​	如果要确认联合类型的变量当前为什么数据类型，可以通过设置的所有类型里共有的属性和方法进行判断。如果访问的属性或调用的方法不是共有，则编译报错。

```typescript
// 用 | 分隔数据类型，表示 currentYear 可以为string 或者 number类型
let currentYear : string | number = 2022; // 类型推论判断为 number

// 此时 currentYear 类型推论判断为 string 类型
currentYear = '二零二二年'; 

// 报错，不能设置为 string 和 number外的数据类型
currentYear = Symbol(2022); // 报错

function getString(something: string | number) : string {
    // number 类型没有 length 属性，因此访问该属性会报错
    console.log(something.length); // 报错
    
    // string 和 number 类型都拥有toString()方法，不会报错
    return something.toString();
}
```



## 2.5 对象类型 —— 接口（interface）

​	接口可以对对象描述进行限定。通过 `interface` 关键字定义接口对象。默认情况下，继承的对象只能够拥有接口定义指定属性，不能多，也不能少。但是可以定义可选属性、任意属性和只读属性。可选属性允许定义继承该接口的对象时是否为该属性赋值。任意属性允许对象新增指定类型的属性，但同时限制了对象中其他属性的数据类型只能是任意属性数据类型的子集。只读属性需要在接口定义属性前加上 `readonly` 关键字表示只读。只读属性只能在首次定义对象时为属性赋值，之后就只能读取。

```typescript
Interface Person {
    name : string;
    // 可选属性，可选是否赋值
    age ?: number;
    // 任意属性，规定了所有属性的值只能是 string 和 number
    [propName : string] : string | number;
    // 只读属性，只能首次定义对象时进行赋值。
    readonly height : number;
}

let tom : Person = {
    name: 'Tom',
    // age: 28;
    age: false, // 报错
    weight: 200,
    height: 180
}

tom.age = 28;
tom.height = 32; // 报错
console.log(tom.height) // 180
```



## 2.6 对象类型 —— 数组（Array）

​	TypeScript 定义数组也可以指定数组的类型，数组中存在其他类型的数据会报错。同时在调用数组的一些方法时，传入的参数也会根据数组类型进行限定。例如：

```typescript
let strs : string[] = ["hello", "this", "close"];
strs.push(1) // 报错，因为传入参数为数值类型，不允许加入到字符串数组中。
```

​	同时，还可以创建数组泛型：

```typescript
let fibonacci : Array<number> = [1, 1, 2, 3, 5];
```

​	也可以用接口来表示数组，但这通常用于描述类数组，而 TS 也有已经定义好的类数组接口类型， 如 `IArguments` 、 `NodeList` 、 `HTMLCollection` ：

``` typescript
interface NumberArray {
    [index : number] : number;
};
let fibonacci : NumberArray = [1, 1, 2, 3, 5];

function sum() {
    let args : IArguments = arguments;
}

// TS 中定义的 IArguments 接口如下
interface IArguments {
    [index : number] : any; // 允许数组元素出现任意类型
    length : number;
    callee : Function;
}
```

​	当我们需要定义数组元素的类型不唯一时，我们可以将数组定义为 `any[]` 类型。



## 2.7 对象类型 —— 函数（Function）

* **函数类型定义**

  在 JavaScript 中定义函数有两种方式：**函数声明** 和 **函数表达式** 。但不论是那种方式都需要在 TypeScript 中对输入、输出进行约束。

  函数声明的类型定义：

```typescript
function sum(x: number, y: number) : number {
    return x + y;
}
```

​			函数表达式的类型定义（在 TS 函数定义时的 => 与 ES6的 => 不同）：

```typescript
// 此时的 => 表示函数定义, => 左边是参数的类型定义，右边是返回值的类型定义
let sum: (x: number, y: number) => number;
sum = function(x: number, y: number) : number {
    return x + y;
}
/*
等价于
let sum: (x: number, y: number) => number = function(x: number, y: number) : number {
    return x + y;
}
*/
```

​			但不论是哪种方式声明定义函数，在默认情况下调用函数时，传入的参数个数必须于定义的参数是个数一致，否则会报错。

```typescript
function sum(x: number, y: number) : number {
    return x + y;
};
sum(1); // 报错
sum(1, 2, 3); // 报错
```



* **可选参数、参数默认值**

  当函数的参数有可选参数时，传入的参数个数就不需要与定义时的一致。设置可选参数的方式和设置可选属性的方式一致，在类型定义 `:` 前加上 `?` 即可。不过需要注意的是，一般情况下，可选参数必须定义在所有必须参数之后。

  我们也可以为函数的参数设置默认值，此时， TypeScript 会默认将设置默认值的参数识别为可选参数。但是设置了默认值的参数后面是可以跟必须参数的。

```typescript
// lastName 为可选参数
function buildName1(firstName: string, lastName?: string) : string {
	return firstName + ' ' + lastName;
};

buildName1('Luo');

// 错误，此时的可选参数后面不能跟必须参数
function buildNameError(firstName?: string, lastName: string) : string {
	return firstName + ' ' + lastName;
};

function buildName2(firstName: string = 'Luo', lastName: string) : string {
	return firstName + ' ' + lastName;
}

buildName2(undefined, 'hhh');
```

​	

* **剩余参数**

  当不确定参数个数时，我们可以使用 ES6 的 `...rest` 方式获取函数中的剩余参数：

```typescript
function push(array: any[], ...items: any[]) : void {
    items.forEach(function(item: any) {
        array.push(item)
    });
};
let a: any[] : [];
push(a, 1, 2, 3)
```



* **函数重载**

  在 TypeScript 中允许函数进行重载从而做出不同的处理。即允许函数接收不同数量或类型的参数。

  可以通过联合类型的参数来进行函数重载，但这样不能够精确表达重载的不同情况；因此，我们可以通过重复多次定义函数，在最后一次的函数定义后再进行函数实现来进行准精确的表达。不过需要注意，如果函数定义中有包含关系，需要优先把精确的定义写在最前面。

``` typescript
function reverse(x: number) : number;
function reverse(x: string) : string;
function reverse(x: number | string): number | string | void {
    if(typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
    // 剩余情况不返回，所以返回值为空，还需要定义返回值为 void 类型
}
```



## 2.8 类型断言（Type Assertion）

### 1. 介绍	

​	**类型断言** 可以用来手动指定一个值的类型。

​	**有两种语法方式来使用类型断言**：`值 as 类型` 和 `<类型>值` 。但在 `tsx` 语法中只必须使用前者，并且后者也可能表示的是泛型，会产生歧义。所有使用类型断言时，最好使用 `值 as 类型` 的语法。



### 2. 类型断言常见的用途有：

* 确定联合类型的变量为指定类型时，在进行操作。从而避免了访问到联合类型变量的不共有属性或方法；

```typescript
function getInfo(item: number | string) : any[] {
    /* 
        不是共有方法，直接调用会报错
        return item.split;
    */
    // 将 item 断言为 string 类型时编译就不会报错
    return (item as string).split('');
}

// 传入的数值类型没有 split 方法，在编译成 js 文件运行时会报错
console.log(getInfo(234));
```



* 需要区分访问的属性或调用的方法是否是子类才有时，可以使用断言。但通常是对接口的实例对象进行使用，因为具体的类可以用 `instanceof` 进行判断。

```typescript
interface ApiError extends Error {
    code: number;
}

interface HttpError extends Error {
    statusCode: number;
}

function isApiError(error: Error) {
    /* 
    Error 数据类型中没有 code 属性，直接访问会报错
    不能用 instance 来判断 error 是否是 接口的实例对象，
      因为 interface 接口在编译后会被删除，所以运行时会报错。
      因此像判断此时只能用类型断言来进行判断是否有code属性存在
     */
    if(typeof (error as ApiError).code === 'number') {
        return true;
    }

    return false;
}
```



* 将任何一个类型断言为 `any` 时，可以访问这个变量上的所有属性和方法。但滥用 `as any`  极有可能掩盖真正的类型错误。因此通常用在临时添加某个属性时：

```typescript
window.foo = 1; // 报错，因为window对象没有foo属性

(window as any).foo = 1;
```



* 将 any 类型断言为一个具体的类型时

```typescript
function getCacheData(key: string) : any {
    // 此时用于接收返回值的变量就必须要定义为 any 类型，这样下去可能导致产生更多的 any 类型变量。
    return (window as any).cache[key];
}

interface Cat {
    name: string;
    run(): void;
}

const tom = getCacheData('tom') as Cat;
tom.run();
```



​	但并不是任意类型都可以断言为另一个类型。要使用断言，必须是一个类型兼容另一个类型，那么这两种类型可以相互断言为对方。

```typescript
interface Animal {
    name: string;
}

interface House {
    place: string;
}

interface Cat {
    name: string;
    run(): void;
}

let jerry: Cat = {
    name: "jerry",
    run: () => { console.log('run') }
}

// 兼容，可以断言。相当于 Cat extends Animal
let animal: Animal = jerry;
// 不兼容，报错，Cat 接口中没有 place 属性。不可以断言
let house: House = jerry;
```



### 3. 双重断言

* 任何类型都可以被断言为 any；
* any 可以被断言为任何类型；

如果将以上两点进行结合，那么我们可以通过**双重断言将一个类型断言为任意一个类型**。

```typescript
interface Cat {
    run(): void;
}
interface Fish {
    swim(): void;
}
// Cat 和 Fish 不可相互断言
function testCat(cat: Cat) {
    // 但是将 Cat 类型断言为 any 类型后，就可以再断言为 Fish 类型
    return (cat as any as Fish);
}
```

​	**但这样，大多数情况会导致运行错误，是所以应该尽量避免使用双重断言。**



### 4. 类型断言 和 类型转换

​	类型断言只会影响 TypeScript 编译时的类型，与类型转换不同。再编译后，会将类型断言语句删除，因此访问到没有定义的变量会返回 `undefined` ，调用没有定义的方法时依旧会报错。而类型转换是实际影响到数据的类型。



### 5. 类型断言 和 类型声明

​	有点类似 Java 的多态。类型声明比类型断言更加严格。

​	当使用类型声明给变量指定 `any类型` 外的数据类型时，只能给这个变量赋值指定数据类型的数据，不能将不同类型的数据断言后赋值给该变量。

​	当没有使用类型定义或数据类型为 `any类型` 时，我们可以将兼容的类型，通过类型断言后赋值给另一个类型。

```typescript
interface Animal {
    name: string;
}
interface Cat {
    name: string;
    run(): void;
}

const animal: Animal = {
    name: 'tom'
};
// 通过类型推论判断 tom 的数据类型为 any，可以使用断言赋值为任意类型
let tom = animal as Cat; 
// 类型声明固定了 jerry 的数据类型为
let jerry: cat = animal as Cat;
```



### 6. 类型断言 和 泛型

> 等我学到泛型再补充



