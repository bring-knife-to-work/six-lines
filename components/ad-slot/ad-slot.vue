<template>
	<!-- 广告位预留：默认不占版面、不渲染平台广告组件 -->
	<view v-if="visible" class="ad-slot" :class="rootClass" :style="rootStyle">
		<!-- #ifdef MP-WEIXIN -->
		<ad
			v-if="useNativeAd"
			class="ad-slot__native"
			:unit-id="unitId"
			@load="onLoad"
			@error="onError"
		/>
		<!-- #endif -->
	</view>
</template>

<script setup>
import { computed } from 'vue'
import { AD_ENABLED } from '@/config/app.js'

const props = defineProps({
	/** 业务侧区分的插槽位标识，便于以后统计/排期 */
	slotKey: {
		type: String,
		default: 'default',
	},
	/** 微信 mp 原生广告位 ID，未配置时不展示 */
	unitId: {
		type: String,
		default: '',
	},
	/** 额外 class */
	extClass: {
		type: String,
		default: '',
	},
	/** 预留高度（rpx），关闭广告时为 0 */
	reservedHeightRpx: {
		type: Number,
		default: 0,
	},
})

const visible = computed(() => AD_ENABLED && !!props.unitId)
const useNativeAd = computed(() => visible.value)

const rootClass = computed(() => props.extClass)
const rootStyle = computed(() => {
	if (!visible.value && props.reservedHeightRpx > 0) {
		return { minHeight: props.reservedHeightRpx + 'rpx' }
	}
	return {}
})

function onLoad() {}
function onError() {}
</script>

<style scoped>
.ad-slot {
	width: 100%;
	box-sizing: border-box;
}

.ad-slot__native {
	width: 100%;
	display: block;
}
</style>
