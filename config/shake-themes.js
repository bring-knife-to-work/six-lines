/**
 * 摇卦视觉主题
 * - 乾隆 / 硬币：local 使用 @static/…，resolveStatic → /static/…
 * - localYin：阴面朝上时展示（汉字字面 / 字·国徽）
 * - localYang：阳面朝上时展示（满文背 / 花·图案）
 * - 若实际图片与标注相反，只须对调同一主题下 localYin 与 localYang 两行路径
 */
import { resolveStatic } from '@/utils/static-path.js'
import { LEAF_SVG_DATA_URL_YANG, LEAF_SVG_DATA_URL_YIN } from '@/utils/leaf-svg.js'

const RAW_THEMES = [
	{
		id: 'qianlong',
		name: '乾隆通宝',
		short: '古钱',
		localYin: '@static/shake/q1.png',
		localYang: '@static/shake/q2.png',
		remote:
			'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/CHINA%2C_QING_DYNASTY%2C_Qian_Long_Tong_Bao_%281736-1795%29%2Cobverse_-_Flickr_-_woody1778a.jpg/320px-CHINA%2C_QING_DYNASTY%2C_Qian_Long_Tong_Bao_%281736-1795%29%2Cobverse_-_Flickr_-_woody1778a.jpg',
		yinTitle: '阴（--）',
		yinHint: '字面（汉字钱文）朝上为「阴」，对应断线（--）',
		yangTitle: '阳（—）',
		yangHint: '背面（满文 / 图案）朝上为「阳」，对应实线（—）',
		note:
			'【首选】三枚乾隆通宝（清代铜钱）：流传最广、正反面（字 / 满文）清晰，最宜古法。下栏图示与摇出结果一致：阴=字面、阳=背面。图为趣味示意。',
	},
	{
		id: 'coin',
		name: '现代硬币',
		short: '硬币',
		localYin: '@static/shake/y1.png',
		localYang: '@static/shake/y2.png',
		remote:
			'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/1_rmb_coin_%28front%29.png/320px-1_rmb_coin_%28front%29.png',
		yinTitle: '阴（--）',
		yinHint: '有字 / 国徽的一面朝上为「阴」，对应断线（--）',
		yangTitle: '阳（—）',
		yangHint: '有花 / 图案的一面朝上为「阳」，对应实线（—）',
		note:
			'【替代】无铜钱时，用三枚相同规格硬币（一元、五角均可，须统一）。规则与乾隆一致：阴=字/国徽面，阳=花/图案面。图为趣味示意。',
	},
	{
		id: 'leaf',
		name: '树叶',
		short: '树叶',
		yinTitle: '阴（--）',
		yinHint: '叶背偏暗、纹理为主的一侧朝上为「阴」',
		yangTitle: '阳（—）',
		yangHint: '叶面受光、叶脉更清晰的一侧朝上为「阳」',
		note:
			'树叶为趣味视觉；阴阳以背/面作区分，与乾隆钱「字/背」规则类比，仅供娱乐。',
	},
]

export const SHAKE_THEMES = RAW_THEMES.map((t) => {
	if (t.id === 'leaf') {
		return {
			...t,
			remote: null,
			localYang: LEAF_SVG_DATA_URL_YANG,
			localYin: LEAF_SVG_DATA_URL_YIN,
			local: LEAF_SVG_DATA_URL_YIN,
		}
	}
	const localYang = resolveStatic(t.localYang)
	const localYin = resolveStatic(t.localYin)
	return {
		...t,
		localYang,
		localYin,
		local: localYin,
	}
})

export function findTheme(id) {
	return SHAKE_THEMES.find((t) => t.id === id) || SHAKE_THEMES[0]
}
