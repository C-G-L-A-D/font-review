type U = 'a' | 'b' | 'c' | 'age'

/**
 * 等价于
 * type Foo = {
 *     a: number,
 *     b: number,
 *     c: number,
 *     age: number
 * }
 */
type Foo = {
    [Prop in U]: number
}

const myFoo: Foo = {
    a: 1,
    b: 2,
    c: 3,
    age: 20
}