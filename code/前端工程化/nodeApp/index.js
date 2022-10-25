import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

// 获取需要读取文件的路径
const url = import.meta.url
const curPath = fileURLToPath(url)
const targetPath = resolve(dirname(curPath), './corpus/data.json')

// 读取文件
const dataStr = readFileSync(targetPath, { encoding: 'utf-8' })

// 将文件从字符串转换为 json 对象
const data = JSON.parse(dataStr)

