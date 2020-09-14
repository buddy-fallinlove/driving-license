// let num: number = 10
// let str: string = '123'
// let bol: boolean = true
// let n: null = null

// let num1 = 10


// 定于数组
// <>代表泛型: 定义的时候不知道类型 用的时候才知道
// let arr1: Array<number> = [1, 2, 3]
// let arr2: string[] = ['1', '2' , '3']

// // 定义对象 (封装请求时给参数的类型)
// let obj1: {name: string, age: number} = {
//   name: 'jack',
//   age: 20
// } 

// // 通过接口的形式(组件内部)
// interface Obj {
//   name: string,
//   age: number
// }

// let obj2: Obj = {
//   name: 'jack',
//   age: 20
// }


// // 定义函数
// // 参数和返回值都必须给类型
// let fn1 = (num1: number, num2: number):number => {
//   return num1 + num2
// }

// fn1(1, 2)

// let fn2 = (num1: number):void => {
//   console.log(num1)
// }

// 可选属性和可选参数

interface Obj {
  name: string,
  age: number,
  sex?: string
}

let obj1: Obj = {
  name: 'jack',
  age: 20,
  sex: '男'
}

let fn1 = (num1: number, num2?:number) => {
  return num1 + num2
}

console.log(fn1(1))
