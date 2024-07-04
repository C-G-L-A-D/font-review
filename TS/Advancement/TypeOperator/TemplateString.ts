const isAM = new Date().getHours() < 12;
const getAMPM = () => isAM ? '上午' : '下午';

const hello_name = '张三';

// 定义字面量
const str1 = `Hi, ${hello_name}. ${getAMPM()}好`;
console.log(str1) // Hi, 张三. 下午好


// 定义字面量类型
type Version = `${number}.${number}.${number}`;
const v1: Version = '1.1.0'

// 使用泛型决定模版字符串类型
type SayHello<T extends string | number> = `Hello ${T}`;
type Greet1 = SayHello<"linbudu">; // "Hello linbudu"
type Greet2 = SayHello<599>; // "Hello 599"


// 遍历联合类型作为变量使用
type Brand = 'iphone' | 'xiaomi' | 'honor';
type SKU1 = `${Brand}`; // "iphone" | "xiaomi" | "honor"


type SKU2 = `${Brand}-latest`; // "iphone-latest" | "xiaomi-latest" | "honor-latest"


type Memory = '16G' | '64G';
type ItemType = 'official' | 'second-hand';
type SKU3 = `${Brand}-${Memory}-${ItemType}`;


