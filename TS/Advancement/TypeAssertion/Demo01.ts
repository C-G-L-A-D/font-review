type T  = 'a' | 'b' | 'c'

let foo = 'a'

// let bar: T = foo // 报错，此时 foo 的类型是 string，因此 foo 不能直接复制给 T 类型的变量

// 可以使用类型断言，只有当 foo 的值是 'a' | 'b' | 'c' 时，才能复制给 T 类型的变量
// 语法一：<类型>值
let char = <T>foo

// 语法二：值 as 类型
let bar: T = foo as T
