"use strict";
const common_vendor = require("../../common/vendor.js");
const data_studyTools = require("../../data/study-tools.js");
const utils_shareMp = require("../../utils/share-mp.js");
if (!Array) {
  const _easycom_compliance_footer2 = common_vendor.resolveComponent("compliance-footer");
  _easycom_compliance_footer2();
}
const _easycom_compliance_footer = () => "../../components/compliance-footer/compliance-footer.js";
if (!Math) {
  _easycom_compliance_footer();
}
const _sfc_main = {
  __name: "tools",
  setup(__props) {
    utils_shareMp.usePageShare({ title: "小万素盒易学研习 · 易学工具集", path: "/pages/tools/tools" });
    const tools = data_studyTools.STUDY_TOOLS;
    function openTool(id) {
      if (id === "liuyao") {
        try {
          common_vendor.index.setStorageSync("sixlines_focus_shake_v1", "1");
        } catch (e) {
        }
        common_vendor.index.switchTab({ url: "/pages/index/index" });
        return;
      }
      common_vendor.index.navigateTo({ url: `/pages/tool-workbench/tool-workbench?tool=${encodeURIComponent(id)}` });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(tools), (tool, k0, i0) => {
          return {
            a: common_vendor.t(tool.name),
            b: common_vendor.t(tool.short),
            c: tool.id,
            d: common_vendor.o(($event) => openTool(tool.id), tool.id)
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3710fc71"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/tools/tools.js.map
