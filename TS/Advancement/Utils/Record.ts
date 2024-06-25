// 用法：Record<Keys, Type> ，Keys 必须兼容 string | number | symbol

type AAAA = Record<'a', string>
const aaaa: AAAA = {
    a: 'address'
}

// Keys 也可以是联合类型，会依次走展开为多个键
type BB = 'bread' | 'butter'
type BBBB = Record<BB, string>
const bbbb: BBBB = {
    bread: 'fasdf',
    butter: 'dsfgggg'
}

// Type 也可以是联合类型，表示键值都是该联合类型的子集
type CC = string | number
type CCCC = Record<'a', CC>
const cccc: CCCC = {
    a: 'address'
}
const cc: CCCC = {
    a: 10
}

// 实现 Record
type MyRecord<Keys extends string | number | symbol, Type> = {
    [Key in Keys]: Type
}