package com.joinflux.flux.capacitoradjust;

import android.util.Log;

import com.getcapacitor.JSObject;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.annotation.Permission;
import com.getcapacitor.PluginCall;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginMethod;

import com.adjust.sdk.Adjust;
import com.adjust.sdk.AdjustConfig;
import com.adjust.sdk.LogLevel;
import com.adjust.sdk.AdjustEvent;

import java.util.Iterator;

@CapacitorPlugin(
  name = "CapacitorAdjust"
)
public class CapacitorAdjust extends Plugin {
    private LogLevel getLogLevel (String id) {
        switch (id.toLowerCase()) {
            case "none":
                return LogLevel.SUPRESS;
            case "warning":
                return LogLevel.WARN;
            case "info":
                return LogLevel.INFO;
            case "verbose":
                return LogLevel.VERBOSE;
            case "error":
            default:
                return LogLevel.ERROR;
        }
    }

    @PluginMethod
    public void start(PluginCall call) {
        String appToken = call.getString("appToken");
        if (appToken == null) {
            call.reject("Must provide an appToken to initialize plugin");
            return;
        }
        String environment = call.getString("environment");
        String logLevel = call.getString("logLevel", "error");
        AdjustConfig config = new AdjustConfig(
                getContext(),
                appToken,
                environment == null ? AdjustConfig.ENVIRONMENT_SANDBOX : environment
        );
        config.setLogLevel(getLogLevel(logLevel));
        Adjust.onCreate(config);
        Adjust.onResume();
        call.resolve();
    }

    @PluginMethod
    public void trackEvent(PluginCall call) {
        String eventToken = call.getString("eventToken");
        if (eventToken == null) {
            call.reject("Must provide an eventToken");
            return;
        }
        JSObject callbackParams = call.getObject("callbackParams", new JSObject());
        AdjustEvent event = new AdjustEvent(eventToken);
        for (Iterator<String> it = callbackParams.keys(); it.hasNext();) {
            String key = it.next();
            String value = callbackParams.getString(key);
            if (value == null) {
                Log.w("CapacitorAdjust", "callback param value could not be cast to String, skipping");
                continue;
            }
            event.addCallbackParameter(key, value);
        }
        Adjust.trackEvent(event);
        call.resolve();
    }

    @PluginMethod
    public void addSessionCallbackParameter(PluginCall call) {
        String key = call.getString("key");
        if (key == null) {
            call.reject("Session callback parameter must contain key");
            return;
        }
        String value = call.getString("value");
        if (value == null) {
            call.reject("Session callback parameter must contain value");
            return;
        }
        Adjust.addSessionCallbackParameter(key, value);
        call.resolve();
    }

    @PluginMethod
    public static void onResume() {
        Adjust.onResume();
    }

    @PluginMethod
    public static void onPause() {
        Adjust.onPause();
    }

    @PluginMethod
    public void showTrackingDialog(PluginCall call) {
        return; // noop, showTrackingDialog is only available on iOS implementation
    }

    @PluginMethod
    public void getTrackingStatus(PluginCall call) {
        return; // noop, getTrackingStatus is only available on iOS implementation
    }
}
