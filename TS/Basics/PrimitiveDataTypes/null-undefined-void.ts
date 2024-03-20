// null
let n : null = null;

// undefined
let u : undefined = undefined;

// void
function hello() : void {
    console.log('函数返回值为空')
}

// void 可指定值为 undefined
let unusable: void = undefined;

/**
 * 在 tsconfig.json 中指定了"strictNullChecks":true时，
 * 将 null 和 undefined 赋值给其他类型会报错，
 * 如果配置为false 则 null 和 undefined 可以赋值给其他类型
 */
 let word : void = null;
let str : string = undefined;
let age : number = null;
