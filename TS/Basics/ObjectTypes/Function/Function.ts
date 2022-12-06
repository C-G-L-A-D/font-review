// 对象类型 —— 函数

// 函数声明
function sum(x: number, y : number) : number {
    return x + y;
}

sum(1, 2);
// 输入的参数个数不能多也不能少
// sum(1, 2, 3);
// sum(1);

// 函数表达式， mySum 的类型是通过类型推论判断出来的
let mySum = function (x: number, y:number) : number {
    return x + y;
}

// 手动给函数表达式等号左边的变量进行类型定义如下
// 需要给传入的参数和返回的值进行类型定义，其中 => 与 es6的 => 不同，在这里用于函数定义
let mySay: (name: string, sentence: string) => string;
mySay = function (name: string, sentence: string) : string {
    return `${name} say: '${sentence}.'`;
}

// 使用接口定义函数形状
interface SearchFunc {
    (source: string, subString: string) : boolean;
}

let mySearch : SearchFunc;
mySearch = function (source: string, subString: string) : boolean {
    return source.search(subString) !== -1;
}

// 可选参数
function bulidName(firstName: string, lastName?: string) {
    if(lastName) {
        return firstName + " " + lastName;
    } else {
        return firstName;
    }
};

let tomcat = bulidName('Tom', 'Cat');
let jack = bulidName('Jack');

// 可选类型后面不能定义必须参数
/* function myEat(name?: string, food: string) : string {
    return name + " eats " + food;
} */

// 设置参数默认值，会被识别为可选参数，此时的可选参数后面可以跟必须参数
function myFavorBook(book: string = "计算机网络", price: number) : string {
    return `My favourie book is ${book}. The book's price is ￥${price}.`;
}

// 接收剩余参数
function push(array: any[], ...items: any[]) {
    items.forEach(function(item: any) {
        array.push(item);
    })
};

let a: any[] = [];
push(a, 1, 2, 3);

// 重载
// 表达不够精确
function reverse(x: number | string): number | string | void {
    if(typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
    // 因为两种条件都不符合没有返回值，所以还需要定义 void 的返回值类型
}

// 可以重复多次进行函数定义，最后在进行函数实现
function reverse1(x: number) : number;
function reverse1(x: string) : string;
// 此时最后的函数定义有包含关系，需要将精确的函数定义放在前面。
function reverse1(x: number | string): number | string | void {
    if(typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
};
