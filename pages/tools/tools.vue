<template>
	<view class="page-bg page-pad page-pad--tab">
		<view class="hero hero--banner">
			<text class="hero__badge">YI · STUDY</text>
			<text class="hero__t">易学工具集</text>
			<text class="hero__s">含六爻主流程与五个学习模块，统一用于查看与本地记录。</text>
		</view>
		<view class="list">
			<view
				v-for="tool in tools"
				:key="tool.id"
				class="row card-surface row--option"
				hover-class="u-hover"
				@click="openTool(tool.id)"
			>
				<view class="row__dot" />
				<view class="row__l">
					<text class="row__t">{{ tool.name }}</text>
					<text class="row__d">{{ tool.short }}</text>
				</view>
				<text class="row__a">立即使用</text>
			</view>
		</view>
		<compliance-footer />
	</view>
</template>

<script setup>
import { STUDY_TOOLS } from '@/data/study-tools.js'
import { usePageShare } from '@/utils/share-mp.js'

usePageShare({ title: '小万素盒易学研习 · 易学工具集', path: '/pages/tools/tools' })

const tools = STUDY_TOOLS

function openTool(id) {
	if (id === 'liuyao') {
		try {
			uni.setStorageSync('sixlines_focus_shake_v1', '1')
		} catch (e) {}
		uni.switchTab({ url: '/pages/index/index' })
		return
	}
	uni.navigateTo({ url: `/pages/tool-workbench/tool-workbench?tool=${encodeURIComponent(id)}` })
}
</script>

<style scoped>
.page-pad {
	padding: 26rpx 26rpx 32rpx;
	box-sizing: border-box;
}

.hero {
	padding: 26rpx 22rpx;
	margin-bottom: 16rpx;
}

.hero--banner {
	border-radius: 24rpx;
	background: linear-gradient(135deg, #6b4e2e 0%, #8b6f47 55%, #b69365 100%);
	box-shadow: 0 14rpx 34rpx rgba(107, 78, 46, 0.2);
}

.hero__badge {
	display: inline-block;
	padding: 8rpx 14rpx;
	border-radius: 999rpx;
	background: rgba(255, 255, 255, 0.2);
	color: #fff4de;
	font-size: 20rpx;
	letter-spacing: 0.08em;
}

.hero__t {
	font-size: 38rpx;
	font-weight: 900;
	color: #fff;
	display: block;
	margin-top: 12rpx;
}

.hero__s {
	margin-top: 8rpx;
	font-size: 24rpx;
	color: rgba(255, 248, 235, 0.9);
	display: block;
	line-height: 1.55;
}

.list {
	display: flex;
	flex-direction: column;
	gap: 12rpx;
}

.row {
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 16rpx;
	padding: 22rpx 18rpx;
}

.row--option {
	border: 1rpx solid rgba(107, 78, 46, 0.18);
	background: linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(251, 246, 237, 0.98) 100%);
}

.row__dot {
	width: 16rpx;
	height: 16rpx;
	border-radius: 999rpx;
	background: #8b6f47;
	flex: none;
	box-shadow: 0 0 0 8rpx rgba(139, 111, 71, 0.14);
}

.row__l {
	flex: 1;
	min-width: 0;
}

.row__t {
	display: block;
	font-size: 30rpx;
	font-weight: 800;
	color: #2b241c;
}

.row__d {
	display: block;
	margin-top: 6rpx;
	font-size: 24rpx;
	color: #8a7a66;
}

.row__a {
	font-size: 24rpx;
	color: #6b4e2e;
	font-weight: 700;
	padding: 10rpx 16rpx;
	border-radius: 999rpx;
	background: rgba(107, 78, 46, 0.1);
}
</style>
