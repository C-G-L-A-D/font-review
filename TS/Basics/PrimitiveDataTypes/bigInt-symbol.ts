// es6新增原始类型，所以必须设置兼容的版本，否则会报错

// bigInt 类型，必须指定版本为 es2020及以上
let big : bigint = 100n;

// symbol，需指定版本为 es2015及以上。
let sym : symbol = Symbol(0);