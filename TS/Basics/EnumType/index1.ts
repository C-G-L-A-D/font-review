enum PHONE {
  HUAWEI = 'android',
  XIAOMI = 'android',
  SAMSUNG = 'android',
  IPHONE = 'ios',
  // HONOR, 报错，上一个成员手动赋值了，但是不是数值类型，则后续的成员必须手动赋值
  VIVO = 9.2,
  OPPO // 10.2 , 上一个成员是数值型，则后续的成员无需赋值也可以。
}

console.log(PHONE.OPPO) // 10.2
