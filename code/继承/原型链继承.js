function Parent() {
    this.age = 20
}

function Child() {
}

// 核心代码区
Child.prototype = new Parent()
Child.prototype.constructor = Child
// 核心代码区截至


/**
 * 核心：
 *   将子类原型对象设置为父类实例化对象来拿到父类的全部属性和方法,
 *   从而实现继承。
 *   但是直接进行赋值会覆盖子类，所以还需要将子类原型通过constructor属性指回子类构造函数。
 * 缺点：
 *   1. 因为子类实例对象拿到父类属性和方法都是通过同一个父类实例对象拿到的
 *      所以，共用了该父类实例对象的属性和方法，
 *      如果该父类实例对象中有引用类型属性，则所有子类实例对象都使用的是同一个地址的属性。
 *      一个修改，其他的也会影响到.
 *      即父类引用类型属性会被共用
 *   2. 创建子类实例对象时不能向父类传递参数。
 */