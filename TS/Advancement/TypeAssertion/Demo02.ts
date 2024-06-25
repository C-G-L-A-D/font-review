type P = {
    x: number,
    y: number
}

// 对象类型有严格的字面量检查，如果存在额外的属性会报错
// const p1: {x: number} = {x: 0, y:32} // 因为比 {x: number} 类型多出 y 属性，所以会报错。

// 存在类型断言，则没有严格字面量检查
const p2: {x: number} = {x: 0, y: 3} as P; // 可以将值断言为 P 类型，从而绕过检查。

// 将 值 断言为 { x:number } 类型
const p3: { x:number } = {x: 0, y:3 } as {x: number}


