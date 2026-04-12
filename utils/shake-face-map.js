/**
 * 摇卦三枚钱币：乾隆通宝与现代硬币规则统一（树叶仅作视觉辅助，同字段语义）
 *
 * tossOnce 产出 faces[i]：
 * - FACE_YIN_UP(0)：阴面朝上 → 乾隆为汉字字面；硬币为字/国徽面
 * - FACE_YANG_UP(1)：阳面朝上 → 乾隆为满文背；硬币为花/图案面
 *
 * 爻象由「阳面朝上」的枚数之和按三钱法定 6/7/8/9（与周易序卦逻辑一致）。
 */

export const FACE_YIN_UP = 0
export const FACE_YANG_UP = 1

/**
 * @param {object} theme SHAKE_THEMES 项：localYin = 阴面朝上时应显示图；localYang = 阳面朝上时应显示图
 * @param {0|1} faceBit
 */
export function themeFaceImageSrc(theme, faceBit) {
	const yinImg = theme.localYin || theme.local
	const yangImg = theme.localYang || theme.local
	return faceBit === FACE_YANG_UP ? yangImg : yinImg
}
