import {app} from "@/main.ts"

export const useApp = () => {
  app.config.globalProperties.num = 10
  return {
    app
  }
}

