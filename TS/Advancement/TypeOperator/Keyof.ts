type MyObjType = {
    name: string,
    age: number,
    address: string
}

// MyObjKeysType 等价于 "name" | "age" | "address"
type MyObjKeysType = keyof MyObjType;

let myObjKeys: MyObjKeysType = "name";
myObjKeys = "address"
myObjKeys = "age"

/**
 * 任何对象（包含属性）类型的键名的类型 等价于 string | number | symbol ，
 * 因为对象属性键名只能是 string | number | symbol 类型
 */
type KeysT = keyof any;

/**
 * 对象类型不包含属性（键名）时，等价于 never ，
 * 因为不存在键名，所以键名类型也不存在
 */
type KeysNull = keyof null;


interface MyInterface {
    [prop: number]: number
}

// number
type MyInterfaceKeysType = keyof MyInterface

interface MyInterface2 {
    [prop: string]: number
}

// string | number
type MyInterface2KeysType = keyof MyInterface2


type arrKeys = keyof [323, 'dff']
// "0" | "1" 数组元素索引及 length 、push 、pop、filter、forEach等Array自身包含的属性、方法名
const len: arrKeys = "map"

type A = { x: number, y: string, z: boolean }
type B = { x: number, a: string, b: string }

// D 等价于 "x" | "y" | "z" | "a" | "b" 
type D = keyof (A & B)

// C 等价于 "x"
type C = keyof (A | B)



// 用于获取对象类型中键值的类型
type MyObjValuesType = MyObjType[keyof MyObjType]