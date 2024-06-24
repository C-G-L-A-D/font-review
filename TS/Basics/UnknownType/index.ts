let data: unknown = 'hello'

/** 任何类型的值都能分配给 unknown 类型 **/
data = {
  name: 'Mike',
  age: 30,
  isMarried: true,
  hobbies: ['coding', 'reading', 'gaming']
}

/** unknown 类型的变量不能直接使用 **/

// 1. unknown 类型的变量不能赋值给别的类型（除 unknown 类型 和 any 类型外）
// const name: string = data // 报错

const anyone: any = data
const what: unknown = data

// 2. unknown 类型的变量不能访问其属性
// console.log(data.name) // 报错

// 3. unknown 类型的变量不能调用其方法
data = () => {
  console.log('调用 unknown 类型变量的方法')
}
// data() // 报错
