"use strict";
const common_vendor = require("../../common/vendor.js");
const data_studyTools = require("../../data/study-tools.js");
const utils_studyTools = require("../../utils/study-tools.js");
const utils_storage = require("../../utils/storage.js");
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
  __name: "tool-workbench",
  setup(__props) {
    utils_shareMp.usePageShare({ title: "小万素盒易学研习 · 研习工具", path: "/pages/tool-workbench/tool-workbench" });
    const tool = common_vendor.ref(null);
    const result = common_vendor.ref(null);
    const today = formatDate(/* @__PURE__ */ new Date());
    const form = common_vendor.ref({
      mode: "number",
      number: "",
      date: today,
      time: "12:00",
      calendar: "solar",
      zodiac: "鼠",
      year: String((/* @__PURE__ */ new Date()).getFullYear()),
      name: ""
    });
    const modeOptions = [{ label: "数字起式", value: "number" }, { label: "时间起式", value: "time" }];
    const calendarOptions = [{ label: "公历", value: "solar" }, { label: "农历录入", value: "lunar" }];
    const zodiacOptions = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"];
    const modeLabel = common_vendor.computed(() => {
      var _a;
      return ((_a = modeOptions.find((x) => x.value === form.value.mode)) == null ? void 0 : _a.label) || modeOptions[0].label;
    });
    const calendarLabel = common_vendor.computed(() => {
      var _a;
      return ((_a = calendarOptions.find((x) => x.value === form.value.calendar)) == null ? void 0 : _a.label) || calendarOptions[0].label;
    });
    common_vendor.onLoad((options) => {
      const id = (options == null ? void 0 : options.tool) ? decodeURIComponent(String(options.tool)) : "";
      tool.value = data_studyTools.getStudyToolById(id);
      if (!tool.value) {
        common_vendor.index.showToast({ title: "功能不存在", icon: "none" });
      }
    });
    function pickMode(e) {
      const idx = Number(e.detail.value || 0);
      form.value.mode = modeOptions[idx].value;
    }
    function pickCalendar(e) {
      const idx = Number(e.detail.value || 0);
      form.value.calendar = calendarOptions[idx].value;
    }
    function pickDate(e) {
      form.value.date = e.detail.value;
    }
    function pickTime(e) {
      form.value.time = e.detail.value;
    }
    function pickZodiac(e) {
      const idx = Number(e.detail.value || 0);
      form.value.zodiac = zodiacOptions[idx];
    }
    function generate() {
      if (!tool.value)
        return;
      result.value = utils_studyTools.runStudyTool(tool.value.id, form.value);
    }
    function saveRecord() {
      if (!tool.value || !result.value)
        return;
      const id = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
      utils_storage.addRecord({
        id,
        ts: Date.now(),
        recordType: "study",
        toolId: tool.value.id,
        toolName: tool.value.name,
        title: result.value.title,
        lines: result.value.lines
      });
      common_vendor.index.showToast({ title: "已保存", icon: "success" });
    }
    function formatDate(d) {
      const p = (n) => n < 10 ? `0${n}` : `${n}`;
      return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: tool.value
      }, tool.value ? {
        b: common_vendor.t(tool.value.name),
        c: common_vendor.t(tool.value.short)
      } : {}, {
        d: tool.value
      }, tool.value ? common_vendor.e({
        e: common_vendor.t(tool.value.operationTitle),
        f: tool.value.id === "meihua"
      }, tool.value.id === "meihua" ? common_vendor.e({
        g: common_vendor.t(modeLabel.value),
        h: modeOptions,
        i: common_vendor.o(pickMode),
        j: form.value.mode === "number"
      }, form.value.mode === "number" ? {
        k: form.value.number,
        l: common_vendor.o(($event) => form.value.number = $event.detail.value)
      } : {}, {
        m: common_vendor.t(form.value.date),
        n: form.value.date,
        o: common_vendor.o(pickDate)
      }) : tool.value.id === "bazi" ? {
        q: common_vendor.t(calendarLabel.value),
        r: calendarOptions,
        s: common_vendor.o(pickCalendar),
        t: common_vendor.t(form.value.date),
        v: form.value.date,
        w: common_vendor.o(pickDate),
        x: common_vendor.t(form.value.time),
        y: form.value.time,
        z: common_vendor.o(pickTime)
      } : tool.value.id === "ganzhi" ? {
        B: common_vendor.t(form.value.date),
        C: form.value.date,
        D: common_vendor.o(pickDate)
      } : tool.value.id === "zodiac" ? {
        F: common_vendor.t(form.value.zodiac),
        G: zodiacOptions,
        H: common_vendor.o(pickZodiac),
        I: form.value.year,
        J: common_vendor.o(($event) => form.value.year = $event.detail.value)
      } : tool.value.id === "name" ? {
        L: form.value.name,
        M: common_vendor.o(common_vendor.m(($event) => form.value.name = $event.detail.value, {
          trim: true
        }))
      } : {}, {
        p: tool.value.id === "bazi",
        A: tool.value.id === "ganzhi",
        E: tool.value.id === "zodiac",
        K: tool.value.id === "name",
        N: common_vendor.o(generate),
        O: common_vendor.o(saveRecord),
        P: !result.value
      }) : {}, {
        Q: result.value
      }, result.value ? {
        R: common_vendor.t(result.value.title),
        S: common_vendor.f(result.value.lines, (line, i, i0) => {
          return {
            a: common_vendor.t(line),
            b: i
          };
        })
      } : {}, {
        T: tool.value
      }, tool.value ? {
        U: common_vendor.t(tool.value.science),
        V: common_vendor.t(tool.value.usage)
      } : {}, {
        W: tool.value
      }, tool.value ? {} : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3bf632b6"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/tool-workbench/tool-workbench.js.map
