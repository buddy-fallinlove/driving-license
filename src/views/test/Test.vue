<template>
  <div>
    <div class="top flex a-center j-center">开始答题 ({{current}} / {{total}})</div>
    <div class="tip flex a-center j-center">您正在进行{{model}}-科目{{subject}}的考试</div>
    <div class="content">
      <div v-for="(item, index) in result" :key="index">
        <div v-if="current === index + 1">
          <div class="question flex a-center j-center">题目: {{item.question}}</div>
          <div v-if="item.url" class="img flex a-center j-center">
            <img :src="item.url" alt />
          </div>
          <div class="item">
            <div
              v-for="(item1, index1) in item.items"
              :key="index1"
              @click="clickItem(item, index1)"
              :class="{active: activeIndex === index1}"
            >{{item1}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="btn flex a-center j-center">
      <div v-if="current > 1" class="flex a-center j-center" @click="pre">上一题</div>
      <div v-if="current < total" class="flex a-center j-center" @click="next">下一题</div>
      <div v-if="current === total" class="flex a-center j-center" @click="end">结束答题</div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import {
  useRoute,
  useRouter,
  RouteLocationNormalizedLoaded,
  LocationQueryValue,
  Router,
} from 'vue-router'
import {Result} from "@/types"
import { key } from '@/config'
import api from '../../http/api'


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
  result: ResultItem[]
  current: number
  total: number
  subject: string | LocationQueryValue[]
  model: string | LocationQueryValue[]
  errs: any
  activeIndex: number
}

export default defineComponent({
  name: 'test',
  setup(props) {
    let route: RouteLocationNormalizedLoaded = useRoute()
    let router: Router = useRouter()
    let data: Data = reactive<Data>({
      result: [],
      current: 1,
      total: 0,
      subject: '',
      model: '',
      errs: [],
      activeIndex: -1,
    })
    // 获取数据
    let getData = () => {
      data.subject = route.query.sub! as string
      data.model = route.query.model! as string
      api
        .getData({
          subject: data.subject,
          testType: 'rand',
          model: data.model,
          key,
        })
        .then((res: any) => {
          if (res.reason === 'ok') {
            res.result.map((item: ResultItem) => {
              item.isCorrect = false
              let arr = []
              if (item.item3 !== '' && item.item4 !== '') {
                arr.push(item.item1)
                arr.push(item.item2)
                arr.push(item.item3)
                arr.push(item.item4)
              } else {
                arr.push(item.item1)
                arr.push(item.item2)
              }
              item.items = arr
            })
            data.result = res.result.slice(0, 5)
            data.total = data.result.length
          }
        })
        .catch((err: any) => {
          console.log(err)
        })
    }
    // 点击选项
    let clickItem = (item: ResultItem, index: number): void => {
      if (index + 1 !== Number(item.answer)) {
        data.errs.push(item)
        item.isCorrect = false
      } else {
        item.isCorrect = true
      }
      data.activeIndex = index
    }
    // 下一题
    let next = () => {
      if (data.current < data.total && data.current >= 1) {
        data.current++
      }
      data.activeIndex = -1
    }
    // 上一题
    let pre = () => {
      if (data.current <= data.total && data.current > 1) {
        data.current--
      }
      data.activeIndex = -1
    }

    // 结束答题
    let end = (): void => {
      router.push({
        name: 'result',
        query: {
          errs: JSON.stringify(data.errs),
          total: data.total,
        },
      })
    }

    onMounted(() => {
      getData()
    })
    return {
      ...toRefs(data),
      getData,
      clickItem,
      next,
      pre,
      end,
    }
  },
})
</script>

<style lang="scss" scoped>
.top {
  background: skyblue;
  height: 40px;
  color: #fff;
}
.tip {
  background: #e6a23c;
  height: 30px;
  color: #fff;
  font-size: 14px;
}
.content {
  margin-top: 40px;
  padding: 0 10px;
  .img {
    margin: 45px 0;
  }
  .item {
    margin-top: 30px;
    div {
      margin: 15px 0;
      border: 1px solid skyblue;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 5px 0;
    }
  }
}
.btn {
  color: #fff;
  div {
    flex: 1;
    margin: 0 2%;
    background: skyblue;
    padding: 5px;
  }
}
.active {
  background: skyblue !important;
  color: #fff !important;
}
</style>
