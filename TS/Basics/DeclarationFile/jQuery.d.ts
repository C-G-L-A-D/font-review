// jQuery 声明文件
// 一般全局变量都是禁止修改的，所以可以用 const 
declare const $: (selector: any) => any;

/* 
声明语句中只能定义类型，不能定义具体的代码实现
declare const jQuery = function(selector) {
    return document.querySelector(selector);
};
*/

declare function jQuery(selector: any) : any;

/* 
命名空间为模块化关键字，因为es6模块化的诞生，
与ts的模块化命名冲突，所以更名为namespace。
但es6随着es6的广泛使用，namespace被淘汰了。
现在声明文件中较常用，用来表示全局对象是一个属性，包含很多子属性。
*/
declare namespace jQuery {
    function ajax(url: string, setting?: any) : void;
    const version: number;
    // 如果有深层级的对象，则需要嵌套 namespace来声明深层属性的类型
    namespace fn {
        function extend(object: any): void;
    }
}

// 但如果一个全局对象只有一个深层的对象属性，则不需要嵌套。
declare namespace $.fn {
    function extend(object: any): void;
}

// ts 把不同文件默认都处于同一全局下，因此命名不能冲突，可以用模块文件