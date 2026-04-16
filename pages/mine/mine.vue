<template>
	<view class="page-bg page-pad page-pad--tab">
		<view class="hero card-surface">
			<text class="hero__t">关于与说明</text>
			<text class="hero__s">项目工具科普、作用说明、隐私说明与公众号引导</text>
		</view>

		<view class="list card-surface">
			<text class="sec__title">工具科普与作用</text>
			<view v-for="tool in tools" :key="tool.id" class="tool">
				<text class="tool__name">{{ tool.name }}</text>
				<text class="tool__p">说明：{{ tool.science }}</text>
				<text class="tool__u">{{ tool.usage }}</text>
			</view>
		</view>

		<view class="list card-surface">
			<text class="sec__title">隐私说明</text>
			<view class="privacy-row" @click="showPrivacyBrief">
				<view class="privacy-row__l">
					<text class="privacy-row__t">隐私说明（简版）</text>
					<text class="privacy-row__d">点击查看弹窗说明，风格与示例一致</text>
				</view>
				<text class="privacy-row__a">查看</text>
			</view>
			<text class="sec__p">{{ filing }}</text>
			<text class="sec__p">{{ privacy }}</text>
		</view>

		<view class="follow-tip card-surface">
			<text class="follow-title">关注公众号</text>
			<text class="follow-text">扫码关注「小万素盒工具」，使用更多实用有趣的工具吧。</text>
			<image
				class="follow-qrcode"
				:src="qrcodeSrc"
				mode="widthFix"
				show-menu-by-longpress
			/>
			<text class="follow-sub">长按图片识别二维码关注</text>
		</view>

		<ad-slot slot-key="mine-bottom" />

		<compliance-footer />
	</view>
</template>

<script setup>
import { STUDY_TOOLS } from '@/data/study-tools.js'
import { RECORD_FILING_TEXT, PRIVACY_SUMMARY_TEXT } from '@/config/app.js'
import qrcodeSrc from '@/static/qrcode_for_gh_6f128cd84fa1_258.jpg'
import { usePageShare } from '@/utils/share-mp.js'

usePageShare({ title: '关于与说明 · 小万素盒易学研习', path: '/pages/mine/mine' })
const tools = STUDY_TOOLS
const filing = RECORD_FILING_TEXT
const privacy = PRIVACY_SUMMARY_TEXT

function showPrivacyBrief() {
	uni.showModal({
		title: '隐私说明',
		content:
			'小万素盒易学研习是民俗文化学习工具，提供六爻与易学工具集等学习向功能。所有结果仅供学习参考，不构成建议；不收集姓名、生日、联系方式等个人信息，数据仅保存在本机，不上传服务器。',
		showCancel: false,
	})
}
</script>

<style scoped>
.page-pad {
	padding: 26rpx 26rpx 32rpx;
	box-sizing: border-box;
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
	padding: 22rpx 18rpx;
	display: flex;
	flex-direction: column;
	gap: 14rpx;
	margin-bottom: 16rpx;
}

.sec__title {
	font-size: 32rpx;
	font-weight: 900;
	color: #2b241c;
	display: block;
}

.tool {
	padding-top: 12rpx;
	border-top: 1rpx solid rgba(107, 78, 46, 0.12);
}

.tool:first-of-type {
	border-top: none;
	padding-top: 0;
}

.tool__name {
	font-size: 28rpx;
	font-weight: 800;
	color: #2b241c;
	display: block;
}

.tool__p {
	margin-top: 6rpx;
	font-size: 24rpx;
	color: #5c4f42;
	line-height: 1.6;
	display: block;
}

.tool__u {
	margin-top: 6rpx;
	font-size: 24rpx;
	color: #6b4e2e;
	font-weight: 700;
	line-height: 1.6;
	display: block;
}

.sec__p {
	font-size: 24rpx;
	color: #5c4f42;
	line-height: 1.7;
	display: block;
	white-space: pre-wrap;
}

.privacy-row {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 12rpx;
	padding: 16rpx 0;
	border-top: 1rpx solid rgba(107, 78, 46, 0.12);
	border-bottom: 1rpx solid rgba(107, 78, 46, 0.12);
}

.privacy-row__l {
	flex: 1;
	min-width: 0;
}

.privacy-row__t {
	display: block;
	font-size: 28rpx;
	font-weight: 800;
	color: #2b241c;
}

.privacy-row__d {
	display: block;
	margin-top: 6rpx;
	font-size: 22rpx;
	color: #8a7a66;
}

.privacy-row__a {
	font-size: 24rpx;
	font-weight: 700;
	color: #6b4e2e;
	padding: 8rpx 14rpx;
	border-radius: 999rpx;
	background: rgba(107, 78, 46, 0.1);
}

.follow-tip {
	padding: 22rpx 18rpx;
	display: flex;
	flex-direction: column;
	gap: 10rpx;
}

.follow-title {
	font-size: 30rpx;
	font-weight: 800;
	color: #2b241c;
	display: block;
}

.follow-text {
	font-size: 26rpx;
	color: #5c4f42;
	line-height: 1.65;
	display: block;
}

.follow-qrcode {
	width: 160rpx;
	align-self: center;
	margin-top: 8rpx;
	border-radius: 12rpx;
	background: #fff;
	border: 1rpx solid rgba(107, 78, 46, 0.12);
}

.follow-sub {
	text-align: center;
	font-size: 22rpx;
	color: #8a7a66;
	display: block;
}
</style>
