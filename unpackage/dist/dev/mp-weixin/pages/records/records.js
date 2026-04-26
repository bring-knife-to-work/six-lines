"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_storage = require("../../utils/storage.js");
const data_hexagramData = require("../../data/hexagram-data.js");
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
  __name: "records",
  setup(__props) {
    utils_shareMp.usePageShare({ title: "我的记录 · 小万素盒易学研习", path: "/pages/records/records" });
    const list = common_vendor.ref([]);
    function mne(item) {
      if (item && item.recordType === "study")
        return "";
      const id = item && item.kingWenId;
      return id ? data_hexagramData.getHexagramMnemonic(id) : "";
    }
    function refresh() {
      list.value = utils_storage.loadRecords();
    }
    function openDetail(item) {
      if (!item || !item.id)
        return;
      if (item.recordType === "study") {
        common_vendor.index.showModal({
          title: item.toolName || "工具记录",
          content: (item.lines || []).join("\n"),
          showCancel: false
        });
        return;
      }
      common_vendor.index.navigateTo({
        url: "/pages/result/result?recordId=" + encodeURIComponent(String(item.id))
      });
    }
    function itemTitle(item) {
      if (!item)
        return "未命名记录";
      if (item.recordType === "study")
        return item.title || item.toolName || "工具记录";
      return item.mainName || "卦象记录";
    }
    common_vendor.onShow(() => {
      refresh();
    });
    function fmt(ts) {
      const d = new Date(ts);
      const p = (n) => n < 10 ? "0" + n : "" + n;
      return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(
        d.getMinutes()
      )}`;
    }
    function remove(id) {
      common_vendor.index.showModal({
        title: "删除记录",
        content: "确定删除这一条？",
        success: (res) => {
          if (res.confirm) {
            utils_storage.removeRecord(id);
            refresh();
          }
        }
      });
    }
    function clear() {
      common_vendor.index.showModal({
        title: "清空记录",
        content: "确定清空全部本地记录？",
        success: (res) => {
          if (res.confirm) {
            utils_storage.clearAllRecords();
            refresh();
          }
        }
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: list.value.length === 0
      }, list.value.length === 0 ? {} : {
        b: common_vendor.f(list.value, (item, k0, i0) => {
          return common_vendor.e({
            a: common_vendor.t(fmt(item.ts)),
            b: item.themeName
          }, item.themeName ? {
            c: common_vendor.t(item.themeName)
          } : {}, {
            d: common_vendor.t(itemTitle(item)),
            e: mne(item)
          }, mne(item) ? {
            f: common_vendor.t(mne(item))
          } : {}, {
            g: item.changedName
          }, item.changedName ? {
            h: common_vendor.t(item.changedName)
          } : {}, {
            i: item.recordType === "study" && item.lines && item.lines[0]
          }, item.recordType === "study" && item.lines && item.lines[0] ? {
            j: common_vendor.t(item.lines[0])
          } : {}, {
            k: common_vendor.o(($event) => remove(item.id), item.id),
            l: item.id,
            m: common_vendor.o(($event) => openDetail(item), item.id)
          });
        })
      }, {
        c: list.value.length
      }, list.value.length ? {
        d: common_vendor.o(clear)
      } : {}, {
        e: common_vendor.p({
          ["slot-key"]: "records-list"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-cb371200"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/records/records.js.map
