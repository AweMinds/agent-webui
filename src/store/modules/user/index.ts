import { defineStore } from 'pinia'
import type { UserInfo, UserState } from './helper'
import { defaultSetting, getLocalState, setLocalState } from './helper'
import { store } from '@/store'
import type { LoginResult } from '@/api/user'
import { getLogin } from '@/api/user'
import { setToken } from '@/utils/auth'

export const useUserStore = defineStore('user-store', {
  state: (): UserState => getLocalState(),
  actions: {
    updateUserInfo(userInfo: Partial<UserInfo>) {
      this.userInfo = { ...this.userInfo, ...userInfo }
      this.recordState()
    },

    resetUserInfo() {
      this.userInfo = { ...defaultSetting().userInfo }
      this.recordState()
    },

    recordState() {
      setLocalState(this.$state)
    },

    /** 登入 */
    async loginByUsername(data) {
      return new Promise<LoginResult>((resolve, reject) => {
        getLogin(data)
          .then((data) => {
            if (data?.status)
              setToken(data.data)
            resolve(data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
  },
})

export function useUserStoreHook() {
  return useUserStore(store)
}
