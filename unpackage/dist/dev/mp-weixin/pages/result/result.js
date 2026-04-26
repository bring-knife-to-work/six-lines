"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_storage = require("../../utils/storage.js");
const data_hexagramData = require("../../data/hexagram-data.js");
const utils_iChing = require("../../utils/i-ching.js");
const utils_shareMp = require("../../utils/share-mp.js");
if (!Array) {
  const _easycom_hexagram_lines2 = common_vendor.resolveComponent("hexagram-lines");
  const _easycom_result_copy_card2 = common_vendor.resolveComponent("result-copy-card");
  const _easycom_ad_slot2 = common_vendor.resolveComponent("ad-slot");
  const _easycom_compliance_footer2 = common_vendor.resolveComponent("compliance-footer");
  (_easycom_hexagram_lines2 + _easycom_result_copy_card2 + _easycom_ad_slot2 + _easycom_compliance_footer2)();
}
const _easycom_hexagram_lines = () => "../../components/hexagram-lines/hexagram-lines.js";
const _easycom_result_copy_card = () => "../../components/result-copy-card/result-copy-card.js";
const _easycom_ad_slot = () => "../../components/ad-slot/ad-slot.js";
const _easycom_compliance_footer = () => "../../components/compliance-footer/compliance-footer.js";
if (!Math) {
  (_easycom_hexagram_lines + _easycom_result_copy_card + _easycom_ad_slot + _easycom_compliance_footer)();
}
const _sfc_main = {
  __name: "result",
  setup(__props) {
    utils_shareMp.usePageShare({ title: "小万素盒易学研习 · 卦象参考", path: "/pages/result/result" });
    const session = common_vendor.ref(null);
    const saved = common_vendor.ref(false);
    const mainName = common_vendor.ref("");
    const changedName = common_vendor.ref("");
    const copy = common_vendor.ref(null);
    function readResultPageOptions() {
      try {
        const pages = getCurrentPages();
        const cur = pages[pages.length - 1];
        const o = cur && cur.options || {};
        const rid = o.recordId ? decodeURIComponent(String(o.recordId)) : "";
        const fromShake = o.from === "shake";
        return { recordId: rid, fromShake };
      } catch (e) {
        return { recordId: "", fromShake: false };
      }
    }
    function applyFromRecord(rec) {
      const built = utils_iChing.buildSession(rec.lines);
      session.value = {
        ts: rec.ts,
        lines: rec.lines,
        ...built,
        themeId: rec.themeId,
        themeName: rec.themeName
      };
      saved.value = true;
      mainName.value = data_hexagramData.HEXAGRAM_NAMES[session.value.kingWenId] || rec.mainName || "";
      changedName.value = session.value.changedKwId != null ? data_hexagramData.HEXAGRAM_NAMES[session.value.changedKwId] || rec.changedName || "" : "";
      copy.value = data_hexagramData.getHexagramCopy(session.value.kingWenId, {
        changedKwId: session.value.changedKwId,
        movingIndexes: session.value.movingIndexes
      });
    }
    function applyFromLoadedSession(s) {
      const prevTs = session.value && session.value.ts;
      session.value = s;
      if (!s) {
        saved.value = false;
        mainName.value = "";
        changedName.value = "";
        copy.value = null;
        return;
      }
      if (prevTs !== s.ts) {
        saved.value = false;
      }
      mainName.value = data_hexagramData.HEXAGRAM_NAMES[s.kingWenId] || "";
      changedName.value = s.changedKwId != null ? data_hexagramData.HEXAGRAM_NAMES[s.changedKwId] || "" : "";
      copy.value = data_hexagramData.getHexagramCopy(s.kingWenId, {
        changedKwId: s.changedKwId,
        movingIndexes: s.movingIndexes
      });
    }
    function hydrate() {
      const { recordId: rid, fromShake } = readResultPageOptions();
      const s = utils_storage.loadSession();
      if (fromShake) {
        if (s && Array.isArray(s.lines) && s.lines.length === 6) {
          applyFromLoadedSession(s);
          return;
        }
        session.value = null;
        saved.value = false;
        mainName.value = "";
        changedName.value = "";
        copy.value = null;
        return;
      }
      if (rid) {
        const rec = utils_storage.getRecordById(rid);
        if (rec && Array.isArray(rec.lines) && rec.lines.length === 6) {
          applyFromRecord(rec);
          return;
        }
        common_vendor.index.showToast({ title: "记录不存在或已删除", icon: "none" });
        if (s && Array.isArray(s.lines) && s.lines.length === 6) {
          applyFromLoadedSession(s);
          return;
        }
        setTimeout(() => {
          common_vendor.index.navigateBack({ fail: () => {
          } });
        }, 500);
        return;
      }
      applyFromLoadedSession(s);
    }
    common_vendor.onShow(() => {
      hydrate();
    });
    function save() {
      if (!session.value || saved.value)
        return;
      const s = session.value;
      const id = `${s.ts}-${Math.random().toString(16).slice(2)}`;
      utils_storage.addRecord({
        id,
        ts: s.ts,
        lines: s.lines,
        kingWenId: s.kingWenId,
        changedKwId: s.changedKwId,
        mainName: data_hexagramData.HEXAGRAM_NAMES[s.kingWenId],
        changedName: s.changedKwId != null ? data_hexagramData.HEXAGRAM_NAMES[s.changedKwId] : "",
        themeId: s.themeId,
        themeName: s.themeName
      });
      saved.value = true;
      common_vendor.index.showToast({ title: "已保存", icon: "success" });
    }
    function again() {
      common_vendor.index.redirectTo({ url: "/pages/shake/shake" });
    }
    function goHome() {
      common_vendor.index.switchTab({ url: "/pages/index/index" });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: session.value
      }, session.value ? common_vendor.e({
        b: session.value.themeName
      }, session.value.themeName ? {
        c: common_vendor.t(session.value.themeName)
      } : {}, {
        d: common_vendor.t(mainName.value),
        e: copy.value && copy.value.mnemonic
      }, copy.value && copy.value.mnemonic ? {
        f: common_vendor.t(copy.value.mnemonic)
      } : {}, {
        g: changedName.value
      }, changedName.value ? {
        h: common_vendor.t(changedName.value)
      } : {}, {
        i: common_vendor.p({
          lines: session.value.lines,
          ["king-wen-id"]: session.value.kingWenId
        }),
        j: copy.value && copy.value.detail
      }, copy.value && copy.value.detail ? {
        k: common_vendor.t(copy.value.detail)
      } : {}, {
        l: copy.value && copy.value.changedLead
      }, copy.value && copy.value.changedLead ? common_vendor.e({
        m: common_vendor.t(copy.value.changedTitle),
        n: common_vendor.t(copy.value.changedLead),
        o: copy.value.changedBody
      }, copy.value.changedBody ? {
        p: common_vendor.t(copy.value.changedBody)
      } : {}) : {}, {
        q: copy.value && copy.value.referenceBlock
      }, copy.value && copy.value.referenceBlock ? {
        r: common_vendor.p({
          ["main-text"]: copy.value.referenceBlock,
          ["closing-text"]: copy.value.closing || ""
        })
      } : {}, {
        s: common_vendor.o(again),
        t: saved.value
      }, saved.value ? {
        v: common_vendor.o(save)
      } : {
        w: common_vendor.o(save)
      }, {
        x: common_vendor.o(goHome),
        y: common_vendor.p({
          ["slot-key"]: "result-bottom"
        })
      }) : {
        z: common_vendor.o(goHome)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-b615976f"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/result/result.js.map
