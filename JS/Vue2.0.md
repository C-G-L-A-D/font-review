# 1. 什么是MVVM

​	MVVM 是一种设计思想，分别代表一下三个东西：

* **M —— Model**：代表数据模型，数据和业务逻辑定义的地方
* **V —— View**：表示UI视图，负责数据的展示
* **VM —— ViewModel**：`View` 和 `Model` 的桥梁，负责监听 `Model` 中的数据改变并且控制 `View` 的更新，处理用户交互操作



在 `MVVM` 中 `View` 和 `Model` 并无直接关联，而是通过 `ViewModel` 来进行联系，从而实现 `View` 和 `Model` 的数据自动同步。



## 1.1 优缺点

**优点：**

	1. 低耦合
 	2. 可重用性
 	3. 自动更新dom
 	4. 可测试



**缺点：**

	1. Bug 很难调试
 	2. 可能会花费更多内存
 	3. ViewModel 的构建和维护成本较高



# 2. MVVM 和 MVC 的区别

​	MVC 中的 Controller 演变成了 MVVM 中的 ViewModel 。MVVM解决了 MVC 中大量的 DOM 操作使页面渲染性能降低，加载速度变慢，影响用户体验。因为 ViewModel 通过双向数据绑定将 Model 层和 View 层连接了起来，而 View 和 Model 的数据自动进行同步，因此开发者只需要专注于数据的维护操作，不用自己操作 DOM



# 3. Vue 的基本原理

​		当一个 Vue实例创建时，Vue会遍历 data 中的属性，用 `Object.defineProperty`（Vue2模式）将她们全部转为对应的 `getter / setter` 。在 `getter / setter` 内部可以通过 Vue 来进行追踪依赖，使属性在被访问和修改时能够通知变化。

​		每个组件实例都有对应的 watcher 实例，他会在组件渲染的过程中把属性记录为依赖，之后当依赖项的 `setter` 被调用时，会通知 watcher 重新计算，从而使它关联的组件得以更新。



## 3.2 Object.defineProperty()

​		可用于添加对象的属性，并设置该属性。

​		可传入三个参数，第一个参数为属性所处的对象，第二个参数为属性名称，第三个为属性的配置项。其中配置项分为两种：

* **数据属性**
  * **value：**属性的值 , 默认值为 undefined；
  * **enumerable：**  控制属性是否可以被枚举，即通过 Object.keys(对象) 能否获取该属性，默认值为false ；
  * **writable：** 控制属性是否可修改，默认值为false ；
  * **configurable：** 控制属性是否可以被删除，默认值为false ；

```javascript
let person = {
    name: 'xxx'
}

Object.defineProperty(person, 'age', {
    value: 20,
    enumerable: true,
    writable: true,
    configurable: true    
})

// 当enumerable: false，age属性不能通过person的迭代器遍历出来, 则输出为 ['name']
Object.keys(person) // ['name', 'age']

// 当 writable: false，age属性不能被修改, 
person.age = 34
console.log(person.age) // 34，当 writable: false 时输出 20（原值）

// 当 configurable: false，age属性不能被删除, 此时输出为 false
delete person.age // true
```



* **访问器**
  * **get()：** 当属性被访问时调用，即 `getter` ；
  * **set()：** 当属性被修改时调用，即 `setter` 。

```javascript
let person = {
    name: 'xxx',
    isAdult: false // 是否成年
}

let year = 2000
let currentYear = 2016

Object.defineProperty(person, 'age', {
    get: function() {
        // 读取时可进行提示
        console.log('age属性被读取')
        // 更改属性值
        return currentYear - year
    },
    set: function(value) {
        // set参数为每次修改的值，属性值每修改一次可修改依赖项，并触发视图更新
        // 修改依赖项
        if (value > 18) {
            this.isAdult = true
        }
        // 触发视图更新
        console.log('age属性发生变化，可以更新视图了。')
        console.log(`当前age = ${value}，本人${this.isAdult ? '已经成年' : '还未成年'}`)
    }
})

person.age // age属性被读取
// 16
person.age = 30 // age属性发生变化，可以更新视图了。
// 当前age = 30，本人已经成年

// 当修改currentYear时，age属性的setter不会被调用，但是值也会被修改。
currentYear = 2022
person.age // age属性被读取
// 22
person.isAdult = false // 只有主动调用setter方法才能更新依赖项
```



这两种配置项不能同时存在。



## 3.3 Object.defineProperty() 来进行数据劫持的缺点

​	对于一些属性进行操作时， `Object.defineProperty()` 拦截不到这些操作，从而导致视图不能即使更新。例如：

1. 使用索引直接设置一个数组项：`vm.items[indexOfItem] = newValue`
2. 直接替换数组：`vm.items = newValue`
3. 修改数组长度：`vm.items.length = newLength`



​	但是 Vue 提供以下几种方法解决上述问题：

1. 使用 `Vue.set()` 直接修改数组中的某项元素

```vue
Vue.set(vm.items, indexOfItem, newValue)
```



2. 使用 Vue 重写的数组方法：

```vue
vm.items.splice(indexOfItem, 1, newValue)
vm.items.splice(newLength)
```



3. 使用 `vm.$set` 实例方法，其实是全局方法 `Vue.set()` 的别名

```vue
vm.$set(vm.items, indexOfItem, newValue)
```



​	Vue重写的数组方法有：

1. push()
2. pop()
3. shift()
4. unshift()
5. splice()
6. sort()
7. reverse()



# 4. 双向数据绑定的原理

​		Vue 是采用**数据劫持**结合**发布者-订阅者模式**。通过 `Object.defineProperty()` 来劫持各个属性的 `getter / setter` ，在数据变动时发布消息给订阅者，触发相应的监听回调。

​	**几个要点：**

1. 实现一个数据监听器 Observer，能够对数据对象的所有属性进行监听，如有变动（触发setter）可拿到最新值并通知订阅者。
2. 实现一个指令解析器 Compile，对每个元素节点的指令进行扫描和解析，根据指令模板替换数据，以及绑定相应的更新函数
3. 实现一个 Watcher，作为连接 Observer 和 Compile 的桥梁，能够订阅收到每个属性变动的通知，执行指令绑定的相应回调函数，从而更新视图
4. mvvm 入口函数，整合以上三者。



​	**具体步骤：**

  1. 对需要 **Observer（数据监听**）的数据对象进行递归遍历，包括子属性对象的属性，都加上 `setter` 和 `getter` 。当给某个拥有 `setter` 和 `getter` 的属性进行赋值时，就会触发 `setter` ，那么就能够监听到该数据的变化。

  2. compile 解析模板指令，将模板中的变量替换为数据，然后初始化页面视图，并将每个指令对应的节点绑定更新的函数，添加监听数据的订阅者，一旦数据有变动，收到通知后就更新视图。

  3. Watcher 订阅者是 Observer 和 Compile 之间通信的桥梁。主要做得事情是：

     ​	① 在自身实例化时往属性订阅器（dep）中添加自己

     ​	② 自身必须有个 update() 方法；

     ​	③ 待自身属性变动 dep.notice() 通知时，能够调用自身的 update() 方法，并触发 Compile 中绑定的回调。

		4. MVVM 作为数据绑定的入口，整合 Observer、Compile 和 Watcher 三者，通过 Observer 来监听自己的 Model 数据变化，通过 Compile 来解析编译模板指令，最终用 Watcher来搭起 Observer 和 Compile 之间通信的桥梁。从而达到 `数据变化 => 视图更新；视图交互变化 => 数据 Model` 变更* 的双向绑定效果。



# 5. Vue 生命周期

<table style="text-align: center;">
    <thead>
        <th>阶段</th>
        <th>生命周期钩子</th>
        <th>作用</th>
    </thead>
    <tbody>
        <tr>
            <td rowspan="2">Create阶段(创建)</td>
            <td>beforeCreate()</td>
            <td>实例创建前，实例的挂载元素el、数据对象data和methods的方法都为undefined，还未初始化。</td>
        </tr>
        <tr>
            <td>created()</td>
            <td>实例创建完毕，data和methods初始化完毕，但是还没挂载。可以完成适宜异步任务，也可结束loading事件。</td>
        </tr>
        <tr>
            <td rowspan="2">Mount阶段(挂载)</td>
            <td>beforeMount()</td>
            <td>实例的数据初始化完毕，但是还没进行挂载。</td>
        </tr>
        <tr>
            <td>Mounted()</td>
            <td>虚拟DOM转换为真实DOM，并且被挂载</td>
        </tr>
        <tr>
            <td rowspan="2">Update阶段(更新)</td>
            <td>beforeUpdate()</td>
            <td>响应数据更新，但是其对应的真实DOM还没有被渲染，页面数据为旧数据</td>
        </tr>
        <tr>
            <td>updated()</td>
            <td>DOM元素更新，尽量避免在此阶段进行状态更改，因为可能会造成更新无限循环。</td>
        </tr>
        <tr>
            <td rowspan="2">Destroy阶段(销毁)</td>
            <td>beforeDestroy()</td>
            <td>实例销毁前，仍然能获取实例，但是DOM元素不会更新，也就是不会返回以上阶段</td>
        </tr>
        <tr>
            <td>destroyed()</td>
            <td>实例销毁后</td>
        </tr>
    </tbody>
</table>



## 5.2 父子组件执行顺序

* 加载渲染顺序：

  1. 父组件 beforeCreate
  2. 父组件 created 
  3. 父组件 beforeMounte
  4. `子组件 beforeCreate`
  5. `子组件 created`
  6. `子组件 beforeMounte`
  7. `子组件 mounted`
  8. 父组件 mounted

  

* 更新过程：

  1. 父组件 beforeUpdate
  2. `子组件 beforeUpdate`
  3. `子组件 updated`
  4. 父组件 updated

  

* 销毁过程：

  1. 父组件 beforeDestroy
  2. `子组件 beforeDestroy`
  3. `子组件 destroyed`
  4. 父组件 destroyed



# 6. Computed 和 Watch 的区别

* **缓存：** `Computed` 支持缓存，`Watch` 不支持
* **异步：** `Computed` 不支持异步监听，`watch` 支持
* **完整写法：**

```javascript
data() {
    return {
        name: 'xxx'
    }
},
computed: {
    'new-property': {
        get() {
            return '返回新的值'
        },
        set(value) {
            console.log('修改后，获取到新的值 ' + value)
            console.log('修改后，可联动修改依赖项')
        }
    }
},
watch: {
    immeduate: true, // 默认值为false。控制组件加载时是否触发handle函数
    deep: true, // 默认值为false。控制是否监听对象内部属性的变化。
    handle(newValue, oldValue) {
        console.log(`原先的值 ${oldValue}，修改后的值${newValue}`)
    }
}
```



# 7. 过滤器

​		在 Vue 中使用 `filters` 过滤数据。但是不会修改数据，与 es6 的 `filter()` 不是同一东西，但是可以通过 `filter()` 来实现。

​		`filters` 可以在插值表达式 `{{}}` 和 `v-bind` 表达式中使用 `管道符（|）` 进行过滤指示。例如：

```vue
<template>
  <ul>
    <li>
        日期（YYYY-MM-DD）：{{time | timeFormater('-')}}
        time 作为 timeFormater() 的第一个参数，
        '-' 作为 timeFormater() 的第二个参数。
    </li>
    <li :style="width | strFormater | widthFormater">
    	会把 width 作为 strFormater() 的第一个参数，
        strFormater()的返回值会作为 widthFormater() 的第一个参数，
        最后返回widthFormater() 的结果作为最终结果
    </li>
  </ul>
</template>

<script>
	export default {
        data() {
            day: 2022.09.22,
            width: 20
        },
        filters: {
            timeFormater(value, spaceCharacter) {
                return value.replace(/\./g, spaceCharacter)
            },
            strFormater(value) {
                return value + 'px'
            },
            widthFormater(value) {
                return 'width: ' + value + ';'
            }
        }
    }
</script>
```



# 8. data为什么是一个函数

​		主要是为了保证同一组件的不同实例之间data不冲突。因为一个组件可以进行复用，通过同一个VueComponent构造函数创建多个实例时，data对象是引用类型会被多个实例共用。



# 9. 常见事件修饰符及其作用

* **.stop** —— 防止事件冒泡，等同于 `event.stopPropagation()`；
* **.prevent** —— 阻止事件的默认行为，等同于 `event.preventDefault()`；
* **.capture** —— 使用事件捕获；
* **.self** —— 只会触发自身事件，不包含子元素；
* **.once** —— 只会触发一次。

 

# 10. v-if 和 v-show 的区别

* **元素显示状态：**`v-if` 是动态的向 DOM树 添加或删除节点；`v-show` 是控制元素的 `display` 样式；
* **编译：** `v-if` 切换有个局部编译 / 卸载的过程，会进行销毁和重建事件监听和子组件，只有条件为真才进行编译；`v-show` 只是切换 CSS 样式，编译后进行缓存。
* **性能消耗：**`v-if` 有更高切换消耗，`v-show`  有更高的初始化渲染消耗。
* **使用场景：**`v-if` 不适合频繁切换，`v-show` 适合频繁切换。



# 11. 给 data 中新增属性

​		可以使用全局方法 `Vue.set()` ，即当 this 指向当前组件实例或Vue实例时使用 `this.$set()` 。只有这样进行添加才能添加响应式属性，从而触发视图更新。否则不会发生视图刷新。

​	第一个参数为属性所在的对象，但不能是实例对象的data属性，即根属性。

​	第二个参数为属性名，属性名为字符串类型

​	第三个参数为属性值；



# 12. 自定义指令

1. 全局指令 `Vue.directive()` ，第一个参数为指令名，第二个参数为指令配置对象
2. 局部定义 `directive:{}`

常用钩子函数：

* **bind**:  指令与元素成功绑定时调用
* **inSerted**：指令所在元素被插入页面时调用
* **update**：指令所在模板结构被重新解析时调用



> 定义时不需要加 v- ，但是使用时需要
>
> 指令名为多个单词需要用 kebab-case 命名方式



# 13. 组件通信

## 13.1 props / $emit

### 1. 父组件向子组件传值

​	通过 `props`



### 2. 子组件向父组件传值

​	通过 `$emit`



## 13.2 事件总线 EventBus（$emit / $on）



## 13.3 依赖注入



## 13.3 ref / $refs



## 13.3 $parent / $children



## 13.4 $attrs / $listeners



# 14. extend 有什么用

​		用于扩展组件生成一个构造器，但是传入参数不能有 `el`

```javascript
let component = Vue.extend({
    template: `
		<div>组件</div>
	`,
    data() {
        return {
            name: 'xxx'
        }
    }
})

// 通过 Vue.component('component', component) 全局注册

// 局部注册
new Vue({
    el: '#app',
    components: {
        component1: component
    }
})
```



# 15. mixin（混入）

​		可以抽离组件的复用配置项放入统一文件中，例如data，method等。在组件中通过 `mixins` 数组进行接收。复用时，若是配置项冲突，则优先使用组件中的配置。但是生命周期是独立的。



# 16. 插件

​	在main.js中创建Vue实例之前通过 `Vue.use()` 引入组件。自己编写组件时，需要将内容放在 `install()` 中，其中第一个参数是Vue