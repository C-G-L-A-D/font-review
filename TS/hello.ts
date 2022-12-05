function sayHello(person: string) {
    if(typeof person === 'string') {
        return 'Hello, ' + person;
    } else {
        // 当传入的参数不是 string 类型，运行时抛出错误
        throw new Error('person is not a string');
    }
}

let user = 'hello World';
/**
 * let user = [0, 1, 2]; 
 * 因为规定 sayHello 函数传入的参数为 string 类型，
 * 所以传入数组时编译会报错。
 * 如果没有进行相关配置，编译报错也会生成对应的 js 文件。
 */
console.log(sayHello(user));