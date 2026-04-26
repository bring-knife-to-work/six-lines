"use strict";
const common_vendor = require("../../common/vendor.js");
const data_studyTools = require("../../data/study-tools.js");
const config_app = require("../../config/app.js");
const common_assets = require("../../common/assets.js");
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
  __name: "mine",
  setup(__props) {
    utils_shareMp.usePageShare({ title: "关于与说明 · 小万素盒易学研习", path: "/pages/mine/mine" });
    const tools = data_studyTools.STUDY_TOOLS;
    const filing = config_app.RECORD_FILING_TEXT;
    const privacy = config_app.PRIVACY_SUMMARY_TEXT;
    function showPrivacyBrief() {
      common_vendor.index.showModal({
        title: "隐私说明",
        content: "小万素盒易学研习是民俗文化学习工具，提供六爻与易学工具集等学习向功能。所有结果仅供学习参考，不构成建议；不收集姓名、生日、联系方式等个人信息，数据仅保存在本机，不上传服务器。",
        showCancel: false
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(tools), (tool, k0, i0) => {
          return {
            a: common_vendor.t(tool.name),
            b: common_vendor.t(tool.science),
            c: common_vendor.t(tool.usage),
            d: tool.id
          };
        }),
        b: common_vendor.o(showPrivacyBrief),
        c: common_vendor.t(common_vendor.unref(filing)),
        d: common_vendor.t(common_vendor.unref(privacy)),
        e: common_vendor.unref(common_assets.qrcodeSrc),
        f: common_vendor.p({
          ["slot-key"]: "mine-bottom"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-7c2ebfa5"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/mine/mine.js.map
