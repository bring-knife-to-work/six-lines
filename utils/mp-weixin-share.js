/**
 * 微信小程序：转发好友 / 复制链接、分享到朋友圈（企业主体）
 * 在页面 <script setup> 顶层调用一次即可；可与页面原有 onLoad 并存。
 */
import { onLoad, onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app'
import { APP_NAME } from '@/config/app.js'

/**
 * @param {Object} [opts]
 * @param {string} [opts.title] 默认转发标题
 * @param {string} [opts.path] 默认转发路径（以 / 开头）
 * @param {() => { title: string, path?: string, imageUrl?: string }} [opts.getAppMessage]
 * @param {() => { title: string, query?: string, imageUrl?: string }} [opts.getTimeline] 朋友圈 query 为当前页路径后的查询串
 */
export function useMpWeixinShare(opts = {}) {
	const defaultTitle = opts.title ?? APP_NAME
	const defaultPath = opts.path ?? '/pages/index/index'

	onShareAppMessage(() => {
		if (typeof opts.getAppMessage === 'function') {
			const r = opts.getAppMessage()
			return {
				title: r.title || defaultTitle,
				path: r.path || defaultPath,
				...(r.imageUrl ? { imageUrl: r.imageUrl } : {}),
			}
		}
		return { title: defaultTitle, path: defaultPath }
	})

	onShareTimeline(() => {
		if (typeof opts.getTimeline === 'function') {
			const r = opts.getTimeline()
			return {
				title: r.title || defaultTitle,
				query: r.query ?? '',
				...(r.imageUrl ? { imageUrl: r.imageUrl } : {}),
			}
		}
		return { title: defaultTitle, query: '' }
	})

	onLoad(() => {
		// #ifdef MP-WEIXIN
		uni.showShareMenu({
			withShareTicket: true,
			menus: ['shareAppMessage', 'shareTimeline'],
			fail() {},
		})
		// #endif
	})
}
