/**
 * 树叶主题：正（阳）/ 背（阴）两面 SVG，供 image src 使用 data URL。
 * 小程序与 H5 均可用，不依赖 static 位图。
 */
function toDataUrl(svg) {
	const compact = svg.replace(/>\s+</g, '><').trim()
	return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(compact)
}

/** 阳：叶面受光侧，叶脉清晰偏亮绿 */
const SVG_YANG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
<defs>
<linearGradient id="lgY" x1="15%" y1="5%" x2="85%" y2="95%">
<stop offset="0%" stop-color="#e8f5c4"/>
<stop offset="45%" stop-color="#aed581"/>
<stop offset="100%" stop-color="#7cb342"/>
</linearGradient>
</defs>
<path d="M50 10 C22 28 16 58 50 92 C84 58 78 28 50 10Z" fill="url(#lgY)" stroke="#558b2f" stroke-width="1.1"/>
<path d="M50 18 L50 84" stroke="#33691e" stroke-width="1.3" stroke-linecap="round" opacity="0.5"/>
<path d="M50 28 L36 46 M50 34 L64 48 M50 46 L32 64 M50 52 L68 66" stroke="#558b2f" stroke-width="0.85" stroke-linecap="round" opacity="0.42"/>
<path d="M50 14 Q64 26 70 40" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity="0.32"/>
</svg>`

/** 阴：叶背偏暗，主脉浅、侧脉弱 */
const SVG_YIN = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
<defs>
<linearGradient id="lgN" x1="20%" y1="0%" x2="80%" y2="100%">
<stop offset="0%" stop-color="#6b7d47"/>
<stop offset="50%" stop-color="#4a5c32"/>
<stop offset="100%" stop-color="#2e3a22"/>
</linearGradient>
</defs>
<path d="M50 12 C22 32 18 58 50 92 C82 58 78 32 50 12Z" fill="url(#lgN)" stroke="#3d4f28" stroke-width="1.1"/>
<path d="M50 24 L50 84" stroke="#8d9e6b" stroke-width="1.1" stroke-linecap="round" opacity="0.35"/>
<path d="M50 38 Q40 52 36 68 M50 44 Q58 56 64 70" stroke="#5c6b40" stroke-width="0.7" fill="none" opacity="0.4"/>
<ellipse cx="42" cy="48" rx="6" ry="10" fill="#000" opacity="0.06"/>
<ellipse cx="58" cy="56" rx="5" ry="8" fill="#000" opacity="0.05"/>
</svg>`

export const LEAF_SVG_DATA_URL_YANG = toDataUrl(SVG_YANG)
export const LEAF_SVG_DATA_URL_YIN = toDataUrl(SVG_YIN)
