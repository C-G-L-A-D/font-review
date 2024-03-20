// 布尔类型
let isDone : boolean = false;

// 因为 new Boolean() 创造的是 Boolean包装类型， 而不是 boolean值
// let createdByNewBoolean: boolean = new Boolean(1); 编译报错

// 规定 createdByNewBoolean 为 Boolean包装类类型，所以不报错
let createdByNewBoolean: Boolean = new Boolean(1);

let createByBoolean : boolean = Boolean(1);