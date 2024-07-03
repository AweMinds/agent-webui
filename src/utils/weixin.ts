import wx from "weixin-js-sdk";
import {useAuthStoreWithout, useUserStoreHook} from "@/store";
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

const getUserInfo = async (userId: string, userToken: string) => {
	useUserStoreHook()
		.getUserInfo({userId: userId, userToken: userToken})
		.then((res) => {
			if (res.status) {
				console.log("--------getUserInfo success---------------")
			} else {
				console.log("--------getUserInfo fail---------------")
			}
		})
		.catch((error) => {
			console.log("--------getUserInfo error---------------")
		})
}

export {junmpToLogin, getUserInfo}
