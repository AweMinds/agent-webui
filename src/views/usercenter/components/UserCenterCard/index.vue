<script lang="ts" setup>
import { Icon,Avatar as TAvatar,Cell,CellGroup, Toast } from 'tdesign-mobile-vue'
import {computed, ref} from "vue";
import {useUserStore} from "@/store";

const userStore = useUserStore()
const userInfoStore = computed(() => userStore.userInfo)
const avatar = ref(userInfoStore.value.avatar ?? '').value
const name = ref(userInfoStore.value.name ?? '').value
const id = ref(userInfoStore.value.id ?? '').value
const phoneNumber = ref(userInfoStore.value.phoneNumber ?? null).value

const defaultAvatarUrl = 'https://we-retail-static-1300977798.cos.ap-guangzhou.myqcloud.com/retail-ui/components-exp/avatar/avatar-1.jpg'

const gotoUserEditPage = () => {
	console.log("=========================")
	console.log("click gotoUserEditPage")
}

const conversionChar = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_-";
let _conversionCharIndex;
const getConversionCharIndex = function () {
	if (_conversionCharIndex) return _conversionCharIndex;
	_conversionCharIndex = {};
	for (let index = 0; index < conversionChar.length; index++) {
		const char0 = conversionChar[index];
		_conversionCharIndex[char0] = index;
	}
	return _conversionCharIndex;
};

/**
 * 压缩guid
 * @param {string} guid
 */
const short = (guid) => {
	if (guid.length !== 36) {
		return "获取失败";
	}
	let value = "0" + guid.replace(/-/g, "");
	if (value.length !== 33) {
		return "获取失败";
	}
	let result = "";
	for (let index = 0; index < 11; index++) {
		let start = index * 3;
		const str = parseInt(value[start] + value[start + 1] + value[start + 2], 16);
		result += conversionChar[Math.floor(str / 64)] + conversionChar[str % 64];
	}
	return result;
}
/**
 * 复原guid
 * @param {string} shortGuid
 */
const restore = (shortGuid) => {
	if (shortGuid.length !== 22) throw "Invaild short UUID";
	let conversionCharIndex = getConversionCharIndex();
	let result = "";
	for (let index = 0; index < 22; index += 2) {
		let u = (conversionCharIndex[shortGuid[index]] * 64 + conversionCharIndex[shortGuid[index + 1]]).toString(16).padStart(3, "0");
		if (index === 0 && u[0] === "0") {
			u = u.substr(1);
		}
		result += u;
	}
	return `${result.substr(0, 8)}-${result.substr(8, 4)}-${result.substr(12, 4)}-${result.substr(16, 4)}-${result.substr(20)}`;
}

const userInfo = {
	avatarUrl: 'https://we-retail-static-1300977798.cos.ap-guangzhou.myqcloud.com/retail-ui/components-exp/avatar/avatar-1.jpg',
	nickName: name,
	uid: short(id),
	phoneNumber: phoneNumber ? phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1****$3") : '未获取'
}

</script>

<template>
	<div class="user-center-card">
		<!-- 未登录的情况 -->
<!--		<div>-->
<!--			<view class="user-center-card__header" bind:tap="gotoUserEditPage">-->
<!--				<Avatar image="{{userInfo.avatarUrl || defaultAvatarUrl}}" class="user-center-card__header__avatar" />-->
<!--				<view class="user-center-card__header__name">{{'请登录'}}</view>-->
<!--			</view>-->
<!--		</div>-->
		<!-- 已登录但未授权用户信息情况 -->
<!--		<block wx:if="{{currAuthStep === AuthStepType.TWO}}">-->
<!--			<view class="user-center-card__header">-->
<!--				<Avatar image="{{userInfo.avatarUrl || defaultAvatarUrl}}" class="user-center-card__header__avatar" />-->
<!--				<view class="user-center-card__header__name">{{userInfo.nickName || '微信用户'}}</view>-->
<!--				&lt;!&ndash; 需要授权用户信息，通过slot添加弹窗 &ndash;&gt;-->
<!--				<view class="user-center-card__header__transparent" wx:if="{{isNeedGetUserInfo}}">-->
<!--					<slot name="getUserInfo" />-->
<!--				</view>-->
<!--				&lt;!&ndash; 不需要授权用户信息，仍然触发gotoUserEditPage事件 &ndash;&gt;-->
<!--				<view class="user-center-card__header__transparent" bind:tap="gotoUserEditPage" wx:else></view>-->
<!--			</view>-->
<!--		</block>-->
		<!-- 已登录且已经授权用户信息的情况 -->
		<div wx:if="{{currAuthStep === AuthStepType.THREE}}">
			<div class="user-center-card__header" @click="gotoUserEditPage">
				<t-avatar
					t-class="avatar"
					mode="aspectFill"
					class="user-center-card__header__avatar"
					image="https://we-retail-static-1300977798.cos.ap-guangzhou.myqcloud.com/retail-ui/components-exp/avatar/avatar-1.jpg"
				/>
				<div class="user-center-card__user__info">
					<div class="user-center-card__header__name">{{userInfo.nickName || '微信用户'}}</div>
					<div class="user-center-card__user__uid">UID: {{userInfo.uid || '未获取'}}</div>
					<div class="user-center-card__user__phone">手机号: {{ userInfo.phoneNumber  }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style>
@import url(./style.css);
</style>
