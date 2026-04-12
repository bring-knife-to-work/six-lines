import { findTheme } from '@/config/shake-themes.js'

const KEY = 'sixlines_shake_theme_v1'

export function getStoredThemeId() {
	try {
		const v = uni.getStorageSync(KEY)
		return v || 'qianlong'
	} catch (e) {
		return 'qianlong'
	}
}

export function setStoredThemeId(id) {
	try {
		uni.setStorageSync(KEY, id)
	} catch (e) {}
}

export function getStoredTheme() {
	return findTheme(getStoredThemeId())
}

/**
 * 优先联网下载 remote，失败则使用本地图。
 * 乾隆/硬币等双面本地素材已区分阴/阳面时，不再用单张 remote 覆盖，以免与 q1/q2、y1/y2 不一致。
 */
export function resolveThemeImage(theme) {
	const local = theme.localYang || theme.local
	const remote = theme.remote
	if (theme.localYang && theme.localYin && theme.localYang !== theme.localYin) {
		return Promise.resolve(local)
	}
	if (!remote) {
		return Promise.resolve(local)
	}
	return new Promise((resolve) => {
		uni.downloadFile({
			url: remote,
			success: (res) => {
				if (res.statusCode === 200 && res.tempFilePath) {
					resolve(res.tempFilePath)
				} else {
					resolve(local)
				}
			},
			fail: () => resolve(local),
		})
	})
}
