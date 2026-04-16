<script>
	import { APP_NAME } from './config/app.js'

	export default {
		onLaunch: function () {},
		onShow: function () {},
		onHide: function () {},
		onShareAppMessage() {
			return {
				title: APP_NAME,
				path: '/pages/index/index',
			}
		},
		onShareTimeline() {
			return {
				title: APP_NAME,
				query: '',
			}
		},
	}
</script>

<style>
	@import './styles/app.css';

	.u-hover {
		opacity: 0.92;
	}
</style>
