---
category: 
  - 前端
date: 2024-10-31
headerDepth: 3
---

# TypeScript


## 类型


### 对象

object 可以存【非原始数据类型】

Object 可以存除null和undefined以外类型

#### 声明对象类型：

```ts
// ? 可选参数
let person: {name: string, age?: number}
// 参数列表中 逗号可以换成；或者换行
let person2: {
    name: string
    age?: number
}

```


索引签名

允许定义对象可以具有任意数量的属性，这些属性的键和类型是可变的，常用于描述类型不确定的属性（具有动态属性的对象）

```ts {2}
let person: {
    [key: string]: any
    age?: number
}
```

#### 函数类型声明：

```ts
let count: (a: number, b: number) => number

count = function (a, b) {
 return a + b   
}
```

#### 数组类型声明：

```ts
let arr: number[] = [1, 2, 3]
let arr2: Array<number> = [1, 2, 3]
```


#### enum 枚举

```ts 
enum Direction {
    Up = 'Up',
    Down = 'Down',
    Left = 'Left',
    Right = 'Right'
}
// 编译后的JavaScript代码量比较小
const enum Direction2 {
    Up = 'Up',
    Down = 'Down',
    Left = 'Left',
    Right = 'Right'
}
```


#### type

```ts
// 普通类型
type num = number
type Status = 'success' | 'error' | 'pending'


```


```ts
// 交叉类型
type Area = {
    height: number
    width: number
}

type Address = {
    num: number
    cell: number
    room: string
}

type House = Area & Address

const house: House = {
    height: 10,
    width: 10,
    num: 1,
    cell: 1,
    room: '1-1-1'
}
```


#### 特殊情况


```ts
type LogFunc = ()=>void

const f1: LogFunc = () => {
    return 100 // 允许返回非空值
}

const f2: LogFunc = () => 200 // 允许返回非空值
const f3: LogFunc = function (){
    return 300 // 允许返回非空值
}
```


#### 类

```ts
class Person {
    name: string
    age: number
    constructor(name: string, age: number) {
        this.name = name
        this.age = age
    }
    sayHi() {
        console.log(`hi, my name is ${this.name}`)
    }
}

class Student extends Person {
    score: number
    constructor(name: string, age: number, score: number) {
        super(name, age)
        this.score = score
    }
   override sayHi() {
        console.log(`hi, my name is ${this.name}, my score is ${this.score}`)
    }

    study() {
        console.log('i am studying')
    }
}
```

属性修饰符：public、private、protected、readonly


```ts {3-5}
// 完整写法
class Person {
    public name: string
    public age: number
    constructor(name: string, age: number) {
        this.name = name
        this.age = age
    }
}
```

```ts {3}
// 简写形式
class Person {
    constructor(public name: string, public age: number) {}
}
```


#### 抽象类

关键词：`abstract`

```ts
abstract class Package {
    constructor(public weight: number) {
    }

    abstract caculate(): number

    printPackage() {
        console.log(`weight: ${this.weight}`)
    }
}

class StandardPackage extends Package {

    constructor(weight:number, public unitPrice: number) {
        super(weight);
        
    }

    caculate(): number {
        return this.weight * this.unitPrice;
    }
}

const s1 = new StandardPackage(10, 100)
s1.printPackage()
```

#### 接口

用接口定义类、限定对象类型


```ts
interface Person {
    name: string
    age: number
    sayHi(): void
}

const person: Person = {
    name: 'jack',
    age: 18,
    sayHi() {
        console.log('hi')
    }
}

class Chinese implements Person {
    name: string
    age: number
    constructor(name: string, age: number) {
        this.name = name
        this.age = age
    }
    sayHi() {
        console.log('hi')
    }
}
```

接口继承

```ts
interface Person {
    name: string
    age: number
    sayHi(): void
}

interface Student extends Person {
    score: number
    study(): void
}
```


`interface` 和 `type` 的区别

- 限定对象结构可以互换
- `interface` 更专注于定义对象和类的结构，支持继承、合并
- `type` 可以定义类型别名、联合类型、交叉类型，但不支持继承和自动合并

### 泛型

[https://github.com/type-challenges/type-challenges](https://github.com/type-challenges/type-challenges)


```ts
// 泛型函数
function identity<T>(arg: T): T {
    
}

// 泛型接口
interface PersonInteface<T> {
    
}
```

### 声明文件
.d.ts

```ts
declare function add(a: number, b: number): number
declare module '*.css' {
    
}
```


### 装饰器 

[https://www.typescriptlang.org/docs/handbook/decorators.html](https://www.typescriptlang.org/docs/handbook/decorators.html)