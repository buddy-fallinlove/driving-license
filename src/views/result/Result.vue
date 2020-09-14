<template>
  <div>
    <div class="score flex a-center j-center">
      最终得分:
      <span>{{100 - (errArr.length / total) * 100}}分</span>
    </div>
    <div class="flex a-center j-center mt-1">
      <button @click="$router.push('/')">回到首页</button>
    </div>
    <h2 class="flex a-center j-center mt-3">错题解析</h2>
    <div v-for="(item, index) in errArr" :key="index" class="ml-1 mt-2 mb-2">
      <div class="flex a-center mt-1">第{{index + 1}}题</div>
      <div class="question flex a-center j-center mb-1">题目: {{item.question}}</div>
      <div v-if="item.url" class="img flex a-center j-center">
        <img :src="item.url" alt style="width:100%"/>
      </div>
      <div class="flex a-center mt-2">正确答案: <span class="ml-1" style="color: red">{{item.items[item.answer * 1 - 1]}}</span></div>
      <div class="mt-1 mb-1">答案解析: 
        <div class="mt-1">{{item.explains}}</div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, onMounted, toRefs} from 'vue'
import {
  useRoute,
  RouteLocationNormalizedLoaded,
  LocationQueryValue,
} from 'vue-router'

interface ResultItem {
  answer: string
  // 错误解释
  explains: string
  id: string
  item1: string
  item2: string
  item3: string
  item4: string
  question: string
  url: string
  isCorrect: boolean
  items?: string[]
}

interface Data {
  errs: ResultItem[]
  total: string
  errArr: ResultItem[]
}

export default defineComponent({
  name: 'result',
  setup() {
    let route: RouteLocationNormalizedLoaded = useRoute()
    let data: Data = reactive<Data>({
      errs: [],
      errArr: [],
      total: '',
    })

    onMounted(() => {
      data.errs = JSON.parse(route.query.errs as string)
      data.total = route.query.total as string
      data.errs.map((item: ResultItem) => {
        if (!item.isCorrect) data.errArr.push(item) 
      })
    })
    return {
      ...toRefs(data)
    }
  },
})
</script>

<style lang="scss" scoped>
.score {
  font-size: 30px;
  margin-top: 10px;
  span {
    color: red;
    margin-left: 10px;
  }
}
</style>