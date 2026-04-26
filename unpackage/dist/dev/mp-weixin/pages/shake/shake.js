"use strict";
const common_vendor = require("../../common/vendor.js");
const config_app = require("../../config/app.js");
const utils_iChing = require("../../utils/i-ching.js");
const utils_storage = require("../../utils/storage.js");
const utils_shakeTheme = require("../../utils/shake-theme.js");
const utils_shakeFaceMap = require("../../utils/shake-face-map.js");
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
const SHAKE_MS = 880;
const _sfc_main = {
  __name: "shake",
  setup(__props) {
    utils_shareMp.usePageShare({ title: `摇卦 · ${config_app.APP_NAME}`, path: "/pages/shake/shake" });
    const theme = common_vendor.ref(utils_shakeTheme.getStoredTheme());
    const lines = common_vendor.ref([]);
    const step = common_vendor.computed(() => lines.value.length);
    const done = common_vendor.computed(() => lines.value.length >= 6);
    const anim = common_vendor.ref(false);
    const busy = common_vendor.ref(false);
    const lastLabel = common_vendor.ref("");
    const lastFaces = common_vendor.ref([0, 0, 0]);
    const coinTags = common_vendor.computed(() => lastFaces.value.map((h) => h ? "阳" : "阴"));
    const yangFaceSrc = common_vendor.computed(() => utils_shakeFaceMap.themeFaceImageSrc(theme.value, 1));
    const yinFaceSrc = common_vendor.computed(() => utils_shakeFaceMap.themeFaceImageSrc(theme.value, 0));
    function coinAxisStyle(i) {
      if (anim.value) {
        return { animationDelay: `${i * 48}ms` };
      }
      const ry = lastFaces.value[i] ? 0 : 180;
      return {
        transform: `rotateY(${ry}deg) rotateZ(0deg) translateY(0)`,
        transition: "transform 0.36s cubic-bezier(0.33, 1.24, 0.64, 1)"
      };
    }
    const lastSumText = common_vendor.computed(() => {
      const s = lastFaces.value.reduce((a, b) => a + b, 0);
      return `阳面朝上 ${s} 枚`;
    });
    const lastDisplay = common_vendor.computed(() => {
      if (busy.value)
        return "钱币翻转中，请稍候…";
      if (!lastLabel.value)
        return "点击下方「摇卦」，结果将显示在这里";
      return `${lastLabel.value}（${lastSumText.value}）`;
    });
    common_vendor.onLoad(async () => {
      utils_storage.clearSession();
      lines.value = [];
      lastLabel.value = "";
      lastFaces.value = [0, 0, 0];
      theme.value = utils_shakeTheme.getStoredTheme();
      await utils_shakeTheme.resolveThemeImage(theme.value);
    });
    function onShake() {
      if (busy.value || done.value)
        return;
      busy.value = true;
      anim.value = true;
      common_vendor.index.vibrateShort({ type: "light" });
      setTimeout(() => {
        const t = utils_iChing.tossOnce();
        lastFaces.value = t.faces.slice();
        lastLabel.value = t.label;
        lines.value = lines.value.concat(t.value);
        anim.value = false;
        busy.value = false;
        if (lines.value.length === 6) {
          const th = utils_shakeTheme.getStoredTheme();
          const session = {
            ts: Date.now(),
            lines: lines.value.slice(),
            ...utils_iChing.buildSession(lines.value.slice()),
            themeId: th.id,
            themeName: th.name
          };
          utils_storage.clearSession();
          utils_storage.saveSession(session);
          setTimeout(() => {
            common_vendor.index.redirectTo({
              url: "/pages/result/result?from=shake&t=" + Date.now()
            });
          }, 420);
        }
      }, SHAKE_MS);
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(theme.value.name),
        b: common_vendor.t(step.value),
        c: common_vendor.f(6, (n, k0, i0) => {
          return {
            a: n,
            b: n <= step.value ? 1 : ""
          };
        }),
        d: common_vendor.t(theme.value.yinHint),
        e: common_vendor.t(theme.value.yangHint),
        f: common_vendor.t(theme.value.note),
        g: common_vendor.f(coinTags.value, (tag, i, i0) => {
          return {
            a: common_vendor.s(coinAxisStyle(i)),
            b: common_vendor.t(busy.value ? "···" : tag),
            c: common_vendor.n(busy.value ? "coin__label--busy" : lastFaces.value[i] ? "coin__label--yang" : "coin__label--yin"),
            d: i
          };
        }),
        h: yangFaceSrc.value,
        i: yinFaceSrc.value,
        j: anim.value ? 1 : "",
        k: anim.value ? 1 : "",
        l: common_vendor.t(lastDisplay.value),
        m: !lastLabel.value ? 1 : "",
        n: common_vendor.t(done.value ? "已完成" : busy.value ? "摇动中…" : "摇卦"),
        o: busy.value || done.value,
        p: common_vendor.o(onShake),
        q: common_vendor.p({
          ["slot-key"]: "shake-flow"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ec565d25"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/shake/shake.js.map
