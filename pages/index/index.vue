<template>
	<view class="page-bg page-pad page-pad--tab">
		<view class="hero card-surface">
			<text class="hero__title">小万素盒易学研习</text>
			<text class="hero__note">{{ toolOneLine }}</text>
		</view>

		<view class="gua card-surface" @click="goGuaList" hover-class="u-hover">
			<view class="gua__l">
				<text class="gua__t">六十四卦与解读</text>
				<text class="gua__d">查看全部卦名、卦象符号与固定方向解读</text>
			</view>
			<text class="gua__a">进入</text>
		</view>

		<view class="gua card-surface" @click="goTools" hover-class="u-hover">
			<view class="gua__l">
				<text class="gua__t">易学工具集</text>
				<text class="gua__d">梅花易数、八字排盘、干支历法、生肖研习、姓名解析</text>
			</view>
			<text class="gua__a">进入</text>
		</view>

		<view class="section">
			<view class="section__head">
				<text class="section__title">摇动元素</text>
				<text class="section__hint">
					以乾隆通宝规则为本位（字面阴、背阳）；硬币同法（国徽阴、花阳）。仅换配图与说明文字。
				</text>
			</view>
			<view class="themes">
				<view
					v-for="t in themes"
					:key="t.id"
					class="theme"
					:class="{ 'is-on': selectedId === t.id }"
					@click="pick(t.id)"
				>
					<image class="theme__img" :src="t.local" mode="aspectFill" />
					<view class="theme__txt">
						<text class="theme__name">{{ t.name }}</text>
						<text class="theme__s">{{ t.short }}</text>
					</view>
					<view v-if="selectedId === t.id" class="theme__check">✓</view>
				</view>
			</view>
		</view>

		<view id="shake-cta" class="cta card-surface">
			<button class="cta__btn" hover-class="u-hover" type="default" @click="goShake">
				开始摇卦
			</button>
		</view>

		<ad-slot slot-key="home-banner" />
	</view>
</template>

<script setup>
import { ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { HOME_TOOL_ONE_LINE } from '@/config/app.js'
import { SHAKE_THEMES } from '@/config/shake-themes.js'
import { getStoredThemeId, setStoredThemeId } from '@/utils/shake-theme.js'
import { usePageShare } from '@/utils/share-mp.js'

usePageShare({ title: '小万素盒易学研习', path: '/pages/index/index' })

const toolOneLine = HOME_TOOL_ONE_LINE
const themes = SHAKE_THEMES
const selectedId = ref(getStoredThemeId())

function pick(id) {
	selectedId.value = id
	setStoredThemeId(id)
}

function goShake() {
	uni.navigateTo({ url: '/pages/shake/shake' })
}

function goGuaList() {
	uni.navigateTo({ url: '/pages/gua-list/gua-list' })
}

function goTools() {
	uni.switchTab({ url: '/pages/tools/tools' })
}

onShow(() => {
	let focusShake = ''
	try {
		focusShake = uni.getStorageSync('sixlines_focus_shake_v1')
	} catch (e) {
		focusShake = ''
	}
	if (!focusShake) return
	try {
		uni.removeStorageSync('sixlines_focus_shake_v1')
	} catch (e) {}
	setTimeout(() => {
		uni.pageScrollTo({
			selector: '#shake-cta',
			duration: 280,
		})
	}, 80)
})
</script>

<style scoped>
.hero {
	padding: 28rpx 26rpx 24rpx;
	margin-bottom: 18rpx;
}

.hero__title {
	display: block;
	font-size: 44rpx;
	font-weight: 700;
	color: #2b241c;
	letter-spacing: 1rpx;
}

.hero__note {
	display: block;
	margin-top: 14rpx;
	font-size: 24rpx;
	color: #8a7a66;
	line-height: 1.55;
}

.gua {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	gap: 16rpx;
	padding: 22rpx 18rpx;
	margin-bottom: 22rpx;
}

.gua__l {
	flex: 1;
	min-width: 0;
}

.gua__t {
	display: block;
	font-size: 32rpx;
	font-weight: 800;
	color: #2b241c;
}

.gua__d {
	display: block;
	margin-top: 8rpx;
	font-size: 24rpx;
	color: #8a7a66;
	line-height: 1.5;
}

.gua__a {
	font-size: 26rpx;
	color: #a67c52;
	font-weight: 700;
	flex: none;
}

.section {
	margin-bottom: 22rpx;
}

.section__head {
	padding: 6rpx 6rpx 16rpx;
}

.section__title {
	font-size: 34rpx;
	font-weight: 700;
	color: #2b241c;
	display: block;
}

.section__hint {
	margin-top: 8rpx;
	font-size: 24rpx;
	color: #8a7a66;
	line-height: 1.55;
	display: block;
}

.themes {
	display: flex;
	flex-direction: column;
	gap: 14rpx;
}

.theme {
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 16rpx;
	padding: 16rpx;
	border-radius: 20rpx;
	border: 2rpx solid rgba(107, 78, 46, 0.14);
	background: rgba(255, 255, 255, 0.75);
	position: relative;
	overflow: hidden;
	transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
}

.theme.is-on {
	border-color: rgba(107, 78, 46, 0.55);
	box-shadow: 0 10rpx 30rpx rgba(45, 32, 18, 0.08);
	transform: translateY(-2rpx);
}

.theme__img {
	width: 112rpx;
	height: 112rpx;
	border-radius: 18rpx;
	background: #efe6d8;
	flex: none;
}

.theme__txt {
	flex: 1;
	min-width: 0;
}

.theme__name {
	display: block;
	font-size: 32rpx;
	font-weight: 700;
	color: #2b241c;
}

.theme__s {
	display: block;
	margin-top: 6rpx;
	font-size: 24rpx;
	color: #8a7a66;
}

.theme__check {
	width: 44rpx;
	height: 44rpx;
	border-radius: 999rpx;
	background: #6b4e2e;
	color: #fff;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 26rpx;
	font-weight: 800;
	flex: none;
}

.cta {
	padding: 22rpx 18rpx 24rpx;
	margin-bottom: 18rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.cta__btn {
	width: 100%;
	max-width: 620rpx;
	height: 96rpx;
	line-height: 96rpx;
	background: linear-gradient(180deg, #8b6f47 0%, #6b4e2e 100%);
	color: #fff;
	border-radius: 48rpx;
	font-size: 32rpx;
	font-weight: 600;
	border: none;
}
</style>
