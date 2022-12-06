// 对象类型-接口

interface Person {
    name: string;
    age: number;
    // 可读属性
    weight ?: number;
    // 任意属性，规定了任意属性的属性名为 string 类型，值为any类型
    // 任意属性的值类型限制了整个接口的属性值都为该类型的
    // [propName : number] : number 报错，name属性值为string类型
    [propName : string] : any;
    // 只读属性
    readonly id: string;
}

let tom : Person = {
    name: 'Tom',
    age: 23,
    // 首次定义对象时才能赋值，之后只能读取
    id: '342',
    // 可有可无
    weight: 200,
    // 任意值类型
    height: '23m'
};
