<template>
	<view class="page-bg page-pad page-pad--tab">
		<view v-if="list.length === 0" class="empty card-surface">
			<text class="empty__t">暂无记录。摇卦完成后可保存到此处（仅保存在本机）。</text>
		</view>

		<view v-else class="list">
			<view
				v-for="item in list"
				:key="item.id"
				class="row card-surface row--tap"
				@click="openDetail(item)"
			>
				<view class="row__main">
					<text class="row__t">{{ fmt(item.ts) }}</text>
					<text v-if="item.themeName" class="row__tag">{{ item.themeName }}</text>
					<text class="row__n">{{ itemTitle(item) }}</text>
					<text v-if="mne(item)" class="row__k">{{ mne(item) }}</text>
					<text class="row__s" v-if="item.changedName">变：{{ item.changedName }}</text>
					<text class="row__s" v-if="item.recordType === 'study' && item.lines && item.lines[0]">{{ item.lines[0] }}</text>
				</view>
				<text class="row__x" @click.stop="remove(item.id)">删除</text>
			</view>
		</view>

		<view class="bar" v-if="list.length">
			<button class="danger" @click="clear">清空全部</button>
		</view>

		<ad-slot slot-key="records-list" />

		<compliance-footer />
	</view>
</template>

<script setup>
import { ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { loadRecords, removeRecord, clearAllRecords } from '@/utils/storage.js'
import { getHexagramMnemonic } from '@/data/hexagram-data.js'
import { usePageShare } from '@/utils/share-mp.js'

usePageShare({ title: '我的记录 · 小万素盒易学研习', path: '/pages/records/records' })

const list = ref([])

function mne(item) {
	if (item && item.recordType === 'study') return ''
	const id = item && item.kingWenId
	return id ? getHexagramMnemonic(id) : ''
}

function refresh() {
	list.value = loadRecords()
}

function openDetail(item) {
	if (!item || !item.id) return
	if (item.recordType === 'study') {
		uni.showModal({
			title: item.toolName || '工具记录',
			content: (item.lines || []).join('\n'),
			showCancel: false,
		})
		return
	}
	uni.navigateTo({
		url:
			'/pages/result/result?recordId=' + encodeURIComponent(String(item.id)),
	})
}

function itemTitle(item) {
	if (!item) return '未命名记录'
	if (item.recordType === 'study') return item.title || item.toolName || '工具记录'
	return item.mainName || '卦象记录'
}

onShow(() => {
	refresh()
})

function fmt(ts) {
	const d = new Date(ts)
	const p = (n) => (n < 10 ? '0' + n : '' + n)
	return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(
		d.getMinutes(),
	)}`
}

function remove(id) {
	uni.showModal({
		title: '删除记录',
		content: '确定删除这一条？',
		success: (res) => {
			if (res.confirm) {
				removeRecord(id)
				refresh()
			}
		},
	})
}

function clear() {
	uni.showModal({
		title: '清空记录',
		content: '确定清空全部本地记录？',
		success: (res) => {
			if (res.confirm) {
				clearAllRecords()
				refresh()
			}
		},
	})
}
</script>

<style scoped>
.page-pad {
	padding: 26rpx 26rpx 32rpx;
	box-sizing: border-box;
}

.empty {
	padding: 34rpx 22rpx;
	margin-bottom: 16rpx;
}

.empty__t {
	font-size: 28rpx;
	color: #5c4f42;
	line-height: 1.7;
}

.list {
	display: flex;
	flex-direction: column;
	gap: 14rpx;
}

.row {
	padding: 20rpx 18rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 16rpx;
}

.row--tap:active {
	opacity: 0.88;
}

.row__t {
	font-size: 22rpx;
	color: #8a7a66;
	display: block;
}

.row__tag {
	display: inline-block;
	margin-top: 8rpx;
	font-size: 22rpx;
	color: #6b4e2e;
	background: rgba(107, 78, 46, 0.1);
	border: 1rpx solid rgba(107, 78, 46, 0.16);
	padding: 4rpx 12rpx;
	border-radius: 999rpx;
}

.row__n {
	font-size: 32rpx;
	color: #2b241c;
	font-weight: 800;
	margin-top: 10rpx;
	display: block;
}

.row__k {
	font-size: 26rpx;
	font-weight: 800;
	color: #6b4e2e;
	margin-top: 6rpx;
	display: block;
	letter-spacing: 0.06em;
}

.row__s {
	font-size: 26rpx;
	color: #5c4f42;
	margin-top: 6rpx;
	display: block;
	line-height: 1.45;
}

.row__x {
	font-size: 26rpx;
	color: #a67c52;
	padding: 10rpx 12rpx;
	flex: none;
}

.bar {
	margin-top: 16rpx;
}

.danger {
	width: 100%;
	max-width: 620rpx;
	margin: 0 auto;
	display: block;
	height: 92rpx;
	line-height: 92rpx;
	border-radius: 46rpx;
	font-size: 30rpx;
	font-weight: 600;
	border: 2rpx solid rgba(138, 74, 58, 0.35);
	background: rgba(255, 255, 255, 0.92);
	color: #8a4a3a;
}
</style>
