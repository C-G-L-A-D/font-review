type Student = {
    name: string,
    age: number,
    score: number,
    class: string,
    grade: string
}

const Pom: Student = {
    name: 'Pom',
    age: 20,
    score: 100,
    class: '一班',
    grade: '一年级'
}

type OmitStudent = Omit<Student, 'age' | 'score'>
const omitStudent: OmitStudent = {
    name: 'Pom',
    class: '一班',
    grade: '一年级'
}

/**
 * @param T - 原始对象的类型
 * @param K - 需要排除的属性键的类型集合，这些键属于 T
 * @returns 返回一个新对象类型，该类型包含 T 中所有不包含在 K 中的属性键及其对应值
 */
type MyOmit<T, K extends keyof T> = {
    [P in Exclude<keyof T, K>]: T[P]
}
