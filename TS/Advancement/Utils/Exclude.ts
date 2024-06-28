type UserProps = 'name' | 'age' | 'email' | 'phone' | 'address'
type RequiredUserProps = 'name' | 'phone'

type OptionalUserProps = Exclude<UserProps, RequiredUserProps>

let optionalUserProps: OptionalUserProps = 'age'
optionalUserProps = 'address'
optionalUserProps = 'email'



/**
 * 如果 T 兼容 U，就返回 never 类型， never 类型在联合类型中会被消除掉，因此相当于剔除了交集；
 * 反之表示不存在交集，可直接返回 T 作为两个类型的差集
 * 
 * @param T - 要进行排除操作的联合类型
 * @param U - 用于比较和排除的类型
 * @returns 返回 T 与 U 的差集
 */
type MyExclude<T, U> = T extends U ? never : T