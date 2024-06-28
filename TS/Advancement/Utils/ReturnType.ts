type multType = (x: number, y: number) => number;

type multReturn = ReturnType<multType>


const Multiplication = (x: number, y: number) => x * y;

// 根据指定的函数类型获取函数返回值
const result1: multReturn = Multiplication(2, 5)

// 根据函数获取函数返回值
const result2: ReturnType<typeof Multiplication> = Multiplication(3, 5)

console.log(result1, result2)

/**
 * (...args: any) => any 表示函数类型
 * T 是 函数类型
 * infer 用于隐式类型推断， infer R 表示获取 R 的类型，这里的 R 就是函数的返回值类型
 */
type myReturnType<T extends (...args: any) => any> =
    T extends (...args: any) => infer R ? R : any 