---

category:
  - 前端
tag:
  - Vue
  - 框架
date: 2020-09-10

---
# vue

## 数据绑定

单向绑定

v-bind:xxxx= 缩写 :xxx=

``` html
<input v-bind:value="">
<input :value="">
```

双向绑定

只针对有value属性的表单元素

v-model:value= 缩写 v-model=

``` html
<input v-model:value="">
<input v-model="">
```

## EL和Data的写法

el的两种写法

``` javascript
// el两种写法
const v = new Vue({
    // 第一种写法
        // el: '#root', 
        data: {
            name: 'zeng zz',
        },
    });
console.log(v);
// 第二种写法
v.$mount('#root'); 
```

Data的两种写法

``` js
// data两种写法
new Vue({
    el: '#root',
    // 1、对象式
    /* data: {
        name: 'Hello World',
    }, */
    // 2、函数式
    /* data: function () {
        return { name: 'Hello World' };
    } */
    // 简写(对象中写方法)
    data () {
        return { name: 'Hello World' };
    }
});
```

**函数式的data不能使用箭头函数，this会指向Window而不是vue实例!!!**

## 事件处理

`v-on:`

``` html
 <button v-on:click="showInfo"></button>

  <button @click="showInfo"></button>

  <!--传参-->   
  <button v-on:click="showInfo2($event,66)">点我提示信息2</button>
```
