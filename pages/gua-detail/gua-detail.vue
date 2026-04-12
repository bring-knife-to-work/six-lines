<template>
	<view class="page-bg page-pad" v-if="kid > 0 && copy">
		<view class="hd card-surface">
			<text class="hd__g">{{ glyph }}</text>
			<text class="hd__n">{{ name }}</text>
			<text v-if="copy.mnemonic" class="hd__m">口诀：{{ copy.mnemonic }}</text>
			<text class="hd__i">周易序第 {{ kid }} 卦</text>
		</view>

		<view class="card card-surface" v-if="copy.detail">
			<text class="card__lead">卦象细解</text>
			<text class="card__p">{{ copy.detail }}</text>
		</view>

		<result-copy-card
			v-if="copy.referenceBlock"
			:main-text="copy.referenceBlock"
			:closing-text="copy.closing || ''"
		/>

		<compliance-footer />
	</view>
	<view class="page-bg page-pad empty" v-else>
		<text class="empty__t">参数无效</text>
	</view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { HEXAGRAM_NAMES, getHexagramCopy } from '@/data/hexagram-data.js'

const kid = ref(0)
const copy = ref(null)

const name = computed(() => (kid.value > 0 ? HEXAGRAM_NAMES[kid.value] || '' : ''))
const glyph = computed(() =>
	kid.value > 0 ? String.fromCodePoint(0x4dc0 + (kid.value - 1)) : '',
)

onLoad((q) => {
	const n = parseInt(q.id, 10)
	if (n >= 1 && n <= 64) {
		kid.value = n
		copy.value = getHexagramCopy(n, { skipChangedNote: true })
	} else {
		kid.value = 0
		copy.value = null
	}
})
</script>

<style scoped>
.page-pad {
	padding: 24rpx 26rpx 44rpx;
	box-sizing: border-box;
	min-height: 100vh;
}

.hd {
	padding: 24rpx 18rpx;
	margin-bottom: 16rpx;
	text-align: center;
}

.hd__g {
	font-size: 120rpx;
	line-height: 1.1;
	color: #6b4e2e;
	display: block;
}

.hd__n {
	display: block;
	margin-top: 12rpx;
	font-size: 36rpx;
	font-weight: 800;
	color: #2b241c;
}

.hd__m {
	display: block;
	margin-top: 14rpx;
	font-size: 34rpx;
	font-weight: 800;
	color: #6b4e2e;
	letter-spacing: 0.12em;
}

.hd__i {
	display: block;
	margin-top: 8rpx;
	font-size: 24rpx;
	color: #8a7a66;
}

.card {
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

.empty {
	padding: 80rpx 24rpx;
}

.empty__t {
	font-size: 28rpx;
	color: #8a7a66;
}
</style>
