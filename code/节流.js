function throttle(fn, interval) {
    let flag = true
    return function(...args) {
        let context = this
        if(!flag) return
        flag = false
        setTimeout(() => {
            fn.apply(context, args)
            flag = true
        }, interval)
    }
}