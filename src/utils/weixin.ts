import wx from "weixin-js-sdk";
import {useAuthStoreWithout} from "@/store";
import {router} from "@/router";

const junmpToLogin = (): boolean => {
	const authStore = useAuthStoreWithout()
	const token = authStore.token
	var inWeixin = false
	if (token == null || token == '') {
		wx.miniProgram.getEnv((res) => {
			inWeixin = true
			wx.miniProgram.navigateTo({
				url: '/pages/login/index'
			})
		})
		if (!inWeixin) {
			router.push('/login')
		}
		return true
	}
	return false
}

export {junmpToLogin}
