function Parent(name) {
    this.name = name
}

Parent.prototype.say = function () {
    console.log(this.name + "hello")
}

function Child(name) {
    /**
     * 第二次调用父类构造函数，因为只有创建子类实例对象时才会触发
     * 借用父类构造函数进行继承，可以将子类原型上父类的属性进行覆盖
     * 因此不会收到共享属性的影响。并且因为构造函数中没有定义方法，
     * 所以子类的实例对象实际上可以共享同一个父类方法。
     */
    Parent.apply(this, arguments)
}

// 第一次调用父类构造函数，原型链继承会使子类的实例对象共享父类引用类型的属性
Child.prototype = new Parent()
Child.prototype.constructor = Child

/**
 * 优点：
 *     解决了原型链继承和盗用构造函数继承的问题
 * 
 * 缺点：
 *     会执行两次父类的构造函数。
 * 
 */