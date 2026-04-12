import {
	kingWenIdFromStaticBits,
	staticBitsFromLineValues,
	flipMovingLines,
} from '@/data/hexagram-data.js'
import { FACE_YANG_UP, FACE_YIN_UP } from '@/utils/shake-face-map.js'

/** 三钱法：单次得到 6(老阴) 7(少阳) 8(少阴) 9(老阳)；位值见 shake-face-map.js */
export function tossOnce() {
	const faces = []
	let sum = 0
	for (let i = 0; i < 3; i++) {
		const yangUp = Math.random() < 0.5
		const bit = yangUp ? FACE_YANG_UP : FACE_YIN_UP
		faces.push(bit)
		sum += bit
	}
	if (sum === 0) return { value: 6, faces, label: '老阴' }
	if (sum === 1) return { value: 8, faces, label: '少阴' }
	if (sum === 2) return { value: 7, faces, label: '少阳' }
	return { value: 9, faces, label: '老阳' }
}

export function isMovingLine(lineValue) {
	return lineValue === 6 || lineValue === 9
}

/** 自下而上六爻（初爻在下） */
export function buildSession(lines) {
	const staticBits = staticBitsFromLineValues(lines)
	const kingWenId = kingWenIdFromStaticBits(staticBits)
	const movingIndexes = []
	for (let i = 0; i < 6; i++) {
		if (isMovingLine(lines[i])) movingIndexes.push(i)
	}
	const changedBits = flipMovingLines(staticBits, lines)
	const changedKwId =
		movingIndexes.length > 0 ? kingWenIdFromStaticBits(changedBits) : null
	return {
		lines,
		staticBits,
		kingWenId,
		movingIndexes,
		changedBits,
		changedKwId,
	}
}

