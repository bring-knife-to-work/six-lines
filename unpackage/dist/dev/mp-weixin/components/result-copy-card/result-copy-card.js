"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "result-copy-card",
  props: {
    lead: {
      type: String,
      default: "各方向参考（事业 · 爱情 · 行程 · 决定）"
    },
    mainText: {
      type: String,
      default: ""
    },
    closingText: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: __props.mainText
      }, __props.mainText ? common_vendor.e({
        b: common_vendor.t(__props.lead),
        c: common_vendor.t(__props.mainText),
        d: __props.closingText
      }, __props.closingText ? {
        e: common_vendor.t(__props.closingText)
      } : {}) : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c4475be1"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/result-copy-card/result-copy-card.js.map
