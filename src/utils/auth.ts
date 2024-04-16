import Cookies from 'js-cookie'
import { storageLocal } from '@pureadmin/utils'
import { useUserStoreHook } from '@/store/modules/user'

export interface DataInfo<T> {
  /** token */
  accessToken: string
  /** `accessToken`的过期时间（时间戳） */
  expires: T
  /** 用于调用刷新accessToken的接口时所需的token */
  refreshToken: string
  /** 头像 */
  avatar?: string
  /** 用户名 */
  username?: string
  /** 昵称 */
  nickname?: string
  /** 当前登陆用户的角色 */
  roles?: Array<string>
  tokenName: string
  tokenValue: string
  tokenTimeout: number
  loginId: string
  loginDevice: string
}

export const userKey = 'user-info'
export const TokenKey = 'authorized-token'
const LOCAL_NAME = 'userStorage'
/**
 * 通过`multiple-tabs`是否在`cookie`中，判断用户是否已经登录系统，
 * 从而支持多标签页打开已经登录的系统后无需再登录。
 * 浏览器完全关闭后`multiple-tabs`将自动从`cookie`中销毁，
 * 再次打开浏览器需要重新登录系统
 * */
export const multipleTabsKey = 'multiple-tabs'

/** 获取`token` */
export function getToken(): DataInfo<number> {
  // 此处与`TokenKey`相同，此写法解决初始化时`Cookies`中不存在`TokenKey`报错
  return Cookies.get(TokenKey)
    ? JSON.parse(Cookies.get(TokenKey))
    : storageLocal().getItem(userKey)
}

/**
 * @description 设置`token`以及一些必要信息并采用无感刷新`token`方案
 * 无感刷新：后端返回`accessToken`（访问接口使用的`token`）、`refreshToken`（用于调用刷新`accessToken`的接口时所需的`token`，`refreshToken`的过期时间（比如30天）应大于`accessToken`的过期时间（比如2小时））、`expires`（`accessToken`的过期时间）
 * 将`accessToken`、`expires`这两条信息放在key值为authorized-token的cookie里（过期自动销毁）
 * 将`avatar`、`username`、`nickname`、`roles`、`refreshToken`、`expires`这六条信息放在key值为`user-info`的localStorage里（利用`multipleTabsKey`当浏览器完全关闭后自动销毁）
 */
export function setToken(data: DataInfo<Date>) {
  let expires = 0
  const { tokenValue, loginId, tokenTimeout, tokenName } = data
  expires = new Date(data.expires).getTime() // 如果后端直接设置时间戳，将此处代码改为expires = data.expires，然后把上面的DataInfo<Date>改成DataInfo<number>即可
  // const cookieString = JSON.stringify({ tokenValue, loginId });
  Cookies.set('user-id', loginId)

  tokenTimeout > 0
    ? Cookies.set(tokenName, tokenValue, {
      expires: (expires - Date.now()) / 86400000,
    })
    : Cookies.set(tokenName, tokenValue)

  Cookies.set(
    multipleTabsKey,
    'true',
  )

  function setUserKey(userid: string) {
    useUserStoreHook().updateUserInfo({ id: userid })
  }

  if (data.loginId) {
    const { loginId } = data
    setUserKey(loginId)
  }
  else {
    const loginId
      = storageLocal().getItem<DataInfo<number>>(LOCAL_NAME)?.loginId ?? ''
    setUserKey(loginId)
  }
}

/** 删除`token`以及key值为`user-info`的localStorage信息 */
export function removeToken() {
  Cookies.remove(TokenKey)
  Cookies.remove(multipleTabsKey)
  storageLocal().removeItem(userKey)
}

/** 格式化token（jwt格式） */
export const formatToken = (token: string): string => {
  return `Bearer ${token}`
}
