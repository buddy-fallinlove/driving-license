<template>
  <div>
    <child v-model:msg='msg' title="标题"></child>
    {{name}}
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, SetupContext, onMounted } from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {useStore} from 'vuex'
import child from '@/components/Child.vue'
import api from '@/http/api'
import { Res, ResItem } from '@/types';
interface Data {
  msg: string,
  name: string
}
export default defineComponent({
  name: '',
  props: {},
  components: {
    child
  },
  setup(props, ctx: SetupContext) {
    let route = useRoute()
    let router = useRouter()
    let store = useStore()
    let data: Data = reactive<Data>({
      msg: '我是父组件的数据',
      name: ''
    })
    onMounted(() => {
      
      // api.getTopics().then((res: Res) => {
      //   res.data.map((item: ResItem) => {

      //   })
      // })
      // !表示一定有这个值
      data.name = route.query.name! as string
    })
    return {
      ...toRefs(data),
    }
  },
})
</script>

<style scoped lang='scss'>
</style>