function Parent(name) {
    this.name = name
}

Parent.prototype.say = function () {
    console.log(this.name + "hello")
}

function Child(name) {
    Parent.apply(this, arguments)
}

// 核心代码
//    es6版本
Child.prototype = Object.create(Parent.prototype)

/*
    等同于（es5写法，构建临时的父类对象）
    let TempFunction = function () {}
    TempFunction.prototype = Parent.prototype
    Child.prototype = new TempFunction()
*/
// 核心代码

Child.prototype.constructor = Child

/**
 * 核心：
 *      通过创建父类原型的副本，并将其赋值给子类原型
 * 
 * 优点：
 *      解决了将组合式继承重复执行父类构造函数的问题
 * 
 */