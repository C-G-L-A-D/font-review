// 所有属性都可选
type User1 = {
    name?: string,
    age?: number,
    email?: string
}

const Mark: User1 = {
    // User1 类型所有属性都可选
}

// 使用 Required 工具类转换 User1 类型后，新类型的所有属性都必选
type RequiredUser1 = Required<User1>
const requiredUser: RequiredUser1 = {
    name: 'Mark',
    age: 10,
    email: 'mark@gmail.com'
}

// 实现 Required 工具类
type MyRequired<T> = {
    // - ? 代表删除可选属性
    [key in keyof T] - ?: T[key]
}