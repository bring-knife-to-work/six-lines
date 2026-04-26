"use strict";
const data_hexagramData = require("../data/hexagram-data.js");
const utils_shakeFaceMap = require("./shake-face-map.js");
function tossOnce() {
  const faces = [];
  let sum = 0;
  for (let i = 0; i < 3; i++) {
    const yangUp = Math.random() < 0.5;
    const bit = yangUp ? utils_shakeFaceMap.FACE_YANG_UP : utils_shakeFaceMap.FACE_YIN_UP;
    faces.push(bit);
    sum += bit;
  }
  if (sum === 0)
    return { value: 6, faces, label: "老阴" };
  if (sum === 1)
    return { value: 8, faces, label: "少阴" };
  if (sum === 2)
    return { value: 7, faces, label: "少阳" };
  return { value: 9, faces, label: "老阳" };
}
function isMovingLine(lineValue) {
  return lineValue === 6 || lineValue === 9;
}
function buildSession(lines) {
  const staticBits = data_hexagramData.staticBitsFromLineValues(lines);
  const kingWenId = data_hexagramData.kingWenIdFromStaticBits(staticBits);
  const movingIndexes = [];
  for (let i = 0; i < 6; i++) {
    if (isMovingLine(lines[i]))
      movingIndexes.push(i);
  }
  const changedBits = data_hexagramData.flipMovingLines(staticBits, lines);
  const changedKwId = movingIndexes.length > 0 ? data_hexagramData.kingWenIdFromStaticBits(changedBits) : null;
  return {
    lines,
    staticBits,
    kingWenId,
    movingIndexes,
    changedBits,
    changedKwId
  };
}
exports.buildSession = buildSession;
exports.tossOnce = tossOnce;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/i-ching.js.map
