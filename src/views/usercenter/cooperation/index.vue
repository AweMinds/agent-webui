<script setup lang='ts'>
import {Icon as TIcon, Avatar, Cell as TCell, CellGroup as TCellGroup, Toast, Navbar as TNavbar,
	Input as TInput, Textarea as TTextarea, Button as TButton, Switch as TSwitch,
	Cascader as TCascader, DialogPlugin as TDialog} from 'tdesign-mobile-vue'
import { ref, computed } from 'vue';
import 'tdesign-mobile-vue/es/style/index.css'
import { CostItem as TCostItem } from '../components'
import {router} from "@/router";
import DialogPlugin from "tdesign-mobile-vue/es/dialog";

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


const privateData = {
	verifyTips: '',
}

const setData = (locationState) => {
	console.log("------setData---------")
	console.log(locationState)
}

const onInputValue = (e) => {
	console.log("----------onInputValue-----------")
	console.log(e)
}
const formSubmit = () => {
	console.log("----------formSubmit------------")
	console.log(locationState)
}

const locationState = ref({
	name: "demo",
	phone: "13929999999",
	provinceName: "广东",
	cityName: "深圳",
	districtName: '宝安区',
	detailAddress: '博林君瑞',
	labelIndex: 1,
	isDefault: 1,
	districtCode: "532800",
})
const submitActive = false

</script>

<template>
	<div class="flex flex-col w-full h-full page">
		<t-navbar title="合作意向" :fixed="false" left-arrow class="address-title" @left-click="handleClick" />

		<view class="address-detail">
		<view class="divider-line" />
		<view class="divider-line" />
		<view class="form-address">
			<form class="form-content">
				<t-cell-group>
					<t-cell class="form-cell" t-class-title="t-cell-title" title="姓名" t-class-note="t-cell-note">
						<t-input
							class="t-input"
							slot="note"
							t-class="field-text"
							borderless
							data-item="name"
							maxlength="20"
							type="text"
							v-model="locationState.name"
							placeholder="您的姓名"
							@change="onInputValue"
						/>
					</t-cell>
					<t-cell class="form-cell" t-class-title="t-cell-title" title="手机号">
						<t-input
							slot="note"
							class="t-input"
							t-class="field-text"
							borderless
							type="number"
							v-model="locationState.phone"
							maxlength="11"
							placeholder="联系您的手机号"
							data-item="phone"
						/>
					</t-cell>
					<t-cell class="form-cell" t-class-title="t-cell-title" title="合作方向" bordered="{{false}}">
						<view slot="note" class="textarea__wrapper">
							<t-textarea
								slot="note"
								type="text"
								placeholder="请填写具体的合作事宜"
								v-model="locationState.detailAddress"
								autosize
								data-item="detailAddress"
							/>
						</view>
					</t-cell>

					<view class="divider-line" />
				</t-cell-group>
				<view class="submit">
					<t-button shape="round" theme="primary" block :disabled="submitActive" @click="formSubmit"> 保存 </t-button>
				</view>
			</form>
		</view>
	</view>
	</div>
</template>

<style>
@import url(./style.css);
</style>
