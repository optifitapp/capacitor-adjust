import * as Adjust from '@adjustcom/adjust-web-sdk';
import { registerPlugin, WebPlugin } from '@capacitor/core';
export class CapacitorAdjustWeb extends WebPlugin {
    constructor() {
        super();
    }
    start({ appToken, environment = 'sandbox', logLevel = 'error', }) {
        Adjust.initSdk({
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
        Adjust.trackEvent({ eventToken, callbackParams: params });
    }
    addSessionCallbackParameter(parameter) {
        Adjust.addGlobalCallbackParameters([parameter]);
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
const CapacitorAdjust = registerPlugin('CapacitorAdjust', {
    web: () => new CapacitorAdjustWeb(),
});
export { CapacitorAdjust };
//# sourceMappingURL=web.js.map