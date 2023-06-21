import { defineStore } from 'pinia'

export const useMainStore = defineStore('Main',{
  state: ()=>{
    return {
      host: '',
      dst: '',
      isChange: false
    }
  },
  // 类似computed ， 修饰一些值
  getters: {

  },
  actions: {

  }
})