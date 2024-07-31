import { WebPlugin } from '@capacitor/core';
import type { AdjustEnvironment, AdjustLogLevel, AdjustTrackingStatusResponse, CapacitorAdjustPlugin } from './definitions';
export declare class CapacitorAdjustWeb extends WebPlugin implements CapacitorAdjustPlugin {
    constructor();
    start({ appToken, environment, logLevel, }: {
        appToken: string;
        environment?: AdjustEnvironment;
        logLevel?: AdjustLogLevel;
    }): void;
    trackEvent({ eventToken, callbackParams, }: {
        eventToken: string;
        callbackParams?: Record<string, string>;
    }): void;
    addSessionCallbackParameter(parameter: {
        key: string;
        value: string;
    }): void;
    /**
     * iOS only
     */
    showTrackingDialog(): Promise<AdjustTrackingStatusResponse>;
    /**
     * iOS only
     */
    getTrackingStatus(): Promise<AdjustTrackingStatusResponse>;
}
declare const CapacitorAdjust: CapacitorAdjustWeb;
export { CapacitorAdjust };
