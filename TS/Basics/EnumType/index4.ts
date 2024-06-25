const enum Nums {
    First= 2,
    Second,
    Third,
    Fourth
}

/*
  报错，只能与相同结构的枚举合并
  enum Nums {
   Fifth,
   Sixth
  }
 */

/* 
   加上 const 关键字后，编译为js，不会生成对应的js对象，
   同时访问枚举成员，会把枚举成员变量替换为枚举值
   
   enum Nums {
    First,
    Second,
    Third,
    Fourth
   }
   
   // 不加上 const 关键字的枚举变量编译为js文件后，还是 console.log(Nums.First)
   console.log(Nums.First)
   
   // 加上 const 关键字的枚举变量编译为js文件后，转换为 console.log(0)
   console.log(Nums.First)
  */



