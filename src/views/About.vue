<template>
  <div>
    <input type="text" v-model="value" ref="iptRef">
    <child v-model:msg="msg" v-model:num="num" type="password" :value="value"></child>
  </div>
</template>

<script lang="ts">
import {reactive, toRefs, SetupContext, ref, watch, computed, ComputedRef, provide, watchEffect, nextTick} from 'vue'
import {useApp} from "@/hooks/index..ts"
import Child from "@/components/Child.vue"
interface Data {
  num: number,
  value: string,
  msg: string
}

interface Props {
  [key: string]: unknown
}

export default {
  name: "About",
  components: {
    Child
  },
  setup(props: Props, ctx: SetupContext) {
    let data: Data = reactive<Data>({
      num: 10,
      value: '123',
      msg: '我是父组件的数据'
    })
    let iptRef = ref<HTMLInputElement | null>(null)

    provide<number>('num', data.num)
    let computedNum:ComputedRef<number> = computed<number>(() =>{
      return data.num + 10
    })
    let stopWatch = watch(() => data.value, (val, oldVal) => {
      console.log(val)
      // console.log(oldVal)
      if (data.value === '123111') stopWatch()
    })
    let stop = watchEffect(() => {
      nextTick(() => {
        console.log(iptRef.value)
      })
      if (data.value === '123111') stop()
      console.log(data.value)
    })
    return {
      ...toRefs(data),
      computedNum,
      iptRef
    }
  }
}
</script>

<style scoped lang="scss"></style>
