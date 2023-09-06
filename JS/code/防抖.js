function debounce(fn, delay) {
    let timer = null
    return function (...args) {
        // 因为不能修改原函数，所以要将其this指向保留
        let context = this
        if(timer) clearTimeout(timer)
        timer = setTimeout(function() {
            // 获取原函数的参数，包括触发事件的对象event
            fn.apply(context, args)
        }, delay)
    }
}