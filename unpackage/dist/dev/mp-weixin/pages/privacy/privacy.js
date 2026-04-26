"use strict";
const common_vendor = require("../../common/vendor.js");
const config_app = require("../../config/app.js");
const utils_shareMp = require("../../utils/share-mp.js");
if (!Array) {
  const _easycom_ad_slot2 = common_vendor.resolveComponent("ad-slot");
  const _easycom_compliance_footer2 = common_vendor.resolveComponent("compliance-footer");
  (_easycom_ad_slot2 + _easycom_compliance_footer2)();
}
const _easycom_ad_slot = () => "../../components/ad-slot/ad-slot.js";
const _easycom_compliance_footer = () => "../../components/compliance-footer/compliance-footer.js";
if (!Math) {
  (_easycom_ad_slot + _easycom_compliance_footer)();
}
const _sfc_main = {
  __name: "privacy",
  setup(__props) {
    utils_shareMp.usePageShare({ title: "小万素盒易学研习 · 隐私说明", path: "/pages/privacy/privacy" });
    const filing = config_app.RECORD_FILING_TEXT;
    const privacy = config_app.PRIVACY_SUMMARY_TEXT;
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(common_vendor.unref(filing)),
        b: common_vendor.t(common_vendor.unref(privacy)),
        c: common_vendor.p({
          ["slot-key"]: "privacy-bottom"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-33d54784"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/privacy/privacy.js.map
