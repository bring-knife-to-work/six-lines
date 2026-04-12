<template>
	<view class="page-bg page-pad">
		<view class="block card-surface">
			<text class="h">备案说明</text>
			<text class="p">{{ filing }}</text>
		</view>
		<view class="block card-surface">
			<text class="h">隐私说明</text>
			<text class="p">{{ privacy }}</text>
		</view>

		<ad-slot slot-key="privacy-bottom" />

		<compliance-footer />
	</view>
</template>

<script setup>
import { RECORD_FILING_TEXT, PRIVACY_SUMMARY_TEXT } from '@/config/app.js'

const filing = RECORD_FILING_TEXT
const privacy = PRIVACY_SUMMARY_TEXT
</script>

<style scoped>
.page-pad {
	padding: 26rpx 26rpx 44rpx;
	box-sizing: border-box;
}

.block {
	padding: 22rpx 18rpx;
	margin-bottom: 16rpx;
}

.h {
	font-size: 34rpx;
	font-weight: 900;
	color: #2b241c;
	display: block;
	margin-bottom: 12rpx;
}

.p {
	font-size: 28rpx;
	color: #3a3228;
	line-height: 1.85;
	display: block;
	white-space: pre-wrap;
}
</style>
