export interface ResItem {
  answer: string
  explains: string
  id: string
  item1: string
  item2: string
  item3: string
  item4: string
  question: string
  url: string
}

export interface Result{
  error_code: number,
  reason: string,
  result: ResItem[]
}
