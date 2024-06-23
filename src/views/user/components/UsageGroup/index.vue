<script lang="ts" setup>
import { Icon as TIcon,Avatar,Cell as TCell,CellGroup as TCellGroup, Toast, Badge as TBadge } from 'tdesign-mobile-vue'

const title = '我的AI'
const desc = '使用详情说明'
const count = 2

const showDetail = () => {
	console.log("---------------")
	console.log("click show detail")
}
</script>

<template>
	<view class="order-group">
		<t-cell-group wx:if="{{isTop}}">
			<t-cell class="order-group__top"
				t-class-left="order-group__left"
				t-class-title="order-group__top__title"
				t-class-note="order-group__top__note"
				title="剩余次数"
				note="消费详情"
				bordered='true'
				arrow
				@click="showDetail"
				bind:tap="onClickTop"
			/>
		</t-cell-group>
		<view class="order-group__content">
			<view class="order-group__item">
					230
			</view>
		</view>
	</view>
</template>

<style>
@import url(./style.css);
</style>
