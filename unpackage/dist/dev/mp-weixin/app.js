"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const config_app = require("./config/app.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/gua-list/gua-list.js";
  "./pages/gua-detail/gua-detail.js";
  "./pages/shake/shake.js";
  "./pages/result/result.js";
  "./pages/records/records.js";
  "./pages/tools/tools.js";
  "./pages/tool-workbench/tool-workbench.js";
  "./pages/mine/mine.js";
  "./pages/privacy/privacy.js";
}
const _sfc_main = {
  onLaunch: function() {
  },
  onShow: function() {
  },
  onHide: function() {
  },
  onShareAppMessage() {
    return {
      title: config_app.APP_NAME,
      path: "/pages/index/index"
    };
  },
  onShareTimeline() {
    return {
      title: config_app.APP_NAME,
      query: ""
    };
  }
};
function ensureWxTimelineMenu() {
  try {
    const ret = common_vendor.index.showShareMenu({
      withShareTicket: true,
      menus: ["shareAppMessage", "shareTimeline"],
      success() {
      },
      fail() {
      },
      complete() {
      }
    });
    if (ret && typeof ret.then === "function") {
      ret.catch(() => {
      });
    }
  } catch (e) {
  }
}
function buildCurrentPathWithQuery() {
  try {
    const pages = getCurrentPages();
    const cur = pages[pages.length - 1];
    if (!cur || !cur.route)
      return "/pages/index/index";
    const base = "/" + cur.route;
    const opts = cur.options || {};
    const keys = Object.keys(opts);
    if (!keys.length)
      return base;
    const q = keys.map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(String(opts[k] ?? ""))}`).join("&");
    return q ? `${base}?${q}` : base;
  } catch (e) {
    return "/pages/index/index";
  }
}
function buildCurrentQueryOnly() {
  try {
    const pages = getCurrentPages();
    const cur = pages[pages.length - 1];
    const opts = cur && cur.options || {};
    const keys = Object.keys(opts);
    if (!keys.length)
      return "";
    return keys.map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(String(opts[k] ?? ""))}`).join("&");
  } catch (e) {
    return "";
  }
}
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  app.mixin({
    onLoad() {
      ensureWxTimelineMenu();
    },
    onShow() {
      ensureWxTimelineMenu();
    },
    onShareAppMessage() {
      return {
        title: config_app.APP_NAME,
        path: buildCurrentPathWithQuery()
      };
    },
    onShareTimeline() {
      return {
        title: config_app.APP_NAME,
        query: buildCurrentQueryOnly()
      };
    }
  });
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
//# sourceMappingURL=../.sourcemap/mp-weixin/app.js.map
