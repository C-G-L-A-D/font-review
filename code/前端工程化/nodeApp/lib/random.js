// randomInt 随机生成长度
export function randomInt(min, max) {
    let num =  Math.random()*(max-min) + min
    return Math.floor(num)
}

// randomPick 随机选择数组元素,并且避免两次随机生成的元素相同
/* 
缺点：多增加了一个存储空间，并且选择重复就得再次选择。可能造成多次重复
let lastPicked = null
export function randomPick(arr) {
    let index = null
    do {
        index = randomInt(0, arr.length)
    } while(arr[index] === lastPicked)
    lastPicked = arr[index]
    return arr[index]
} 
*/

/* 
    优化：
        每次选择范围修改到[0~len-1)，
        这样就可以将每次选择到的元素与最后一个元素交换，
        就可以避免下一次选择的值与上一次重复。
    缺点：
        修改原数组，可能会影响其他依赖该数组的使用。
        并且初次使用的时候，最后一个元素不能进行选择，违背了随机性。
    再次优化：
        将选择randomPick作为闭包调用，每次改变原数组的副本即可。
        抛弃初次使用的选择结果，就可以也选择最后一个元素。只多调用一次。
*/
export function createRandomPicker(arr) {
    // 创建数组副本，即可不该本数组
    newArr = [...arr],
    function randomPcik() {
        const len = newArr.length-1
        const index = randomInt(0, len)
        const picked = newArr[index]
        // 元素值交换位置
        [newArr[index], newArr[len]] = [newArr[len], newArr[index]]
        return picked
    }
    // 调用 createRandomPicker 时才会多调用一次。
    randomPcik()
    /* 
        将 randomPcik() 返回，作为闭包调用，
        则每次改变的都是数组副本，
        如果对同一数组选择多次，则只用传入一次参数。
    */
    return randomPcik
}
