<template>
  <div>
    {{msg}} --- {{num}} --- {{value }} --- {{injectNum}}
    <br>
    <input v-bind="$attrs">
    <br>
    <button @click="updateMsg">改变父组件的数据</button>
  </div>
</template>

<script lang="ts">
import {reactive, toRefs, SetupContext, inject, PropType} from 'vue'

interface Data {

}
interface Props {
  msg: string,
  num: number,
  value: string
}

export default {
  name: "Child",
  components: {},
  props: {
    msg: {
      type: String
    },
    num: {
      type: Number
    },
    value: {
      type: String
    },
  },
  setup(props:Props, ctx: SetupContext) {
    let data: Data = reactive<Data>({})
    let updateMsg = () => {
      ctx.emit('update:msg', '我是改变之后的值')
      ctx.emit('update:num', 20)
    }
    let injectNum: number = inject<number>('num')!
    return {
      ...toRefs(data),
      updateMsg,
      injectNum
    }
  }
}
</script>

<style scoped lang="scss"></style>
