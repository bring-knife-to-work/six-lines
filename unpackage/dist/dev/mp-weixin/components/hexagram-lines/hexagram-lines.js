"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "hexagram-lines",
  props: {
    /** 自下而上六爻：6/7/8/9 */
    lines: {
      type: Array,
      required: true
    },
    /** 周易序 1–64，用于卦象符号 */
    kingWenId: {
      type: Number,
      default: 1
    },
    showGlyph: {
      type: Boolean,
      default: true
    }
  },
  setup(__props) {
    const POS = ["初爻", "二爻", "三爻", "四爻", "五爻", "上爻"];
    const props = __props;
    const glyph = common_vendor.computed(() => {
      const id = props.kingWenId;
      if (id < 1 || id > 64)
        return "";
      return String.fromCodePoint(19904 + (id - 1));
    });
    const rowsUi = common_vendor.computed(() => {
      const out = [];
      for (let i = 5; i >= 0; i--) {
        const v = props.lines[i];
        const yang = v === 7 || v === 9;
        let mark = "";
        if (v === 9)
          mark = "○";
        if (v === 6)
          mark = "×";
        out.push({
          rowKey: "L" + i,
          pos: POS[i],
          kind: yang ? "yang" : "yin",
          mark
        });
      }
      return out;
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: __props.showGlyph
      }, __props.showGlyph ? {
        b: common_vendor.t(glyph.value)
      } : {}, {
        c: common_vendor.f(rowsUi.value, (row, k0, i0) => {
          return common_vendor.e({
            a: common_vendor.t(row.pos),
            b: row.kind === "yang"
          }, row.kind === "yang" ? {} : {}, {
            c: row.mark
          }, row.mark ? {
            d: common_vendor.t(row.mark)
          } : {}, {
            e: row.rowKey
          });
        })
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1aa34c87"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/hexagram-lines/hexagram-lines.js.map
