// 数组类型

// 数值类型的数组
let fibonacci : number[] = [1, 1, 2, 3, 5];
// fibonacci.push('1'); 报错，不能传入类型不同


// 数组泛型
let days : Array<number> = [1, 2, 3, 4, 5, 6, 7];

interface NumberArray {
    [index : number]: number;
};

// 索引类型是数字，值也是数字，通常用来表示类数组
let scores : NumberArray = [98.5, 100, 64.5];

function sum() {
    // 因为 arguments 是类数组，赋值给数组类型会报错
    // let args : number[] = arguments;

    let args : {
        [index : number] : number;
        length : number;
        callee : Function;
    } = arguments;

    // IArguments 是TS定义好的接口类型
    let newArgs : IArguments = arguments;
}

let list : any[] = ['hello World', 1, { host: '127.0.0.1'}];