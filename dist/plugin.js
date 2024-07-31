var capacitorAdjust = (function (exports, Adjust, core) {
    'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () {
                            return e[k];
                        }
                    });
                }
            });
        }
        n['default'] = e;
        return Object.freeze(n);
    }

    var Adjust__namespace = /*#__PURE__*/_interopNamespace(Adjust);

    class CapacitorAdjustWeb extends core.WebPlugin {
        constructor() {
            super();
        }
        start({ appToken, environment = 'sandbox', logLevel = 'error', }) {
            Adjust__namespace.initSdk({
                appToken,
                environment,
                logLevel,
            });
        }
        trackEvent({ eventToken, callbackParams, }) {
            let params = Object.entries(callbackParams || {}).map(([key, value]) => ({
                key,
                value,
            }));
            Adjust__namespace.trackEvent({ eventToken, callbackParams: params });
        }
        addSessionCallbackParameter(parameter) {
            Adjust__namespace.addGlobalCallbackParameters([parameter]);
        }
        /**
         * iOS only
         */
        showTrackingDialog() {
            // -1 represents "status unavailable", showTrackingDialog only in iOS impl.
            return Promise.resolve({ status: -1 });
        }
        /**
         * iOS only
         */
        getTrackingStatus() {
            // -1 represents "status unavailable"
            return Promise.resolve({ status: -1 });
        }
    }
    const CapacitorAdjust = core.registerPlugin('CapacitorAdjust', {
        web: () => new CapacitorAdjustWeb(),
    });

    exports.CapacitorAdjust = CapacitorAdjust;
    exports.CapacitorAdjustWeb = CapacitorAdjustWeb;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

}({}, Adjust, capacitorExports));
//# sourceMappingURL=plugin.js.map
