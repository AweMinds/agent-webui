<script setup lang='ts'>
import {Icon as TIcon, Avatar, Cell as TCell, CellGroup as TCellGroup, Toast} from 'tdesign-mobile-vue'
import 'tdesign-mobile-vue/es/style/index.css'
import {UserCenterCard as TUserCenterCard, UsageGroup as TUsageGroup} from './components'
import {router} from "@/router";
import {useAuthStoreWithout, useUserStore, useUserStoreHook} from "@/store";
import {computed, onMounted, ref} from "vue";
const authStore = useAuthStoreWithout()

const customService = () => {
	console.log("-----------------")
	console.log("click on customService")
}

const cooperation = () => {
	console.log("-----------------")
	console.log("click on cooperation")
	router.push('/usercenter/cooperation')
}

const tutorialVideo = () => {
	window.open('https://video.aweminds.cn/showcase.mp4', '_blank')
	// window.location.href ='https://video.aweminds.cn/showcase.mp4'
}

const aboutUs = () => {
	window.open('user_center_header.png', '_blank');
	// window.location.href ='user_center_header.png'
}
</script>

<template>
  <div class="flex flex-col w-full h-full page">
		<t-user-center-card
			userInfo="{{userInfo}}"
			isPhoneHide="{{true}}"
			name-class="custom-name-class"
			phone-class="custom-phone-class"
			avatar-class="customer-avatar-class"
			currAuthStep="{{currAuthStep}}"
			bind:gotoUserEditPage="gotoUserEditPage"
		/>
		<view class="content-wrapper">
			<view class="order-group-wrapper">
				<t-usage-group orderTagInfos="{{orderTagInfos}}" bind:onClickTop="jumpAllOrder" bind:onClickItem="jumpNav" />
			</view>

			<div class="cell-box">
					<t-cell title="联系客服" arrow :bordered="true" @click="customService"/>
					<t-cell title="合作意向" arrow :bordered="true" @click="cooperation"/>
					<t-cell title="使用教程" arrow :bordered="true" @click="tutorialVideo"/>
					<t-cell title="关于我们" arrow :bordered="true" @click="aboutUs"/>
			</div>
		</view>
  </div>

  <drawListVue />
  <aiGPT @finished="loading = false" />
  <AiSiderInput v-if="isMobile"  :button-disabled="false" />
</template>

<style>
@import url(./style.css);
</style>
