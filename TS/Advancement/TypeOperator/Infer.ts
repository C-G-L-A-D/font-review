/**
 * 如果参数 T 是一个数组，那么就将该数组的成员类型推断为 U，即 U 是从T 推断出来的。
 * 如果 T 不是一个数组，那么就返回 T 自身。
 * 反之，如果 T 是一个数组，则返回数组元素的联合类型
 */
type Flatten<T> = T extends Array<infer U> ? U : T;

// Item 等价为 "sdf" | false | number
type Item = Flatten<['sdf', false, number]>

// Str 等价于 string 
type Str = Flatten<string[]>;

// Str 等价于 {a: number;} 
type Obj = Flatten<{ a: number }>;