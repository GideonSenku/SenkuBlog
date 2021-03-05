---
author: GideonSenku
title: 记录学习TypeScript过程中遇到的问题
date: 2021-03-05
tags:
    - 开发
categories:
    - code
---

## 问题1

> 在类中的构造方法中使用`this.xxx`会出现`Property 'xxx' does not exist on type 'xxxClass'`报错

### 解决方式：
由于属性未定义而产生的报错，需要在类中定义响应的属性，且属性有三种访问修饰器，`public`、`private`和`protected`
- `public` 修饰的属性或方法是公有的，可以在任何地方被访问到，默认所有的属性和方法都是 `public` 的
- `private` 修饰的属性或方法是私有的，不能在声明它的类的外部访问
- `protected` 修饰的属性或方法是受保护的，它和 private 类似，区别是它在子类中也是允许被访问的

代码栗子：
```ts
export default class UserController extends Controller {
  protected userCreateValidate: userCreateValidate
  protected passValidate: passValidate
  constructor(ctx: Context) {
    super(ctx)
    this.userCreateValidate = {
      // phone: { type: 'string', required: true, allowEmpty: false, format: /^[0-9]{11}$/ },
      phone: /^[0-9]{11}$/,
      password: 'password',
    }
    this.passValidate = {
      new_password: 'password',
      password: 'password',
    }
  }
}
```

## 问题2

> 在函数方法中使用解构赋值并赋予初始值如何定义类型

代码栗子: 初学者(我)下意识写出来的代码
```ts
import { Context } from 'egg'
export default {
  success({ ctx: Context, res: {} = {}, msg: string = 'success', status: number = 200 }) {
    ctx.body = {
      code: 0,
      res,
      msg,
    }
    ctx.status = status
  },
}
```

很显然上面的代码肯定是行不通的，在对象中使用`key: value`会被是识别为键值对

### 解决方式

在函数外定义一个`interface`或者`type`的类型使用

```ts
import { Context } from 'egg'
// 定义interface
interface Payload {
  ctx: Context
  res?: {}
  msg?: string
  status?: number
}
// 或者定义一个type
type Payload = {
  ctx: Context
  res?: {}
  msg?: string
  status?: number
}

export default {
  success({ ctx, res = {}, msg = 'success', status = 200 }: Payload) {
    ctx.body = {
      code: 0,
      res,
      msg,
    }
    ctx.status = status
  },
}

```