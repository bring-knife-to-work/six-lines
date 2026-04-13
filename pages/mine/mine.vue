<template>
	<view class="page-bg page-pad page-pad--tab">
		<view class="hero card-surface">
			<text class="hero__t">我的</text>
			<text class="hero__s">设置与说明入口</text>
		</view>

		<view class="list card-surface">
			<view class="cell" @click="goRecords">
				<view class="cell__l">
					<text class="cell__t">卦象历史</text>
					<text class="cell__d">查看本机保存的卦象记录</text>
				</view>
				<text class="cell__a">进入</text>
			</view>
			<view class="cell" @click="goPrivacy">
				<view class="cell__l">
					<text class="cell__t">隐私说明</text>
					<text class="cell__d">备案与数据仅本地说明</text>
				</view>
				<text class="cell__a">查看</text>
			</view>
		</view>

		<view class="oa card-surface">
			<text class="oa__t">微信公众号</text>
			<text class="oa__d">打开微信 → 右上角搜索 → 输入「小万素盒工具」→ 进入公众号关注或获取更多说明。</text>
			<text class="oa__hint">搜索关键词：小万素盒工具</text>
		</view>

		<ad-slot slot-key="mine-bottom" />

		<compliance-footer />
	</view>
</template>

<script setup>
import { useMpWeixinShare } from '@/utils/mp-weixin-share.js'

useMpWeixinShare({ path: '/pages/mine/mine' })

function goRecords() {
	uni.switchTab({ url: '/pages/records/records' })
}

function goPrivacy() {
	uni.navigateTo({ url: '/pages/privacy/privacy' })
}
</script>

<style scoped>
.page-pad {
	padding: 26rpx 26rpx 32rpx;
	box-sizing: border-box;
}

.hero {
	padding: 22rpx 18rpx;
	margin-bottom: 16rpx;
}

.hero__t {
	font-size: 40rpx;
	font-weight: 900;
	color: #2b241c;
	display: block;
}

.hero__s {
	margin-top: 10rpx;
	font-size: 26rpx;
	color: #8a7a66;
	line-height: 1.55;
	display: block;
}

.list {
	overflow: hidden;
	margin-bottom: 16rpx;
}

.cell {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 16rpx;
	padding: 22rpx 18rpx;
	border-bottom: 1rpx solid rgba(107, 78, 46, 0.1);
}

.cell:last-child {
	border-bottom: none;
}

.cell__l {
	flex: 1;
	min-width: 0;
}

.cell__t {
	font-size: 32rpx;
	font-weight: 800;
	color: #2b241c;
	display: block;
}

.cell__d {
	margin-top: 6rpx;
	font-size: 24rpx;
	color: #8a7a66;
	line-height: 1.45;
	display: block;
}

.cell__a {
	font-size: 26rpx;
	color: #a67c52;
	font-weight: 700;
	flex: none;
}

.oa {
	padding: 22rpx 18rpx;
}

.oa__t {
	font-size: 32rpx;
	font-weight: 900;
	color: #2b241c;
	display: block;
	margin-bottom: 10rpx;
}

.oa__d {
	font-size: 26rpx;
	color: #5c4f42;
	line-height: 1.7;
	display: block;
}

.oa__hint {
	margin-top: 14rpx;
	font-size: 28rpx;
	font-weight: 800;
	color: #6b4e2e;
	line-height: 1.55;
	display: block;
	letter-spacing: 0.04em;
}
</style>
