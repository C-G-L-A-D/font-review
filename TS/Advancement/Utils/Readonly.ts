type User2 = {
    name: string,
    age: number,
    email: string
}
const Jack: User2 = {
    name: 'Jack',
    age: 30,
    email: 'jack@example.com'
}
console.log(Jack.age)
Jack.age = 18 // 正常的 User2 类型，可以修改属性
console.log(Jack.age)


// Readonly 将传入的 User2 类型的所有属性都转换为只读类型
type ReadonlyUser = Readonly<User2>
const readonlyUser: ReadonlyUser = {
    name: 'Jack',
    age: 30,
    email: 'jack@example.com'
}
// readonlyUser.age = 20 // 报错， readonlyUser中的属性都是只读的

// 实现 Readonly，+readonly 可以简化为 readonly
type MyReadonly1<T> = {
    +readonly [P in keyof T]: T[P]
  // 等同与 readonly [P in keyof T]: T[P]
}