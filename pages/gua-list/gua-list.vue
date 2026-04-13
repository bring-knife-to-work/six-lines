<template>
	<view class="page-bg wrap">
		<text class="hint">点选卦名查看口诀与各方向解读（与摇卦结果同一套）。</text>
		<scroll-view class="sc" scroll-y :show-scrollbar="true">
			<view
				v-for="id in ids"
				:key="id"
				class="row card-surface"
				hover-class="u-hover"
				@click="open(id)"
			>
				<text class="row__g">{{ glyph(id) }}</text>
				<view class="row__m">
					<text class="row__n">{{ names[id] }}</text>
					<text class="row__k">{{ mnemonics[id] }}</text>
					<text class="row__i">周易序第 {{ id }} 卦</text>
				</view>
				<text class="row__a">解读</text>
			</view>
		</scroll-view>
	</view>
</template>

<script setup>
import { computed } from 'vue'
import { HEXAGRAM_NAMES, HEXAGRAM_MNEMONICS } from '@/data/hexagram-data.js'
import { useMpWeixinShare } from '@/utils/mp-weixin-share.js'

useMpWeixinShare({ path: '/pages/gua-list/gua-list' })

const names = HEXAGRAM_NAMES
const mnemonics = HEXAGRAM_MNEMONICS
const ids = computed(() => {
	const out = []
	for (let i = 1; i <= 64; i++) out.push(i)
	return out
})

function glyph(id) {
	return String.fromCodePoint(0x4dc0 + (id - 1))
}

function open(id) {
	uni.navigateTo({ url: `/pages/gua-detail/gua-detail?id=${id}` })
}
</script>

<style scoped>
.wrap {
	min-height: 100vh;
	padding: 20rpx 24rpx 32rpx;
	box-sizing: border-box;
}

.hint {
	display: block;
	font-size: 24rpx;
	color: #8a7a66;
	line-height: 1.55;
	margin-bottom: 16rpx;
	padding: 0 4rpx;
}

.sc {
	height: calc(100vh - 200rpx);
	box-sizing: border-box;
}

.row {
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 16rpx;
	padding: 18rpx 16rpx;
	margin-bottom: 12rpx;
}

.row__g {
	font-size: 52rpx;
	line-height: 1;
	color: #6b4e2e;
	flex: none;
	width: 72rpx;
	text-align: center;
}

.row__m {
	flex: 1;
	min-width: 0;
}

.row__n {
	display: block;
	font-size: 30rpx;
	font-weight: 700;
	color: #2b241c;
}

.row__k {
	display: block;
	margin-top: 6rpx;
	font-size: 26rpx;
	font-weight: 800;
	color: #6b4e2e;
	letter-spacing: 0.08em;
}

.row__i {
	display: block;
	margin-top: 6rpx;
	font-size: 22rpx;
	color: #9a8e80;
}

.row__a {
	font-size: 24rpx;
	color: #a67c52;
	flex: none;
}
</style>
