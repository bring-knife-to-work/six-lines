"use strict";
const common_vendor = require("../../common/vendor.js");
const config_app = require("../../config/app.js");
const _sfc_main = {
  __name: "compliance-footer",
  props: {
    text: {
      type: String,
      default: config_app.FOOTER_HINT
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(__props.text)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2498af54"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/compliance-footer/compliance-footer.js.map
