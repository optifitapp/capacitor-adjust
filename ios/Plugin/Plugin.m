#import <Foundation/Foundation.h>
#import <Capacitor/Capacitor.h>

// Define the plugin using the CAP_PLUGIN Macro, and
// each method the plugin supports using the CAP_PLUGIN_METHOD macro.
CAP_PLUGIN(CapacitorAdjust, "CapacitorAdjust",
      CAP_PLUGIN_METHOD(start, CAPPluginReturnNone);
      CAP_PLUGIN_METHOD(trackEvent, CAPPluginReturnNone);
      CAP_PLUGIN_METHOD(addSessionCallbackParameter, CAPPluginReturnNone);
      CAP_PLUGIN_METHOD(showTrackingDialog, CAPPluginReturnPromise);
      CAP_PLUGIN_METHOD(getTrackingStatus, CAPPluginReturnPromise);
)
