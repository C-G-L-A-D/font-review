type User = {
    name: string,
    age: number,
    email: string
}
// 正常对象类型，如果没有标记可选，则都是必选
const John: User = {
    name: 'John',
    age: 30,
    email: 'john@example.com'
}

// 使用 Partial 转换的对象类型，所有属性都可选
type PartialUser = Partial<User>
const partialUser : PartialUser = {
    name: 'John',
    age: 30
}

type MyPartial<T> = {
    // +? 代表该属性变成可选属性
    [key in keyof T]+? : T[key]
}