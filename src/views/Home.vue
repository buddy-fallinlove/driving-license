<template>
  <div>
    <div class="flex a-center j-around">
      <div
        class="subject flex a-center j-center"
        :class="{'b-s': subIndex === index}"
        v-for="(item, index) in subjects"
        :key="index"
        @click="clickSub(item, index)"
      >{{item.name}}</div>
    </div>
    <div class="flex a-center f-wrap" style="margin-top: 30px">
      <div 
      v-for="(item, index) in models" 
      :key="index" 
      class="model flex j-center a-center"
      :class="{'m-active': mIndex === index}"
      @click="clickModel(item, index)">
        {{item.name}}驾照
      </div>
    </div>
    <div class="btn flex a-center j-center" @click="start">
      <div class="start flex a-center j-center">开始做题</div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from 'vue'

import { useRouter, Router } from 'vue-router'

interface Subject {
  id: number
  name: string
}
interface Model {
  name: string
  id: string
}
interface AppKey {
  key: string
}
interface Data {
  subjects: Subject[]
  models: Model[]
  subIndex: number,
  mIndex: number,
  sub: number,
  model: string
}

export default defineComponent({
  name: 'home',
  setup(props) {
    let router:Router = useRouter()
    let data: Data = reactive<Data>({
      subjects: [
        {
          name: '科目1',
          id: 1,
        },
        {
          name: '科目4',
          id: 4,
        },
      ],
      models: [
        {
          name: 'c1',
          id: 'c1',
        },
        {
          name: 'c2',
          id: 'c2',
        },

        {
          name: 'a1',
          id: 'a1',
        },
        {
          name: 'a2',
          id: 'a2',
        },
        {
          name: 'b1',
          id: 'b1',
        },
        {
          name: 'b2',
          id: 'b2',
        },
      ],
      subIndex: 0,
      mIndex: 0,
      model: 'c1',
      sub: 1
    })
    let clickSub = (item: Subject, index: number): void => {
      data.sub = item.id
      data.subIndex = index
    }
    let clickModel = (item: Model, index: number): void => {
      data.model = item.id
      data.mIndex = index
    }
    let start = ():void => {
      router.push({name: 'test', query: {
        sub: data.sub,
        model: data.model,
      }})
    }
    return {
      ...toRefs(data),
      clickSub,
      clickModel,
      start
    }
  },
})
</script>

<style lang="scss" scoped>
.subject {
  width: 130px;
  height: 130px;
  color: #fff;
  margin-top: 30px;
  &:first-child {
    background: orange;
  }
  &:last-child {
    background: green;
  }
}
.model {
  width: 46%;
  height: 70px;
  border-radius: 12px;
  border: 2px solid skyblue;
  margin-left: 2%;
  margin-top: 15px;
}
.b-s {
  box-shadow: 10px 10px 10px #ccc;
}
.m-active {
  background: skyblue !important;
  color: #fff !important;
}
.btn {
  width: 100%;
  margin-top: 30px;
  .start {
    height: 36px;
    width: 300px;
    background: skyblue;
    color: #fff;
    font-size: 18px;
  }
}
</style>
