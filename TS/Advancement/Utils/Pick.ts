type Teacher = {
    name: string,
    age: number,
    subject: string,
    phone: string,
    email: string
}

const Park: Teacher = {
    name: 'Park',
    age: 30,
    subject: 'Math',
    phone: '010-1234-5678',
    email: 'park@gmail.com'
}

type PickTeacher = Pick<Teacher, 'name' | 'subject' | 'phone'>;

const Kim: PickTeacher = {
    name: 'Kim',
    subject: 'chinese',
    phone: '010-1234-5678'
}


/**
 * 选择一个类型中的部分属性。
 * 
 * 使用泛型和索引签名来从一个给定的类型T中选择指定的属性，创建一个新的类型。
 * 这种类型操作符允许开发者从复杂的类型中提取所需的子集，这对于创建更通用的组件或函数非常有用。
 * 
 * @param T - 原始类型，从中选择属性。
 * @param K - 原始类型T中要选择的属性的键的类型，这些键必须是T的已知属性键。
 * @returns 返回一个新的类型，该类型包含从T中选择的属性。
 */
type MyPick<T, K extends keyof T> = {
    [key in K]: T[key]
}