export declare type AdjustEnvironment = 'production' | 'sandbox';
export declare type AdjustLogLevel = 'none' | 'error' | 'warning' | 'info' | 'verbose';
export declare type AdjustTrackingAuthorizationStatus = 0 | 1 | 2 | 3 | -1;
export declare type AdjustTrackingStatusResponse = {
    status: AdjustTrackingAuthorizationStatus;
};
export interface CapacitorAdjustPlugin {
    start(options: {
        appToken: string;
        environment?: AdjustEnvironment;
        logLevel?: AdjustLogLevel;
    }): void;
    trackEvent(event: {
        eventToken: string;
        callbackParams?: Record<string, string>;
    }): void;
    addSessionCallbackParameter(parameter: {
        key: string;
        value: string;
    }): void;
    showTrackingDialog(): Promise<AdjustTrackingStatusResponse>;
    getTrackingStatus(): Promise<AdjustTrackingStatusResponse>;
}
