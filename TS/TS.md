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



# 2. TypeScript 基础

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

