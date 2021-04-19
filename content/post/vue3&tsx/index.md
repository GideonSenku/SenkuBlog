---
author: GideonSenku
title: Vue3&Tsx踩坑
date: 2021-04-17
tags:
    - 开发
categories:
    - code
---

## Vue3&Tsx插槽的使用，如何进行插槽的参数解构

> 在tsx中，直接使用`v-slot="{active}"` 是无法获得`active`属性的，需要使用`v-slots`和对象表达式才能获取:
> `v-slots={{ slotName: (prop: type) => <p class={ prop && 'float' }>content</p> }}`

代码栗子：
```tsx
import { defineComponent } from 'vue'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'

export default defineComponent({
  setup() {
    return () => (
      <div class="py-16 mb-52 ml-28">
        <Menu as="div" class="relative inline-block text-left">
          <MenuButton class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            More
          </MenuButton>
          <MenuItems>
            <MenuItem v-slots={{
              default: (active: boolean) => <a class={ active && "bg-blue-500"} href="/account-settings">Documentation</a>
            }}>
            </MenuItem>
            <MenuItem disabled>
              <span class="opacity-75">Invite a friend (coming soon!)</span>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
    )
  },
})
```
