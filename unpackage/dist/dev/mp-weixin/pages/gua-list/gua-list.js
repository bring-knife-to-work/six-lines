"use strict";
const common_vendor = require("../../common/vendor.js");
const data_hexagramData = require("../../data/hexagram-data.js");
const utils_shareMp = require("../../utils/share-mp.js");
const _sfc_main = {
  __name: "gua-list",
  setup(__props) {
    utils_shareMp.usePageShare({ title: "小万素盒易学研习 · 六十四卦", path: "/pages/gua-list/gua-list" });
    const names = data_hexagramData.HEXAGRAM_NAMES;
    const mnemonics = data_hexagramData.HEXAGRAM_MNEMONICS;
    const ids = common_vendor.computed(() => {
      const out = [];
      for (let i = 1; i <= 64; i++)
        out.push(i);
      return out;
    });
    function glyph(id) {
      return String.fromCodePoint(19904 + (id - 1));
    }
    function open(id) {
      common_vendor.index.navigateTo({ url: `/pages/gua-detail/gua-detail?id=${id}` });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(ids.value, (id, k0, i0) => {
          return {
            a: common_vendor.t(glyph(id)),
            b: common_vendor.t(common_vendor.unref(names)[id]),
            c: common_vendor.t(common_vendor.unref(mnemonics)[id]),
            d: common_vendor.t(id),
            e: id,
            f: common_vendor.o(($event) => open(id), id)
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-63add56c"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/gua-list/gua-list.js.map
