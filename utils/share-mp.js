import { onLoad, onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app'
import { APP_NAME } from '@/config/app.js'

export function usePageShare(options = {}) {
	const title = options.title || APP_NAME
	const path = options.path || '/pages/index/index'
	const imageUrl = options.imageUrl || ''

	onLoad(() => {
		// #ifdef MP-WEIXIN
		try {
			wx.showShareMenu({
				menus: ['shareAppMessage', 'shareTimeline'],
			})
		} catch (e) {}
		// #endif
	})

	onShareAppMessage(() => {
		if (typeof options.getAppMessage === 'function') {
			const r = options.getAppMessage() || {}
			return {
				title: r.title || title,
				path: r.path || path,
				...(r.imageUrl || imageUrl ? { imageUrl: r.imageUrl || imageUrl } : {}),
			}
		}
		return {
			title,
			path,
			...(imageUrl ? { imageUrl } : {}),
		}
	})

	onShareTimeline(() => {
		if (typeof options.getTimeline === 'function') {
			const r = options.getTimeline() || {}
			return {
				title: r.title || title,
				path: r.path || path,
				...(r.imageUrl || imageUrl ? { imageUrl: r.imageUrl || imageUrl } : {}),
			}
		}
		return {
			title,
			path,
			...(imageUrl ? { imageUrl } : {}),
		}
	})
}
