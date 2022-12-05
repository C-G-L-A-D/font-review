// 联合类型

let currentYear : string | number = 2022;

currentYear = '二零二二年';

function getString(something: string | number) : string {
    // number 类型没有 length 属性，因此当传入参数为 number类型时报错
    console.log(something.length);
    
    // string 和 number 类型都拥有toString()方法，不会报错
    return something.toString();
}

getString('二零二二年') // 正常编译
getString(2022) // 编译报错