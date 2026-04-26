"use strict";
const common_vendor = require("../../common/vendor.js");
const data_hexagramData = require("../../data/hexagram-data.js");
const utils_shareMp = require("../../utils/share-mp.js");
if (!Array) {
  const _easycom_result_copy_card2 = common_vendor.resolveComponent("result-copy-card");
  const _easycom_compliance_footer2 = common_vendor.resolveComponent("compliance-footer");
  (_easycom_result_copy_card2 + _easycom_compliance_footer2)();
}
const _easycom_result_copy_card = () => "../../components/result-copy-card/result-copy-card.js";
const _easycom_compliance_footer = () => "../../components/compliance-footer/compliance-footer.js";
if (!Math) {
  (_easycom_result_copy_card + _easycom_compliance_footer)();
}
const _sfc_main = {
  __name: "gua-detail",
  setup(__props) {
    const kid = common_vendor.ref(0);
    const copy = common_vendor.ref(null);
    utils_shareMp.usePageShare({ title: "小万素盒易学研习 · 卦象解读", path: "/pages/gua-detail/gua-detail" });
    const name = common_vendor.computed(() => kid.value > 0 ? data_hexagramData.HEXAGRAM_NAMES[kid.value] || "" : "");
    const glyph = common_vendor.computed(
      () => kid.value > 0 ? String.fromCodePoint(19904 + (kid.value - 1)) : ""
    );
    common_vendor.onLoad((q) => {
      const n = parseInt(q.id, 10);
      if (n >= 1 && n <= 64) {
        kid.value = n;
        copy.value = data_hexagramData.getHexagramCopy(n, { skipChangedNote: true });
      } else {
        kid.value = 0;
        copy.value = null;
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: kid.value > 0 && copy.value
      }, kid.value > 0 && copy.value ? common_vendor.e({
        b: common_vendor.t(glyph.value),
        c: common_vendor.t(name.value),
        d: copy.value.mnemonic
      }, copy.value.mnemonic ? {
        e: common_vendor.t(copy.value.mnemonic)
      } : {}, {
        f: common_vendor.t(kid.value),
        g: copy.value.detail
      }, copy.value.detail ? {
        h: common_vendor.t(copy.value.detail)
      } : {}, {
        i: copy.value.referenceBlock
      }, copy.value.referenceBlock ? {
        j: common_vendor.p({
          ["main-text"]: copy.value.referenceBlock,
          ["closing-text"]: copy.value.closing || ""
        })
      } : {}) : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-168aa54d"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/gua-detail/gua-detail.js.map
