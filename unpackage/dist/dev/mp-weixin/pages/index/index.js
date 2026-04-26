"use strict";
const common_vendor = require("../../common/vendor.js");
const config_app = require("../../config/app.js");
const config_shakeThemes = require("../../config/shake-themes.js");
const utils_shakeTheme = require("../../utils/shake-theme.js");
const utils_shareMp = require("../../utils/share-mp.js");
if (!Array) {
  const _easycom_ad_slot2 = common_vendor.resolveComponent("ad-slot");
  _easycom_ad_slot2();
}
const _easycom_ad_slot = () => "../../components/ad-slot/ad-slot.js";
if (!Math) {
  _easycom_ad_slot();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    utils_shareMp.usePageShare({ title: "小万素盒易学研习", path: "/pages/index/index" });
    const toolOneLine = config_app.HOME_TOOL_ONE_LINE;
    const themes = config_shakeThemes.SHAKE_THEMES;
    const selectedId = common_vendor.ref(utils_shakeTheme.getStoredThemeId());
    function pick(id) {
      selectedId.value = id;
      utils_shakeTheme.setStoredThemeId(id);
    }
    function goShake() {
      common_vendor.index.navigateTo({ url: "/pages/shake/shake" });
    }
    function goGuaList() {
      common_vendor.index.navigateTo({ url: "/pages/gua-list/gua-list" });
    }
    function goTools() {
      common_vendor.index.switchTab({ url: "/pages/tools/tools" });
    }
    common_vendor.onShow(() => {
      let focusShake = "";
      try {
        focusShake = common_vendor.index.getStorageSync("sixlines_focus_shake_v1");
      } catch (e) {
        focusShake = "";
      }
      if (!focusShake)
        return;
      try {
        common_vendor.index.removeStorageSync("sixlines_focus_shake_v1");
      } catch (e) {
      }
      setTimeout(() => {
        common_vendor.index.pageScrollTo({
          selector: "#shake-cta",
          duration: 280
        });
      }, 80);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(common_vendor.unref(toolOneLine)),
        b: common_vendor.o(goGuaList),
        c: common_vendor.o(goTools),
        d: common_vendor.f(common_vendor.unref(themes), (t, k0, i0) => {
          return common_vendor.e({
            a: t.local,
            b: common_vendor.t(t.name),
            c: common_vendor.t(t.short),
            d: selectedId.value === t.id
          }, selectedId.value === t.id ? {} : {}, {
            e: t.id,
            f: selectedId.value === t.id ? 1 : "",
            g: common_vendor.o(($event) => pick(t.id), t.id)
          });
        }),
        e: common_vendor.o(goShake),
        f: common_vendor.p({
          ["slot-key"]: "home-banner"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
