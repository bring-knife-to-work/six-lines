<template>
	<view class="page-bg">
		<view class="top card-surface">
			<text class="top__badge">{{ theme.name }}</text>
			<text class="top__t">第 {{ step }} / 6 次</text>
			<view class="dots" aria-hidden="true">
				<view v-for="n in 6" :key="n" class="dot" :class="{ on: n <= step }" />
			</view>
		</view>

		<view class="legend card-surface">
			<text class="legend__title">阴阳对应（古法简记）</text>
			<view class="legend__row">
				<text class="pill pill--yin">阴</text>
				<text class="legend__txt">{{ theme.yinHint }}</text>
			</view>
			<view class="legend__row">
				<text class="pill pill--yang">阳</text>
				<text class="legend__txt">{{ theme.yangHint }}</text>
			</view>
			<text class="legend__note">{{ theme.note }}</text>
		</view>

		<view class="stage">
			<view class="coins" :class="{ shaking: anim }">
				<view v-for="(tag, i) in coinTags" :key="i" class="coin-col">
					<view class="coin-scene">
						<view
							class="coin-axis"
							:class="{ 'coin-axis--run': anim }"
							:style="coinAxisStyle(i)"
						>
							<view class="coin-side coin-side--yang">
								<image class="coin__bg" :src="yangFaceSrc" mode="aspectFill" />
								<view class="coin__mask" />
							</view>
							<view class="coin-side coin-side--yin">
								<image class="coin__bg" :src="yinFaceSrc" mode="aspectFill" />
								<view class="coin__mask" />
							</view>
						</view>
					</view>
					<text
						class="coin__label"
						:class="busy ? 'coin__label--busy' : lastFaces[i] ? 'coin__label--yang' : 'coin__label--yin'"
					>
						{{ busy ? '···' : tag }}
					</text>
				</view>
			</view>
			<text class="hint">
				提示：三枚「阳面朝上」枚数定爻象（与上栏说明一致）。首选乾隆通宝：字面为阴、满文背为阳；硬币：字/国徽为阴、花/图案为阳。
			</text>
		</view>

		<view class="last card-surface">
			<text class="last__k">本次爻象</text>
			<text class="last__v" :class="{ 'last__v--ph': !lastLabel }">{{ lastDisplay }}</text>
		</view>

		<button class="btn" hover-class="u-hover" :disabled="busy || done" @click="onShake">
			{{ done ? '已完成' : busy ? '摇动中…' : '摇卦' }}
		</button>

		<ad-slot slot-key="shake-flow" />

		<compliance-footer />
	</view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { APP_NAME } from '@/config/app.js'
import { tossOnce, buildSession } from '@/utils/i-ching.js'
import { saveSession, clearSession } from '@/utils/storage.js'
import { getStoredTheme, resolveThemeImage } from '@/utils/shake-theme.js'
import { themeFaceImageSrc } from '@/utils/shake-face-map.js'
import { useMpWeixinShare } from '@/utils/mp-weixin-share.js'

useMpWeixinShare({ title: `摇卦 · ${APP_NAME}`, path: '/pages/shake/shake' })

/** 与 .coin-axis--run 动画时长一致（略长于 0.82s，含错开延迟） */
const SHAKE_MS = 880

const theme = ref(getStoredTheme())

const lines = ref([])
const step = computed(() => lines.value.length)
const done = computed(() => lines.value.length >= 6)
const anim = ref(false)
const busy = ref(false)
const lastLabel = ref('')
const lastFaces = ref([0, 0, 0])

const coinTags = computed(() => lastFaces.value.map((h) => (h ? '阳' : '阴')))

const yangFaceSrc = computed(() => themeFaceImageSrc(theme.value, 1))
const yinFaceSrc = computed(() => themeFaceImageSrc(theme.value, 0))

/** 摇动结束后的静止姿态：阳面朝上→0°，阴面朝上→180° */
function coinAxisStyle(i) {
	if (anim.value) {
		return { animationDelay: `${i * 48}ms` }
	}
	const ry = lastFaces.value[i] ? 0 : 180
	return {
		transform: `rotateY(${ry}deg) rotateZ(0deg) translateY(0)`,
		transition: 'transform 0.36s cubic-bezier(0.33, 1.24, 0.64, 1)',
	}
}

const lastSumText = computed(() => {
	const s = lastFaces.value.reduce((a, b) => a + b, 0)
	return `阳面朝上 ${s} 枚`
})

/** 固定占位，避免首次出爻后整块区域增高导致布局跳动 */
const lastDisplay = computed(() => {
	if (busy.value) return '钱币翻转中，请稍候…'
	if (!lastLabel.value) return '点击下方「摇卦」，结果将显示在这里'
	return `${lastLabel.value}（${lastSumText.value}）`
})

onLoad(async () => {
	clearSession()
	lines.value = []
	lastLabel.value = ''
	lastFaces.value = [0, 0, 0]
	theme.value = getStoredTheme()
	await resolveThemeImage(theme.value)
})

function onShake() {
	if (busy.value || done.value) return
	busy.value = true
	anim.value = true
	// #ifdef MP-WEIXIN
	uni.vibrateShort({ type: 'light' })
	// #endif
	setTimeout(() => {
		const t = tossOnce()
		lastFaces.value = t.faces.slice()
		lastLabel.value = t.label
		lines.value = lines.value.concat(t.value)
		anim.value = false
		busy.value = false
		if (lines.value.length === 6) {
			const th = getStoredTheme()
			const session = {
				ts: Date.now(),
				lines: lines.value.slice(),
				...buildSession(lines.value.slice()),
				themeId: th.id,
				themeName: th.name,
			}
			clearSession()
			saveSession(session)
			setTimeout(() => {
				// from=shake：结果页据此优先用 loadSession，忽略 URL 里可能残留的 recordId（否则 saved 恒为 true 无法写入新记录）
				uni.redirectTo({
					url: '/pages/result/result?from=shake&t=' + Date.now(),
				})
			}, 420)
		}
	}, SHAKE_MS)
}
</script>

<style scoped>
.page-bg {
	min-height: 100vh;
	padding: 26rpx 26rpx 44rpx;
	box-sizing: border-box;
}

.top {
	padding: 18rpx 18rpx 16rpx;
	margin-bottom: 16rpx;
}

.top__badge {
	display: inline-block;
	font-size: 22rpx;
	color: #6b4e2e;
	background: rgba(107, 78, 46, 0.1);
	border: 1rpx solid rgba(107, 78, 46, 0.18);
	padding: 6rpx 14rpx;
	border-radius: 999rpx;
	margin-bottom: 10rpx;
}

.top__t {
	display: block;
	text-align: center;
	font-size: 30rpx;
	font-weight: 700;
	color: #2b241c;
	margin-bottom: 12rpx;
}

.dots {
	display: flex;
	justify-content: center;
	gap: 12rpx;
}

.dot {
	width: 16rpx;
	height: 16rpx;
	border-radius: 50%;
	background: #e2d8c8;
}

.dot.on {
	background: #6b4e2e;
}

.legend {
	padding: 18rpx 18rpx;
	margin-bottom: 16rpx;
}

.legend__title {
	display: block;
	font-size: 28rpx;
	font-weight: 800;
	color: #2b241c;
	margin-bottom: 12rpx;
}

.legend__row {
	display: flex;
	align-items: flex-start;
	gap: 12rpx;
	margin-bottom: 10rpx;
}

.pill {
	width: 52rpx;
	height: 44rpx;
	border-radius: 12rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 24rpx;
	font-weight: 900;
	flex: none;
	margin-top: 2rpx;
}

.pill--yang {
	background: rgba(107, 78, 46, 0.12);
	color: #6b4e2e;
	border: 1rpx solid rgba(107, 78, 46, 0.22);
}

.pill--yin {
	background: rgba(60, 60, 60, 0.08);
	color: #4a4036;
	border: 1rpx solid rgba(60, 60, 60, 0.14);
}

.legend__txt {
	flex: 1;
	font-size: 26rpx;
	color: #5c4f42;
	line-height: 1.65;
}

.legend__note {
	display: block;
	margin-top: 8rpx;
	font-size: 22rpx;
	color: #8a7a66;
	line-height: 1.55;
}

.stage {
	margin: 10rpx 0 18rpx;
}

.coins {
	display: flex;
	justify-content: center;
	align-items: flex-start;
	gap: 22rpx;
	margin: 18rpx 0 12rpx;
	transition: opacity 0.2s;
}

.coin-col {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 12rpx;
}

.coins.shaking {
	opacity: 0.92;
}

/* 3D：摇卦时绕 Y 轴连续翻面 + 绕 Z 旋转，模拟钱币在空中翻滚 */
.coin-scene {
	width: 200rpx;
	height: 200rpx;
	perspective: 520rpx;
	perspective-origin: 50% 45%;
}

.coin-axis {
	width: 100%;
	height: 100%;
	position: relative;
	transform-style: preserve-3d;
	box-shadow: 0 14rpx 34rpx rgba(40, 30, 20, 0.12);
	border-radius: 50%;
}

.coin-axis--run {
	animation: coinRumbleFlip 0.82s ease-in-out forwards;
}

.coin-side {
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	border-radius: 50%;
	overflow: hidden;
	backface-visibility: hidden;
	border: 6rpx solid rgba(107, 78, 46, 0.35);
	box-sizing: border-box;
	background: #efe6d8;
}

.coin-side--yang {
	transform: translateZ(2rpx);
}

.coin-side--yin {
	transform: rotateY(180deg) translateZ(2rpx);
}

.coin__bg {
	width: 100%;
	height: 100%;
}

.coin__mask {
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	background: radial-gradient(circle at 30% 25%, rgba(255, 255, 255, 0.22), transparent 55%);
}

.coin__label {
	min-width: 72rpx;
	text-align: center;
	padding: 6rpx 14rpx;
	border-radius: 999rpx;
	font-size: 28rpx;
	font-weight: 900;
	line-height: 1.2;
}

.coin__label--yang {
	color: #6b4e2e;
	background: rgba(107, 78, 46, 0.12);
	border: 1rpx solid rgba(107, 78, 46, 0.22);
}

.coin__label--yin {
	color: #4a4036;
	background: rgba(60, 60, 60, 0.08);
	border: 1rpx solid rgba(60, 60, 60, 0.14);
}

.coin__label--busy {
	color: #8a7a66;
	background: rgba(107, 78, 46, 0.06);
	border: 1rpx solid rgba(107, 78, 46, 0.12);
}

.hint {
	display: block;
	text-align: center;
	font-size: 22rpx;
	color: #8a7a66;
	line-height: 1.55;
	padding: 0 8rpx;
}

.last {
	padding: 16rpx 18rpx;
	margin-bottom: 16rpx;
	/* 固定高度：出爻前后区域占位一致，不因 v-if 或文案出现而整体变高 */
	height: 176rpx;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	justify-content: center;
	overflow: hidden;
}

.last__k {
	display: block;
	font-size: 22rpx;
	color: #8a7a66;
	margin-bottom: 8rpx;
	flex: none;
}

.last__v {
	display: block;
	font-size: 30rpx;
	font-weight: 800;
	color: #2b241c;
	line-height: 1.45;
	flex: 1;
	word-break: break-all;
	overflow: hidden;
}

.last__v--ph {
	font-weight: 600;
	font-size: 26rpx;
	color: #b5a896;
}

.btn {
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
	margin: 0 auto;
	display: block;
}

@keyframes coinRumbleFlip {
	0% {
		transform: rotateY(0deg) rotateZ(0deg) translateY(0);
	}
	18% {
		transform: rotateY(220deg) rotateZ(85deg) translateY(-20rpx);
	}
	38% {
		transform: rotateY(480deg) rotateZ(175deg) translateY(10rpx);
	}
	58% {
		transform: rotateY(740deg) rotateZ(255deg) translateY(-14rpx);
	}
	78% {
		transform: rotateY(900deg) rotateZ(320deg) translateY(6rpx);
	}
	/* 结束于 1080°=3 圈，与正面（阳面）0° 对齐，避免动画末尾停在半翻面 */
	100% {
		transform: rotateY(1080deg) rotateZ(360deg) translateY(0);
	}
}
</style>
