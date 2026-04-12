<template>
	<view class="hx">
		<text v-if="showGlyph" class="hx__glyph">{{ glyph }}</text>
		<view class="hx__stack">
			<view v-for="row in rowsUi" :key="row.rowKey" class="hx__line">
				<text class="hx__pos">{{ row.pos }}</text>
				<view class="hx__bar">
					<view v-if="row.kind === 'yang'" class="hx__yang" />
					<view v-else class="hx__yin">
						<view class="hx__seg" />
						<view class="hx__gap" />
						<view class="hx__seg" />
					</view>
					<text v-if="row.mark" class="hx__mv">{{ row.mark }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { computed } from 'vue'

const POS = ['初爻', '二爻', '三爻', '四爻', '五爻', '上爻']

const props = defineProps({
	/** 自下而上六爻：6/7/8/9 */
	lines: {
		type: Array,
		required: true,
	},
	/** 周易序 1–64，用于卦象符号 */
	kingWenId: {
		type: Number,
		default: 1,
	},
	showGlyph: {
		type: Boolean,
		default: true,
	},
})

const glyph = computed(() => {
	const id = props.kingWenId
	if (id < 1 || id > 64) return ''
	return String.fromCodePoint(0x4dc0 + (id - 1))
})

/** 展示顺序：上爻在上 */
const rowsUi = computed(() => {
	const out = []
	for (let i = 5; i >= 0; i--) {
		const v = props.lines[i]
		const yang = v === 7 || v === 9
		let mark = ''
		if (v === 9) mark = '○'
		if (v === 6) mark = '×'
		out.push({
			rowKey: 'L' + i,
			pos: POS[i],
			kind: yang ? 'yang' : 'yin',
			mark,
		})
	}
	return out
})
</script>

<style scoped>
.hx {
	align-items: center;
}

.hx__glyph {
	font-size: 120rpx;
	line-height: 1.2;
	color: #6b4e2e;
	text-align: center;
	display: block;
	margin-bottom: 24rpx;
}

.hx__stack {
	width: 100%;
}

.hx__line {
	display: flex;
	align-items: center;
	margin-bottom: 18rpx;
}

.hx__pos {
	width: 88rpx;
	font-size: 22rpx;
	color: #8a7a66;
}

.hx__bar {
	flex: 1;
	display: flex;
	align-items: center;
}

.hx__yang {
	height: 12rpx;
	background: #6b4e2e;
	border-radius: 4rpx;
	flex: 1;
}

.hx__yin {
	flex: 1;
	display: flex;
	align-items: center;
}

.hx__seg {
	height: 12rpx;
	background: #6b4e2e;
	border-radius: 4rpx;
	flex: 1;
}

.hx__gap {
	width: 40rpx;
}

.hx__mv {
	margin-left: 16rpx;
	font-size: 22rpx;
	color: #b8860b;
}
</style>
