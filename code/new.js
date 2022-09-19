function newOperator(Constructor, ...args) {
    if(typeof Constructor !== 'function') {
        throw 'newOperator function the first param must be a function'
    }

    // 1. 根据构造函数创建一个临时对象
    let obj = Object.create(Constructor.prototype)

    // 2. 传递参数，改变指向执行构造函数。
    let res = Constructor.apply(obj, args)

    let isObject = typeof res === 'object' && res != null
    let isFunction = typeof res === 'function'

    return isObject || isFunction ? res : obj
}