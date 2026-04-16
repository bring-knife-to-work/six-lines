import App from './App'
import { APP_NAME } from './config/app.js'

function ensureWxTimelineMenu() {
	// #ifdef MP-WEIXIN
	try {
		const ret = uni.showShareMenu({
			withShareTicket: true,
			menus: ['shareAppMessage', 'shareTimeline'],
			success() {},
			fail() {},
			complete() {},
		})
		if (ret && typeof ret.then === 'function') {
			ret.catch(() => {})
		}
	} catch (e) {}
	// #endif
}

function buildCurrentPathWithQuery() {
	try {
		const pages = getCurrentPages()
		const cur = pages[pages.length - 1]
		if (!cur || !cur.route) return '/pages/index/index'
		const base = '/' + cur.route
		const opts = cur.options || {}
		const keys = Object.keys(opts)
		if (!keys.length) return base
		const q = keys
			.map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(String(opts[k] ?? ''))}`)
			.join('&')
		return q ? `${base}?${q}` : base
	} catch (e) {
		return '/pages/index/index'
	}
}

function buildCurrentQueryOnly() {
	try {
		const pages = getCurrentPages()
		const cur = pages[pages.length - 1]
		const opts = (cur && cur.options) || {}
		const keys = Object.keys(opts)
		if (!keys.length) return ''
		return keys
			.map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(String(opts[k] ?? ''))}`)
			.join('&')
	} catch (e) {
		return ''
	}
}

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
Vue.mixin({
	onLoad() {
		ensureWxTimelineMenu()
	},
	onShow() {
		ensureWxTimelineMenu()
	},
	onShareAppMessage() {
		return {
			title: APP_NAME,
			path: buildCurrentPathWithQuery(),
		}
	},
	onShareTimeline() {
		return {
			title: APP_NAME,
			query: buildCurrentQueryOnly(),
		}
	},
})
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  app.mixin({
    onLoad() {
      ensureWxTimelineMenu()
    },
    onShow() {
      ensureWxTimelineMenu()
    },
    onShareAppMessage() {
      return {
        title: APP_NAME,
        path: buildCurrentPathWithQuery()
      }
    },
    onShareTimeline() {
      return {
        title: APP_NAME,
        query: buildCurrentQueryOnly()
      }
    },
  })
  return {
    app
  }
}
// #endif