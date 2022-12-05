// 任意值类型
let myFavoriteNumber : any = 'seven';

// 任意值类型在赋值过程中可以更改数据类型
myFavoriteNumber = 7;

// 在任意值上可以访问任何属性
let anyObj : any = 'hello';
console.log(anyObj.myName); // undefined

// 可以调用任何方法，ts编译不会报错，
// 但是因为没有定义该方法，所以js运行报错
console.log(anyObj.sayHello());

/**
 * 编译报错
 * let hello;
 * hello = 'hello';
 * 等价于 let hello : any = 'hello';
 */

