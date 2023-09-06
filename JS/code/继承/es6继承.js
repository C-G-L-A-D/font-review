class Parent {
    constructor() {
        this.name = 'adf'
    }
    say() {
        console.log(this.name + 'say')
    }
}

class Child extends Parent {
    constructor() {
        super()
    }
}