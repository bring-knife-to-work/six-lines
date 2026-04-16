<template>
	<view class="page-bg page-pad" v-if="session">
		<view class="hd card-surface">
			<text v-if="session.themeName" class="hd__tag">{{ session.themeName }}</text>
			<text class="hd__name">{{ mainName }}</text>
			<text v-if="copy && copy.mnemonic" class="hd__m">口诀：{{ copy.mnemonic }}</text>
			<text class="hd__sub" v-if="changedName">变卦参考：{{ changedName }}</text>
		</view>

		<hexagram-lines :lines="session.lines" :king-wen-id="session.kingWenId" />

		<view class="card card-surface" v-if="copy && copy.detail">
			<text class="card__lead">卦象细解</text>
			<text class="card__p">{{ copy.detail }}</text>
		</view>

		<view class="card card-surface card--changed" v-if="copy && copy.changedLead">
			<text class="card__lead">{{ copy.changedTitle }}</text>
			<text class="card__p">{{ copy.changedLead }}</text>
			<text class="card__p" v-if="copy.changedBody">{{ copy.changedBody }}</text>
		</view>

		<result-copy-card
			v-if="copy && copy.referenceBlock"
			:main-text="copy.referenceBlock"
			:closing-text="copy.closing || ''"
		/>

		<view class="ops">
			<button class="u-btn u-btn--ghost" hover-class="u-hover" @click="again">再摇一次</button>
			<button
				v-if="saved"
				class="u-btn u-btn--primary u-btn--saved-done"
				hover-class="u-hover"
				@click="save"
			>
				已保存到记录
			</button>
			<button v-else class="u-btn u-btn--primary" hover-class="u-hover" @click="save">保存到记录</button>
			<button class="u-btn u-btn--line" hover-class="u-hover" @click="goHome">回首页</button>
		</view>

		<ad-slot slot-key="result-bottom" />

		<compliance-footer />
	</view>
	<view class="page-bg page-pad empty" v-else>
		<view class="empty__box card-surface">
			<text class="empty__t">暂无卦象数据，请从首页选择元素并开始摇卦</text>
			<button class="u-btn u-btn--primary" hover-class="u-hover" @click="goHome">回首页</button>
		</view>
		<compliance-footer />
	</view>
</template>

<script setup>
import { ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { loadSession, addRecord, getRecordById } from '@/utils/storage.js'
import { HEXAGRAM_NAMES, getHexagramCopy } from '@/data/hexagram-data.js'
import { buildSession } from '@/utils/i-ching.js'
import { usePageShare } from '@/utils/share-mp.js'

usePageShare({ title: '小万素盒易学研习 · 卦象参考', path: '/pages/result/result' })
const session = ref(null)
const saved = ref(false)

const mainName = ref('')
const changedName = ref('')
const copy = ref(null)

/** 在 onShow 读当前页参数（页面复用时 onLoad 可能不触发） */
function readResultPageOptions() {
	try {
		const pages = getCurrentPages()
		const cur = pages[pages.length - 1]
		const o = (cur && cur.options) || {}
		const rid = o.recordId ? decodeURIComponent(String(o.recordId)) : ''
		const fromShake = o.from === 'shake'
		return { recordId: rid, fromShake }
	} catch (e) {
		return { recordId: '', fromShake: false }
	}
}

function applyFromRecord(rec) {
	const built = buildSession(rec.lines)
	session.value = {
		ts: rec.ts,
		lines: rec.lines,
		...built,
		themeId: rec.themeId,
		themeName: rec.themeName,
	}
	saved.value = true
	mainName.value = HEXAGRAM_NAMES[session.value.kingWenId] || rec.mainName || ''
	changedName.value =
		session.value.changedKwId != null
			? HEXAGRAM_NAMES[session.value.changedKwId] || rec.changedName || ''
			: ''
	copy.value = getHexagramCopy(session.value.kingWenId, {
		changedKwId: session.value.changedKwId,
		movingIndexes: session.value.movingIndexes,
	})
}

function applyFromLoadedSession(s) {
	const prevTs = session.value && session.value.ts
	session.value = s
	if (!s) {
		saved.value = false
		mainName.value = ''
		changedName.value = ''
		copy.value = null
		return
	}
	if (prevTs !== s.ts) {
		saved.value = false
	}
	mainName.value = HEXAGRAM_NAMES[s.kingWenId] || ''
	changedName.value =
		s.changedKwId != null ? HEXAGRAM_NAMES[s.changedKwId] || '' : ''
	copy.value = getHexagramCopy(s.kingWenId, {
		changedKwId: s.changedKwId,
		movingIndexes: s.movingIndexes,
	})
}

function hydrate() {
	const { recordId: rid, fromShake } = readResultPageOptions()
	const s = loadSession()

	// 摇卦刚完成：必须用本地 session，不能用 URL 里残留的 recordId（否则会走 applyFromRecord 且 saved=true，保存被短路）
	if (fromShake) {
		if (s && Array.isArray(s.lines) && s.lines.length === 6) {
			applyFromLoadedSession(s)
			return
		}
		session.value = null
		saved.value = false
		mainName.value = ''
		changedName.value = ''
		copy.value = null
		return
	}

	if (rid) {
		const rec = getRecordById(rid)
		if (rec && Array.isArray(rec.lines) && rec.lines.length === 6) {
			applyFromRecord(rec)
			return
		}
		uni.showToast({ title: '记录不存在或已删除', icon: 'none' })
		if (s && Array.isArray(s.lines) && s.lines.length === 6) {
			applyFromLoadedSession(s)
			return
		}
		setTimeout(() => {
			uni.navigateBack({ fail: () => {} })
		}, 500)
		return
	}

	applyFromLoadedSession(s)
}

onShow(() => {
	hydrate()
})

function save() {
	if (!session.value || saved.value) return
	const s = session.value
	const id = `${s.ts}-${Math.random().toString(16).slice(2)}`
	addRecord({
		id,
		ts: s.ts,
		lines: s.lines,
		kingWenId: s.kingWenId,
		changedKwId: s.changedKwId,
		mainName: HEXAGRAM_NAMES[s.kingWenId],
		changedName: s.changedKwId != null ? HEXAGRAM_NAMES[s.changedKwId] : '',
		themeId: s.themeId,
		themeName: s.themeName,
	})
	saved.value = true
	uni.showToast({ title: '已保存', icon: 'success' })
}

function again() {
	uni.redirectTo({ url: '/pages/shake/shake' })
}

function goHome() {
	uni.switchTab({ url: '/pages/index/index' })
}
</script>

<style scoped>
.page-pad {
	padding: 26rpx 26rpx 44rpx;
	box-sizing: border-box;
}

.hd {
	padding: 20rpx 18rpx 18rpx;
	margin-bottom: 16rpx;
	text-align: center;
}

.hd__tag {
	display: inline-block;
	font-size: 22rpx;
	color: #6b4e2e;
	background: rgba(107, 78, 46, 0.1);
	border: 1rpx solid rgba(107, 78, 46, 0.18);
	padding: 6rpx 14rpx;
	border-radius: 999rpx;
	margin-bottom: 10rpx;
}

.hd__name {
	font-size: 38rpx;
	font-weight: 800;
	color: #2b241c;
	display: block;
}

.hd__m {
	margin-top: 10rpx;
	font-size: 34rpx;
	font-weight: 800;
	color: #6b4e2e;
	display: block;
	letter-spacing: 0.12em;
}

.hd__sub {
	margin-top: 12rpx;
	font-size: 28rpx;
	color: #5c4f42;
	display: block;
	line-height: 1.55;
}

.card {
	margin-top: 16rpx;
	padding: 22rpx 20rpx;
}

.card--changed {
	border: 1rpx solid rgba(107, 78, 46, 0.22);
	background: rgba(107, 78, 46, 0.04);
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

.muted {
	color: #8a7a66;
}

.ops {
	margin-top: 22rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.ops .u-btn + .u-btn {
	margin-top: 14rpx;
}

.u-btn {
	width: 100%;
	max-width: 620rpx;
	height: 96rpx;
	line-height: 96rpx;
	padding: 0 24rpx;
	border-radius: 48rpx;
	font-size: 32rpx;
	font-weight: 600;
	box-sizing: border-box;
	border: none;
}

.u-btn--primary {
	color: #fff;
	background: linear-gradient(180deg, #8b6f47 0%, #6b4e2e 100%);
}

/* 已保存：高对比绿色块 + 大字重，与棕色「保存」区分；不用 disabled 以免系统把字压灰 */
.u-btn--primary.u-btn--saved-done {
	color: #fff;
	font-size: 34rpx;
	font-weight: 800;
	letter-spacing: 0.1em;
	background: linear-gradient(180deg, #5f7d4e 0%, #3d5a35 100%);
	box-shadow: 0 10rpx 28rpx rgba(61, 90, 53, 0.38);
	border: 2rpx solid rgba(255, 255, 255, 0.35);
}

.u-btn--ghost {
	background: rgba(255, 255, 255, 0.92);
	color: #6b4e2e;
	border: 2rpx solid rgba(107, 78, 46, 0.28);
}

.u-btn--line {
	background: rgba(255, 255, 255, 0.55);
	color: #5c4f42;
	border: 2rpx solid rgba(107, 78, 46, 0.16);
}

.empty {
	min-height: 100vh;
	box-sizing: border-box;
}

.empty__box {
	padding: 34rpx 22rpx;
	margin-top: 40rpx;
	text-align: center;
}

.empty__t {
	display: block;
	font-size: 28rpx;
	color: #5c4f42;
	line-height: 1.65;
	margin-bottom: 18rpx;
}
</style>
