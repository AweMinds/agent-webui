<script setup lang='ts'>
import {Icon as TIcon, Avatar, Cell as TCell, CellGroup as TCellGroup, Toast, Navbar as TNavbar} from 'tdesign-mobile-vue'
import 'tdesign-mobile-vue/es/style/index.css'
import { CostItem as TCostItem } from '../components'
import {router} from "@/router";

const customService = () => {
	console.log("-----------------")
	console.log("click on customService")
}

const cooperation = () => {
	console.log("-----------------")
	console.log("click on cooperation")
}

const aboutUs = () => {
	console.log("-----------------")
	console.log("click on aboutUs")
}

const handleClick = ()=>{
	router.push("/usercenter")
}
</script>

<template>
	<div class="flex flex-col w-full h-full page">
		<t-navbar title="消费详情" :fixed="false" left-arrow class="address-title" @left-click="handleClick" />

		<view class="address-container">
			<view class="address-list" wx:if="{{addressList.length > 0}}">
				<block
					wx:for="{{addressList}}"
					wx:for-index="index"
					wx:for-item="address"
					wx:key="addressId"
				>
					<t-cost-item
						isDrawLine="{{index+1 !== addressList.length}}"
						extra-space="{{extraSpace}}"
						class-prefix="ym"
						address="{{address}}"
						data-id="{{address.id}}"
						bind:onSelect="selectHandle"
						bind:onDelete="deleteAddressHandle"
						bind:onEdit="editAddressHandle"
					/>
				</block>
			</view>
		</view>
	</div>
</template>

<style>
@import url(./style.css);
</style>
