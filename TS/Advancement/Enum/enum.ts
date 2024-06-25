// 枚举类型

/* 
枚举成员默认会被赋值为从0开始递增的数字
enum Days { Sun, Mon, Tue, Wed, Thu, Fri, Sat};
 */
// 也可以手动给枚举项赋值
enum  Days { Sun = 6, Mon = 0, Tue, Wed, Thu, Fri, Sat};


console.log(Days[0]); // Sun
console.log(Days[1]); // Mon
console.log(Days[2]); // Tue
console.log(Days[3]); // Wed
console.log(Days[4]); // Thu
console.log(Days[5]); // Fri
console.log(Days[6]); // Sat

// 同时枚举值也可以反向映射到枚举名
console.log(Days["Sun"]); // 0
console.log(Days["Mon"]); // 1
console.log(Days["Tue"]); // 2
console.log(Days["Wed"]); // 3
console.log(Days["Thu"]); // 4
console.log(Days["Fri"]); // 5
console.log(Days["Sat"]); // 6

// 枚举项 Blue 的值是计算所得项
enum Color {Red, Green, Blue = "blue".length};
// 含有值为字符串的枚举项不能于计算项共存，会报错
// enum myColor { Red = 'er', Green = 'sdfg', Blue = "blue".length};
// 计算项不能放在未手动赋值的枚举项前，会报错
// enum yourColor {Blue = "blue".length, Red, Green};
// 计算项后面可以跟手动赋值的枚举项
enum myColor {Blue = "blue".length, Red = 2, Green = 3};

// 常数项
const enum Directions {
    Up,
    Down,
    Left,
    Right
};
let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
