// type 关键字 可以用于类型别名和字符串字面量类型

// 一般类型别名常用于联合类型
type Name = string;
let dog: Name = '234';

type typeYear = string | number | void

let lastYear: typeYear = 2023;
lastYear = '2023';

// 字符串字面量类型就是约束变量只能从其中限定的字符串中取值
type EventNames = 'click' | 'blue' | 'mousemove'