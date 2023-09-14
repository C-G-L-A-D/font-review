function debounce1(fn, delay) {
  let timer = null
  return function (...args) {
    // 因为不能修改原函数，所以要将其this指向保留
    let context = this
    if (timer) clearTimeout(timer)
    timer = setTimeout(function () {
      // 获取原函数的参数，包括触发事件的对象event
      fn.apply(context, args)
    }, delay)
  }
}

/**
 * 防抖函数
 * @param {*} fn 目标函数
 * @param {*} delay 延迟时间
 * @param {*} immdiate 是否立即执行
 */
function debounce(fn, delay = 1000, immdiate = false) {
  let timer = null
  return function (...args) {
    let context = this
    if (timer) clearTimeout(timer)

    if (immdiate) {
      let canRun = !timer
      timer = setTimeout(() => {
        timer = null
      }, delay)

      if (canRun) typeof fn === 'function' && fn.apply(context, args)
    } else {
      timer = setTimeout(() => {
        typeof fn === 'function' && fn.apply(context, args)
      }, delay)
    }
  }
}
