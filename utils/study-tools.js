const STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']
const BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']
const TRIGRAMS = ['乾', '兑', '离', '震', '巽', '坎', '艮', '坤']
const ZODIACS = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪']

const STEM_ELEMENT = {
	甲: '木',
	乙: '木',
	丙: '火',
	丁: '火',
	戊: '土',
	己: '土',
	庚: '金',
	辛: '金',
	壬: '水',
	癸: '水',
}

const SOLAR_TERM_HINT = ['小寒', '立春', '惊蛰', '清明', '立夏', '芒种', '小暑', '立秋', '白露', '寒露', '立冬', '大雪']
const FORTUNE_LEVELS = ['平稳', '渐进', '顺遂', '活跃', '调和']
const GOOD_ACTS = ['读书研习', '整理资料', '沟通复盘', '计划梳理', '静心记录', '轻度运动', '家务收纳', '拜访长辈']
const AVOID_ACTS = ['冲动决策', '情绪争执', '超预算消费', '熬夜透支', '一次处理过多事务', '临时改变主计划']
const BAD_LUCK_HINT = ['小耗', '平', '吉', '中吉', '注意节奏']
const ACTION_ADVICE = ['先做小目标再推进主目标', '重要事项先写清单再执行', '先沟通边界再协同', '先复盘旧问题再开启新任务', '先稳住节奏再提速']
const DETAIL_SCENES = ['学习计划', '人际沟通', '日常安排', '资料整理', '阶段复盘']

const ZODIAC_NOTES = {
	鼠: '子鼠对应地支“子”，常用于岁时文化、节令记忆与民俗典故研习。',
	牛: '丑牛对应地支“丑”，常见于农耕礼俗、岁首故事与地方节庆符号。',
	虎: '寅虎对应地支“寅”，常作为勇毅象征，常见于年画、庙会与纹饰文化。',
	兔: '卯兔对应地支“卯”，在月相民俗、节日故事与吉祥图案中出现频繁。',
	龙: '辰龙对应地支“辰”，多用于礼仪图腾与节庆符号，具有文化象征意义。',
	蛇: '巳蛇对应地支“巳”，在节令故事、民间谚语与地域民俗中均有体现。',
	马: '午马对应地支“午”，常见于驿路文化、岁时故事与民间审美意象。',
	羊: '未羊对应地支“未”，多见于祈福纹样与吉祥题材，强调和顺寓意。',
	猴: '申猴对应地支“申”，常用于戏曲、年画与寓言中的机敏形象表达。',
	鸡: '酉鸡对应地支“酉”，与晨昏时序、农事生活和岁时节俗关系密切。',
	狗: '戌狗对应地支“戌”，常被视为守护意象，广泛出现在民间叙事中。',
	猪: '亥猪对应地支“亥”，常用于丰收与家宅和乐的民俗象征表达。',
}

const NAME_STROKES = {
	小: 3, 万: 3, 素: 10, 盒: 11, 易: 8, 学: 8, 研: 9, 习: 3, 王: 4, 李: 7, 张: 7, 刘: 6, 陈: 7, 杨: 7,
	赵: 9, 黄: 11, 周: 8, 吴: 7, 徐: 10, 孙: 6, 胡: 9, 朱: 6, 高: 10, 林: 8, 何: 7, 郭: 10, 马: 3,
}

function cyclePair(index) {
	const stem = STEMS[((index % 10) + 10) % 10]
	const branch = BRANCHES[((index % 12) + 12) % 12]
	return stem + branch
}

function ymd(date) {
	const y = date.getFullYear()
	const m = date.getMonth() + 1
	const d = date.getDate()
	const p = (n) => (n < 10 ? '0' + n : '' + n)
	return `${y}-${p(m)}-${p(d)}`
}

function toDate(dateStr, timeStr = '12:00') {
	const t = `${dateStr} ${timeStr}:00`
	const d = new Date(t)
	return Number.isNaN(d.getTime()) ? new Date() : d
}

export function runStudyTool(toolId, form) {
	if (toolId === 'meihua') return runMeihua(form)
	if (toolId === 'bazi') return runBazi(form)
	if (toolId === 'ganzhi') return runGanzhi(form)
	if (toolId === 'zodiac') return runZodiac(form)
	if (toolId === 'name') return runName(form)
	return { title: '未识别功能', lines: ['请返回工具集重新选择功能。'] }
}

function runMeihua(form) {
	const mode = form.mode || 'number'
	const date = form.date || ymd(new Date())
	const numText = String(form.number || '').replace(/[^\d]/g, '')
	const base = mode === 'time' ? toDate(date).getTime() : Number(numText || 0)
	const seed = Math.abs(base || Date.now())
	const upperIdx = seed % 8
	const lowerIdx = Math.floor(seed / 3) % 8
	const moving = (seed % 6) + 1
	return {
		title: '梅花易数研习结果',
		lines: [
			`起式方式：${mode === 'time' ? '时间' : '数字'}`,
			`上卦：${TRIGRAMS[upperIdx]}　下卦：${TRIGRAMS[lowerIdx]}`,
			`动爻：第 ${moving} 爻`,
			`运势：${pickBySeed(seed, FORTUNE_LEVELS)}`,
			`吉凶：${pickBySeed(seed + 2, BAD_LUCK_HINT)}，以“稳中求进”为主。`,
			`建议：${pickBySeed(seed + 5, ACTION_ADVICE)}。`,
			`详细解说：本卦可从“上卦=外部环境、下卦=自身状态、动爻=变化触发点”三层阅读，优先聚焦${pickBySeed(seed + 8, DETAIL_SCENES)}场景，再做记录。`,
			'说明：本页用于民俗文化学习记录，不提供现实决策建议。',
		],
	}
}

function runBazi(form) {
	const date = form.date || ymd(new Date())
	const time = form.time || '12:00'
	const cal = form.calendar || 'solar'
	const d = toDate(date, time)
	const year = d.getFullYear()
	const yearGanzhi = cyclePair(year - 4)
	const monthGanzhi = cyclePair((year - 4) * 12 + d.getMonth())
	const dayGanzhi = cyclePair(Math.floor(d.getTime() / 86400000) + 40)
	const hourGanzhi = cyclePair(Math.floor(d.getHours() / 2) + d.getDate())
	const seed = hashCode(`${date}-${time}-${cal}-${dayGanzhi}`)
	const yi = pickMany(seed, GOOD_ACTS, 3)
	const ji = pickMany(seed + 11, AVOID_ACTS, 3)
	return {
		title: '八字排盘参考',
		lines: [
			`历法类型：${cal === 'lunar' ? '农历录入（展示参考）' : '公历录入'}`,
			`四柱：${yearGanzhi}年 ${monthGanzhi}月 ${dayGanzhi}日 ${hourGanzhi}时`,
			`日主五行：${STEM_ELEMENT[dayGanzhi[0]] || '待查'}`,
			`运势：${pickBySeed(seed + 3, FORTUNE_LEVELS)}（学习向）`,
			`吉凶：${pickBySeed(seed + 7, BAD_LUCK_HINT)}。`,
			`黄历宜：${yi.join('、')}`,
			`黄历忌：${ji.join('、')}`,
			`建议：${pickBySeed(seed + 9, ACTION_ADVICE)}。`,
			`详细解说：可先看日柱与时柱把握日内节奏，再看月柱与年柱做阶段复盘；若宜忌冲突，优先执行“低风险、可回退”的安排。`,
			'说明：用于干支历法学习与记录，不提供现实决策建议。',
		],
	}
}

function runGanzhi(form) {
	const date = form.date || ymd(new Date())
	const d = toDate(date)
	const y = cyclePair(d.getFullYear() - 4)
	const m = cyclePair((d.getFullYear() - 4) * 12 + d.getMonth())
	const day = cyclePair(Math.floor(d.getTime() / 86400000) + 40)
	const term = SOLAR_TERM_HINT[d.getMonth()]
	const elem = STEM_ELEMENT[day[0]] || '木'
	const seed = hashCode(`${date}-${day}-${term}`)
	const yi = pickMany(seed + 5, GOOD_ACTS, 3)
	const ji = pickMany(seed + 17, AVOID_ACTS, 3)
	return {
		title: '干支历法查询结果',
		lines: [
			`日期：${date}`,
			`干支：${y}年 ${m}月 ${day}日`,
			`节气参考：${term}（用于学习索引）`,
			`五行参考：${elem}`,
			`运势：${pickBySeed(seed, FORTUNE_LEVELS)}（学习向）`,
			`吉凶：${pickBySeed(seed + 9, BAD_LUCK_HINT)}。`,
			`当日宜：${yi.join('、')}`,
			`当日忌：${ji.join('、')}`,
			`建议：${pickBySeed(seed + 13, ACTION_ADVICE)}。`,
			`详细解说：先用“节气+日干支”判断当天节律，再结合宜忌做轻重缓急排序；适合用于安排学习、整理与复盘类事项。`,
			'说明：用于历法文化学习与节令认知，不提供现实决策建议。',
		],
	}
}

function runZodiac(form) {
	const z = form.zodiac || '鼠'
	const year = Number(form.year || new Date().getFullYear())
	const idx = (year - 4) % 12
	const current = ZODIACS[(idx + 12) % 12]
	const seed = hashCode(`${z}-${year}-${current}`)
	const now = new Date()
	const daySeed = hashCode(`${z}-${year}-${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`)
	const monthSeed = hashCode(`${z}-${year}-${now.getFullYear()}-${now.getMonth() + 1}`)
	const yearSeed = hashCode(`${z}-${year}-${now.getFullYear()}`)
	const notice = pickMany(seed + 12, AVOID_ACTS, 3)
	const advices = pickMany(seed + 21, GOOD_ACTS, 3)
	return {
		title: `${z}生肖文化研习`,
		lines: [
			`研习生肖：${z}`,
			`年份 ${year} 对应生肖：${current}`,
			`当日运势：${pickBySeed(daySeed, FORTUNE_LEVELS)}（学习向）`,
			`当月运势：${pickBySeed(monthSeed, FORTUNE_LEVELS)}（学习向）`,
			`当年运势：${pickBySeed(yearSeed, FORTUNE_LEVELS)}（学习向）`,
			`吉凶：${pickBySeed(seed + 4, BAD_LUCK_HINT)}。`,
			`注意事项：${notice.join('、')}。`,
			`建议事项：${advices.join('、')}；${pickBySeed(seed + 7, ACTION_ADVICE)}。`,
			ZODIAC_NOTES[z] || '该生肖可从地支、民俗故事、节令礼俗三方面研习。',
			'详细解说：可从“地支来源、节令语境、地方习俗、图像符号”四线并行记录，并对比同地支年份的共性主题。',
			'说明：用于民俗文化阅读与笔记，不提供现实决策建议。',
		],
	}
}

function runName(form) {
	const name = String(form.name || '').trim().slice(0, 6)
	if (!name) {
		return { title: '姓名民俗解析', lines: ['请输入姓名后再生成。'] }
	}
	const chars = [...name]
	const detail = chars.map((ch) => `${ch}(${NAME_STROKES[ch] || '未录入'}画)`)
	const total = chars.reduce((sum, ch) => sum + (NAME_STROKES[ch] || 0), 0)
	const seed = hashCode(name + total)
	return {
		title: '姓名民俗解析结果',
		lines: [
			`姓名：${name}`,
			`笔画明细：${detail.join('、')}`,
			`总笔画：${total || '待补充字典'}`,
			`运势：${pickBySeed(seed, FORTUNE_LEVELS)}（学习向）`,
			`吉凶：${pickBySeed(seed + 3, BAD_LUCK_HINT)}。`,
			`建议：${pickBySeed(seed + 6, ACTION_ADVICE)}。`,
			'详细解说：建议按“字义源流→音形结构→笔画组合→家族命名习惯”顺序阅读，逐步形成个人姓名文化笔记。',
			'说明：本页仅做汉字文化与笔画学习展示，可配合汉典进一步查证。',
		],
	}
}

function hashCode(s) {
	let h = 0
	for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0
	return Math.abs(h)
}

function pickBySeed(seed, arr) {
	return arr[Math.abs(seed) % arr.length]
}

function pickMany(seed, arr, n) {
	const out = []
	let step = 0
	while (out.length < n && step < arr.length * 2) {
		const item = arr[(seed + step * 7) % arr.length]
		if (!out.includes(item)) out.push(item)
		step++
	}
	return out
}
