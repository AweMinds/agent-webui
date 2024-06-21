<script lang="ts" setup>
import { computed, nextTick,ref,watch  } from 'vue'
import { HoverButton, SvgIcon } from '@/components/common'
import {  gptConfigStore, homeStore, useAppStore, useChatStore } from '@/store'
import { useBasicLayout } from '@/hooks/useBasicLayout'
import {NModal} from "naive-ui"
import aiModel from "@/views/mj/aiModel.vue"
import { chatSetting } from '@/api'

import { Icon,Avatar } from 'tdesign-vue-next';

const { isMobile } = useBasicLayout()

interface Props {
  usingContext: boolean
}

interface Emit {
  (ev: 'export'): void
  (ev: 'handleClear'): void
}

defineProps<Props>()

const emit = defineEmits<Emit>()

const appStore = useAppStore()
const chatStore = useChatStore()

const collapsed = computed(() => appStore.siderCollapsed)
const currentChatHistory = computed(() => chatStore.getChatHistoryByCurrentActive)

function handleUpdateCollapsed() {
  appStore.setSiderCollapsed(!collapsed.value)
}

function onScrollToTop() {
  const scrollRef = document.querySelector('#scrollRef')
  if (scrollRef)
    nextTick(() => scrollRef.scrollTop = 0)
}

function handleExport() {
  emit('export')
}

function handleClear() {
  emit('handleClear')
}
const uuid = chatStore.active;
const chatSet = new chatSetting( uuid==null?1002:uuid);
const nGptStore = ref( chatSet.getGptConfig())  ;
const st = ref({isShow:false});
watch(()=>gptConfigStore.myData,()=>nGptStore.value=  chatSet.getGptConfig() , {deep:true})
watch(()=>homeStore.myData.act,(n)=> n=='saveChat' && (nGptStore.value=  chatSet.getGptConfig() ), {deep:true})
</script>

<template>
	<view class="user-center-card">
		<!-- 未登录的情况 -->
		<block wx:if="{{currAuthStep === AuthStepType.ONE}}">
			<view class="user-center-card__header" bind:tap="gotoUserEditPage">
				<Avatar image="{{userInfo.avatarUrl || defaultAvatarUrl}}" class="user-center-card__header__avatar" />
				<view class="user-center-card__header__name">{{'请登录'}}</view>
			</view>
		</block>
		<!-- 已登录但未授权用户信息情况 -->
		<block wx:if="{{currAuthStep === AuthStepType.TWO}}">
			<view class="user-center-card__header">
				<Avatar image="{{userInfo.avatarUrl || defaultAvatarUrl}}" class="user-center-card__header__avatar" />
				<view class="user-center-card__header__name">{{userInfo.nickName || '微信用户'}}</view>
				<!-- 需要授权用户信息，通过slot添加弹窗 -->
				<view class="user-center-card__header__transparent" wx:if="{{isNeedGetUserInfo}}">
					<slot name="getUserInfo" />
				</view>
				<!-- 不需要授权用户信息，仍然触发gotoUserEditPage事件 -->
				<view class="user-center-card__header__transparent" bind:tap="gotoUserEditPage" wx:else></view>
			</view>
		</block>
		<!-- 已登录且已经授权用户信息的情况 -->
		<block wx:if="{{currAuthStep === AuthStepType.THREE}}">
			<view class="user-center-card__header" bind:tap="gotoUserEditPage">
				<Avatar
					t-class="avatar"
					mode="aspectFill"
					class="user-center-card__header__avatar"
					image="{{userInfo.avatarUrl || defaultAvatarUrl}}"
				/>
				<view class="user-center-card__header__name">{{userInfo.nickName || '微信用户'}}</view>
			</view>
		</block>
	</view>
</template>
