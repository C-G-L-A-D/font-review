// webpack生产环境默认开启 tree shaking，只会按需引入使用的功能

export function count(x, y) {
    return x - y;
}

export function add (x, y) {
    return x + y
}
