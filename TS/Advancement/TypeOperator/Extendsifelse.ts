type isNum = 1 extends number ? true : false

interface Animal {
    live(): void;
}
interface Fish extends Animal {
    swim(): void;
}

// number
type T1 = Fish extends Animal ? number : string;

// string
type T2 = RegExp extends Animal ? number : string;