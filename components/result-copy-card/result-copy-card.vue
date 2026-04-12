<template>
	<view class="card card-surface" v-if="mainText">
		<text class="card__lead">{{ lead }}</text>
		<text class="card__p card__p--ref">{{ mainText }}</text>
		<text class="card__p muted" v-if="closingText">{{ closingText }}</text>
	</view>
</template>

<script setup>
defineProps({
	lead: {
		type: String,
		default: '各方向参考（事业 · 爱情 · 行程 · 决定）',
	},
	mainText: {
		type: String,
		default: '',
	},
	closingText: {
		type: String,
		default: '',
	},
})
</script>

<style scoped>
.card {
	margin-top: 16rpx;
	padding: 22rpx 20rpx;
}

.card__lead {
	display: block;
	font-size: 26rpx;
	font-weight: 700;
	color: #6b4e2e;
	margin-bottom: 14rpx;
	padding-bottom: 12rpx;
	border-bottom: 1rpx solid rgba(107, 78, 46, 0.12);
}

.card__p {
	display: block;
	font-size: 28rpx;
	color: #3a3228;
	line-height: 1.75;
	margin-bottom: 12rpx;
}

.card__p--ref {
	white-space: pre-wrap;
	word-break: break-word;
}

.muted {
	color: #8a7a66;
}
</style>
