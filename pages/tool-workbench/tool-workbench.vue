<template>
	<view class="page-bg page-pad">
		<view v-if="tool" class="hero card-surface">
			<text class="hero__t">{{ tool.name }}</text>
			<text class="hero__s">{{ tool.short }}</text>
		</view>

		<view v-if="tool" class="card-surface block">
			<text class="block__k">工具操作区</text>
			<text class="block__d">{{ tool.operationTitle }}</text>

			<view v-if="tool.id === 'meihua'" class="form">
				<picker :range="modeOptions" range-key="label" @change="pickMode">
					<view class="input">起式方式：{{ modeLabel }}</view>
				</picker>
				<input v-if="form.mode === 'number'" v-model="form.number" class="input" type="number" placeholder="输入 1~999 的数字" />
				<picker mode="date" :value="form.date" @change="pickDate">
					<view class="input">日期：{{ form.date }}</view>
				</picker>
			</view>

			<view v-else-if="tool.id === 'bazi'" class="form">
				<picker :range="calendarOptions" range-key="label" @change="pickCalendar">
					<view class="input">历法：{{ calendarLabel }}</view>
				</picker>
				<picker mode="date" :value="form.date" @change="pickDate">
					<view class="input">出生日期：{{ form.date }}</view>
				</picker>
				<picker mode="time" :value="form.time" @change="pickTime">
					<view class="input">出生时间：{{ form.time }}</view>
				</picker>
			</view>

			<view v-else-if="tool.id === 'ganzhi'" class="form">
				<picker mode="date" :value="form.date" @change="pickDate">
					<view class="input">查询日期：{{ form.date }}</view>
				</picker>
			</view>

			<view v-else-if="tool.id === 'zodiac'" class="form">
				<picker :range="zodiacOptions" @change="pickZodiac">
					<view class="input">生肖：{{ form.zodiac }}</view>
				</picker>
				<input v-model="form.year" class="input" type="number" placeholder="输入研习年份，如 2026" />
			</view>

			<view v-else-if="tool.id === 'name'" class="form">
				<input v-model.trim="form.name" class="input" type="text" maxlength="6" placeholder="输入姓名（最多6字）" />
			</view>

			<view class="ops">
				<button class="btn btn--main" hover-class="u-hover" @click="generate">生成结果</button>
				<button class="btn btn--line" hover-class="u-hover" @click="saveRecord" :disabled="!result">保存到我的记录</button>
			</view>
		</view>

		<view v-if="result" class="card-surface block">
			<text class="block__k">{{ result.title }}</text>
			<text v-for="(line, i) in result.lines" :key="i" class="line">{{ line }}</text>
		</view>

		<view v-if="tool" class="card-surface block">
			<text class="block__k">基础科普区</text>
			<text class="line">{{ tool.science }}</text>
			<text class="line line--usage">{{ tool.usage }}</text>
		</view>

		<view v-if="tool" class="card-surface block">
			<text class="block__k">统一说明</text>
			<text class="line">本工具仅为民俗文化学习参考，无预测、咨询服务，不构成任何决策建议。</text>
			<compliance-footer />
		</view>
	</view>
</template>

<script setup>
import { computed, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getStudyToolById } from '@/data/study-tools.js'
import { runStudyTool } from '@/utils/study-tools.js'
import { addRecord } from '@/utils/storage.js'
import { usePageShare } from '@/utils/share-mp.js'

usePageShare({ title: '小万素盒易学研习 · 研习工具', path: '/pages/tool-workbench/tool-workbench' })

const tool = ref(null)
const result = ref(null)
const today = formatDate(new Date())

const form = ref({
	mode: 'number',
	number: '',
	date: today,
	time: '12:00',
	calendar: 'solar',
	zodiac: '鼠',
	year: String(new Date().getFullYear()),
	name: '',
})

const modeOptions = [{ label: '数字起式', value: 'number' }, { label: '时间起式', value: 'time' }]
const calendarOptions = [{ label: '公历', value: 'solar' }, { label: '农历录入', value: 'lunar' }]
const zodiacOptions = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪']

const modeLabel = computed(() => modeOptions.find((x) => x.value === form.value.mode)?.label || modeOptions[0].label)
const calendarLabel = computed(() => calendarOptions.find((x) => x.value === form.value.calendar)?.label || calendarOptions[0].label)

onLoad((options) => {
	const id = options?.tool ? decodeURIComponent(String(options.tool)) : ''
	tool.value = getStudyToolById(id)
	if (!tool.value) {
		uni.showToast({ title: '功能不存在', icon: 'none' })
	}
})

function pickMode(e) {
	const idx = Number(e.detail.value || 0)
	form.value.mode = modeOptions[idx].value
}
function pickCalendar(e) {
	const idx = Number(e.detail.value || 0)
	form.value.calendar = calendarOptions[idx].value
}
function pickDate(e) {
	form.value.date = e.detail.value
}
function pickTime(e) {
	form.value.time = e.detail.value
}
function pickZodiac(e) {
	const idx = Number(e.detail.value || 0)
	form.value.zodiac = zodiacOptions[idx]
}

function generate() {
	if (!tool.value) return
	result.value = runStudyTool(tool.value.id, form.value)
}

function saveRecord() {
	if (!tool.value || !result.value) return
	const id = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
	addRecord({
		id,
		ts: Date.now(),
		recordType: 'study',
		toolId: tool.value.id,
		toolName: tool.value.name,
		title: result.value.title,
		lines: result.value.lines,
	})
	uni.showToast({ title: '已保存', icon: 'success' })
}

function formatDate(d) {
	const p = (n) => (n < 10 ? `0${n}` : `${n}`)
	return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`
}
</script>

<style scoped>
.page-pad {
	padding: 26rpx 26rpx 32rpx;
	box-sizing: border-box;
}
.hero {
	padding: 22rpx 18rpx;
	margin-bottom: 16rpx;
}
.hero__t { display: block; font-size: 36rpx; font-weight: 900; color: #2b241c; }
.hero__s { display: block; margin-top: 8rpx; font-size: 24rpx; color: #8a7a66; }
.block { margin-bottom: 16rpx; padding: 22rpx 18rpx; }
.block__k { display: block; font-size: 30rpx; font-weight: 800; color: #2b241c; }
.block__d { display: block; margin-top: 8rpx; font-size: 24rpx; color: #8a7a66; }
.form { margin-top: 14rpx; display: flex; flex-direction: column; gap: 10rpx; }
.input { height: 82rpx; line-height: 82rpx; border-radius: 14rpx; border: 1rpx solid rgba(107, 78, 46, 0.2); padding: 0 18rpx; font-size: 28rpx; color: #2b241c; background: rgba(255,255,255,0.92); }
.ops { margin-top: 14rpx; display: flex; gap: 12rpx; }
.btn { flex: 1; height: 84rpx; line-height: 84rpx; border-radius: 42rpx; font-size: 28rpx; border: none; }
.btn--main { background: linear-gradient(180deg, #8b6f47 0%, #6b4e2e 100%); color: #fff; }
.btn--line { background: #fff; color: #6b4e2e; border: 1rpx solid rgba(107, 78, 46, 0.3); }
.line { margin-top: 10rpx; display: block; font-size: 26rpx; color: #5c4f42; line-height: 1.65; }
.line--usage { color: #6b4e2e; font-weight: 700; }
</style>
