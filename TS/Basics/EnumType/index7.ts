enum Days1 {
    Thursday = 4,
    Friday = 4,
    Saturday = 6,
    Sunday = 7,
    Data = 'dfsf'
}

console.log(Days1[4]) // Friday

console.log(Days1[8]) // undefined

// console.log(Days1['dfsf']) // 报错，只有 number 型的值才能反向映射名称