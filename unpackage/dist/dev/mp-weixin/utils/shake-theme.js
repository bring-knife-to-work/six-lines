"use strict";
const common_vendor = require("../common/vendor.js");
const config_shakeThemes = require("../config/shake-themes.js");
const KEY = "sixlines_shake_theme_v1";
function getStoredThemeId() {
  try {
    const v = common_vendor.index.getStorageSync(KEY);
    return v || "qianlong";
  } catch (e) {
    return "qianlong";
  }
}
function setStoredThemeId(id) {
  try {
    common_vendor.index.setStorageSync(KEY, id);
  } catch (e) {
  }
}
function getStoredTheme() {
  return config_shakeThemes.findTheme(getStoredThemeId());
}
function resolveThemeImage(theme) {
  const local = theme.localYang || theme.local;
  const remote = theme.remote;
  if (theme.localYang && theme.localYin && theme.localYang !== theme.localYin) {
    return Promise.resolve(local);
  }
  if (!remote) {
    return Promise.resolve(local);
  }
  return new Promise((resolve) => {
    common_vendor.index.downloadFile({
      url: remote,
      success: (res) => {
        if (res.statusCode === 200 && res.tempFilePath) {
          resolve(res.tempFilePath);
        } else {
          resolve(local);
        }
      },
      fail: () => resolve(local)
    });
  });
}
exports.getStoredTheme = getStoredTheme;
exports.getStoredThemeId = getStoredThemeId;
exports.resolveThemeImage = resolveThemeImage;
exports.setStoredThemeId = setStoredThemeId;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/shake-theme.js.map
