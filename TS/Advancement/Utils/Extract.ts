type AnimalProps = 'name' | 'age' | 'kind' | 'color' | 'food'

type CatProps = 'name' | 'kind' | 'color'

type ExtractProps = Extract<AnimalProps, CatProps>

let props: ExtractProps = 'name'
props = 'color'
props = 'kind'


/**
 * 如果 T 兼容 U，直接返回 T 兼容的类型；
 * 反之，就返回 never 类型， never 类型在联合类型中会被消除掉，因此相当于剔除了差集；
 * 
 * @param T - 原始联合类型
 * @param U - 用于比较和保留的类型
 * @returns 返回 T 与 U 的交集
 */
type MyExtract<T, U> = T extends U ? T : never