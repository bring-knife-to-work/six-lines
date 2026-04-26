"use strict";
const common_vendor = require("../common/vendor.js");
const config_app = require("../config/app.js");
function usePageShare(options = {}) {
  const title = options.title || config_app.APP_NAME;
  const path = options.path || "/pages/index/index";
  const imageUrl = options.imageUrl || "";
  common_vendor.onLoad(() => {
    try {
      common_vendor.wx$1.showShareMenu({
        menus: ["shareAppMessage", "shareTimeline"]
      });
    } catch (e) {
    }
  });
  common_vendor.onShareAppMessage(() => {
    if (typeof options.getAppMessage === "function") {
      const r = options.getAppMessage() || {};
      return {
        title: r.title || title,
        path: r.path || path,
        ...r.imageUrl || imageUrl ? { imageUrl: r.imageUrl || imageUrl } : {}
      };
    }
    return {
      title,
      path,
      ...imageUrl ? { imageUrl } : {}
    };
  });
  common_vendor.onShareTimeline(() => {
    if (typeof options.getTimeline === "function") {
      const r = options.getTimeline() || {};
      return {
        title: r.title || title,
        path: r.path || path,
        ...r.imageUrl || imageUrl ? { imageUrl: r.imageUrl || imageUrl } : {}
      };
    }
    return {
      title,
      path,
      ...imageUrl ? { imageUrl } : {}
    };
  });
}
exports.usePageShare = usePageShare;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/share-mp.js.map
