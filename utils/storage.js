const SESSION_KEY = 'sixlines_session_v1'
const RECORDS_KEY = 'sixlines_records_v1'

export function saveSession(payload) {
	try {
		uni.setStorageSync(SESSION_KEY, JSON.stringify(payload))
	} catch (e) {}
}

export function loadSession() {
	try {
		const s = uni.getStorageSync(SESSION_KEY)
		return s ? JSON.parse(s) : null
	} catch (e) {
		return null
	}
}

export function clearSession() {
	try {
		uni.removeStorageSync(SESSION_KEY)
	} catch (e) {}
}

export function loadRecords() {
	try {
		const s = uni.getStorageSync(RECORDS_KEY)
		return s ? JSON.parse(s) : []
	} catch (e) {
		return []
	}
}

export function saveRecords(arr) {
	try {
		uni.setStorageSync(RECORDS_KEY, JSON.stringify(arr))
	} catch (e) {}
}

export function addRecord(entry) {
	const list = loadRecords()
	list.unshift(entry)
	saveRecords(list)
}

export function getRecordById(id) {
	const list = loadRecords()
	return list.find((x) => x.id === id) || null
}

export function removeRecord(id) {
	const list = loadRecords().filter((x) => x.id !== id)
	saveRecords(list)
}

export function clearAllRecords() {
	saveRecords([])
}
