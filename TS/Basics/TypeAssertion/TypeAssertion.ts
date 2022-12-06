// 类型断言

// 需要访问联合类型变量中不共有的属性或方法时可以使用类型断言
function getInfo(item: number | string) : any[] {
    /* 
        不是共有属性，直接访问会报错
        return item.length;
    */
    // 将 item 断言为 string 类型时就可以访问 length属性
    return (item as string).split('');
}

// 传入的数值类型没有 split 方法，但使用类型断言后编译不会报错，但编译成 js 文件运行时会报错
// console.log(getInfo(234)); // 编译不报错，运行报错


// 需要区分访问的属性或调用的方法是否是子类才有的
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

/* 
临时添加某个属性时，any类型可以访问任意属性和方法
因为 window 上并不存在 foo 属性，因此访问时编译会错
window.foo = 1;
 */
// (window as any).foo = 1; // node 环境中没有window

// 将 any 类型断言为一个具体的类型时
function getCacheData(key: string) : any {
    // 此时用于接收返回值的变量就必须要定义为 any 类型，这样下去可能导致产生更多的 any 类型变量。
    return (window as any).cache[key];
}

interface Cat {
    name: string;
    run(): void;
}

// 通过类型断言接收指定类型的数据
const jesse = getCacheData('jesse') as Cat;
jesse.run();

interface Animal {
    name: string;
}

interface Cat {
    name: string;
    run(): void;
}

interface House {
    place: string;
}

let jerry: Cat = {
    name: "jerry",
    run: () => { console.log('run') }
}
// 兼容，相当于 Cat类型继承了 Animal 类型，可相互断言
let animal: Animal = jerry;
/* 
House 和 Cat 类型不兼容，不能相互断言
let house: House = jerry;
 */

// 但可以使用双重断言，使 jerry 赋值给 house
// 但这样运行时大概率会产生错误，应尽量避免使用
let house: House = (jerry as any as House);
console.log(house.place)