<script lang="ts" setup>
import { Icon as TIcon,Avatar,Cell as TCell,CellGroup as TCellGroup, Toast, Badge as TBadge, SwipeCell as TSwipeCell } from 'tdesign-mobile-vue'
const address={
	name: 'test address name',
	phoneNumber: '139333333',
	isDefault: 1,
	tag: 'tag',
	address: 'address........',
}

const usage={
	time: '2024-06-04 13:03:03',
	count: '1',
}
</script>

<template>
	<div class="address-item-wrapper item-wrapper-class">
		<div class="cell-box">
			<t-cell v-bind:title="usage.time" v-bind:note="-usage.count" :bordered="true"/>
			<t-cell v-bind:title="usage.time" v-bind:note="-usage.count" :bordered="true"/>
			<t-cell v-bind:title="usage.time" v-bind:note="-usage.count" :bordered="true"/>
		</div>
	</div>
</template>

<style>
@import url(./style.css);
</style>
