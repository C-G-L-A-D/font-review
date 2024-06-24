enum Colors {
  GREEN, // 1. 默认值为 0
  RED, // 默认值为 1
  BLUE, // 默认值为 2
  YELLOW, // 默认值为 3
  // ...成员 默认值为 index
  ORANGE = 'orange', // 2. 手动赋值
  PURPLE = 'purple',
  GRAY = '#e3e3e3'
  // WHITE = 7n // 6. 报错，不能是 bigInt 类型
}

/**
 * 7. 编译过后，枚举类型转换为 js 对象
 * let Colors = {
 *  Red: 0,
 *  Green: 1,
 *  Blue: 2
 * }
 */

// 3. 接收值可以是 Colors 类型（更推荐），也可以是 number 类型
const color1: Colors = Colors.GREEN
const color2: number = Colors.RED

// Colors.YELLOW = 'yellow' // 4. 报错

const color4 = Colors['BLUE'] // 5. 也可以使用该用法来获取枚举类型成员值
