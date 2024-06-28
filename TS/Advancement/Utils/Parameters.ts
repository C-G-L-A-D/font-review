type AddType = (x: number, y: number) => number

type AddProps = Parameters<AddType>
const addParams: AddProps = [1, 2]

const Sub = (x: number, y: number) => x - y
type SubProps = Parameters<typeof Sub>
const subParams: SubProps = [2, 1]

/**
 * (...args: any) => any 表示函数类型
 * T 是 函数类型
 * infer 用于隐式类型推断， infer Args 表示获取 Args 的类型，这里的 Args 就是函数的所有参数类型
 */
type MyParameters<T extends (...args: any) => any> =
    T extends (...args: infer Args) => any ? Args : any