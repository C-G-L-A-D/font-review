type Dog = {
    color: string,
    breed: string,
    age: number,
    name: string
};

// Dog['name'] 等价于 string
const dogName: Dog['name'] = "Fido";
// Dog['age'] 等价于 number
const dogAge: Dog['age'] = 3;
// Dog['color'] 等价于 string
const dogColor: Dog['color'] = "brown";
// Dog['breed'] 等价于 string
const dogBreed: Dog['breed'] = "Labrador";
