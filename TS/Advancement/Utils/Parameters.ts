type AddType = (x: number, y: number) => number

type AddProps = Parameters<AddType>
const addParams: AddProps = [1, 2]

const Sub = (x: number, y: number) => x - y
type  SubProps = Parameters<typeof Sub>
const subParams: SubProps = [2, 1]