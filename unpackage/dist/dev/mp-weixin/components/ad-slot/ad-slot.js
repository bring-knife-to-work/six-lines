"use strict";
const common_vendor = require("../../common/vendor.js");
const config_app = require("../../config/app.js");
const _sfc_main = {
  __name: "ad-slot",
  props: {
    /** 业务侧区分的插槽位标识，便于以后统计/排期 */
    slotKey: {
      type: String,
      default: "default"
    },
    /** 微信 mp 原生广告位 ID，未配置时不展示 */
    unitId: {
      type: String,
      default: ""
    },
    /** 额外 class */
    extClass: {
      type: String,
      default: ""
    },
    /** 预留高度（rpx），关闭广告时为 0 */
    reservedHeightRpx: {
      type: Number,
      default: 0
    }
  },
  setup(__props) {
    const props = __props;
    const visible = common_vendor.computed(() => config_app.AD_ENABLED);
    const useNativeAd = common_vendor.computed(() => visible.value);
    const rootClass = common_vendor.computed(() => props.extClass);
    const rootStyle = common_vendor.computed(() => {
      if (!visible.value && props.reservedHeightRpx > 0) {
        return { minHeight: props.reservedHeightRpx + "rpx" };
      }
      return {};
    });
    function onLoad() {
    }
    function onError() {
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: visible.value
      }, visible.value ? common_vendor.e({
        b: useNativeAd.value
      }, useNativeAd.value ? {
        c: __props.unitId,
        d: common_vendor.o(onLoad),
        e: common_vendor.o(onError)
      } : {}, {
        f: common_vendor.n(rootClass.value),
        g: common_vendor.s(rootStyle.value)
      }) : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f851a00e"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/ad-slot/ad-slot.js.map
