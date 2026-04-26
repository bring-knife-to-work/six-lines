"use strict";
const FACE_YIN_UP = 0;
const FACE_YANG_UP = 1;
function themeFaceImageSrc(theme, faceBit) {
  const yinImg = theme.localYin || theme.local;
  const yangImg = theme.localYang || theme.local;
  return faceBit === FACE_YANG_UP ? yangImg : yinImg;
}
exports.FACE_YANG_UP = FACE_YANG_UP;
exports.FACE_YIN_UP = FACE_YIN_UP;
exports.themeFaceImageSrc = themeFaceImageSrc;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/shake-face-map.js.map
