<template>
	<view class="cf">
		<text class="cf__t">{{ text }}</text>
	</view>
</template>

<script setup>
import { FOOTER_HINT } from '@/config/app.js'

defineProps({
	text: {
		type: String,
		default: FOOTER_HINT,
	},
})
</script>

<style scoped>
.cf {
	padding: 16rpx 24rpx 32rpx;
}

.cf__t {
	font-size: 24rpx;
	color: #8a7a66;
	line-height: 1.65;
}
</style>
