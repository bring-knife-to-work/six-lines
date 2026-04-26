"use strict";
const common_vendor = require("../common/vendor.js");
const SESSION_KEY = "sixlines_session_v1";
const RECORDS_KEY = "sixlines_records_v1";
function saveSession(payload) {
  try {
    common_vendor.index.setStorageSync(SESSION_KEY, JSON.stringify(payload));
  } catch (e) {
  }
}
function loadSession() {
  try {
    const s = common_vendor.index.getStorageSync(SESSION_KEY);
    return s ? JSON.parse(s) : null;
  } catch (e) {
    return null;
  }
}
function clearSession() {
  try {
    common_vendor.index.removeStorageSync(SESSION_KEY);
  } catch (e) {
  }
}
function loadRecords() {
  try {
    const s = common_vendor.index.getStorageSync(RECORDS_KEY);
    return s ? JSON.parse(s) : [];
  } catch (e) {
    return [];
  }
}
function saveRecords(arr) {
  try {
    common_vendor.index.setStorageSync(RECORDS_KEY, JSON.stringify(arr));
  } catch (e) {
  }
}
function addRecord(entry) {
  const list = loadRecords();
  list.unshift(entry);
  saveRecords(list);
}
function getRecordById(id) {
  const list = loadRecords();
  return list.find((x) => x.id === id) || null;
}
function removeRecord(id) {
  const list = loadRecords().filter((x) => x.id !== id);
  saveRecords(list);
}
function clearAllRecords() {
  saveRecords([]);
}
exports.addRecord = addRecord;
exports.clearAllRecords = clearAllRecords;
exports.clearSession = clearSession;
exports.getRecordById = getRecordById;
exports.loadRecords = loadRecords;
exports.loadSession = loadSession;
exports.removeRecord = removeRecord;
exports.saveSession = saveSession;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/storage.js.map
