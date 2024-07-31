import Foundation
import Capacitor
import Adjust
import AppTrackingTransparency

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(CapacitorAdjust)
public class CapacitorAdjust: CAPPlugin {

    @objc override public func load() {
        print("iOS CapacitorAdjust - loading")
    }
    
    @objc func getLogLevel(logLevel: String) -> ADJLogLevel {
        switch logLevel.lowercased() {
        case "none":
            return ADJLogLevelSuppress
        case "warning":
            return ADJLogLevelWarn
        case "info":
            return ADJLogLevelInfo
        case "verbose":
            return ADJLogLevelVerbose
        case "error":
            return ADJLogLevelError
        default:
            return ADJLogLevelError
        }
    }

    @objc func start(_ call: CAPPluginCall) {
        guard let appToken = call.getString("appToken") else {
            call.reject("Must provide an appToken to initialize plugin")
            return
        }
        let environment = call.getString("environment") ?? "sandbox"
        let logLevel = call.getString("logLevel") ?? "error"
        let adjustConfig = ADJConfig(appToken: appToken, environment: environment)
        adjustConfig?.logLevel = getLogLevel(logLevel: logLevel)
        Adjust.appDidLaunch(adjustConfig!)
        call.resolve()
    }

    @objc func trackEvent(_ call: CAPPluginCall) {
        guard let eventToken = call.getString("eventToken") else {
            call.reject("Must provide an eventToken")
            return
        }
        let event = ADJEvent(eventToken: eventToken)
        if let callbackParams = call.getObject("callbackParams") as? [String:String] {
            for (key, value) in callbackParams {
                event?.addCallbackParameter(key, value: value)
            }
        }
        Adjust.trackEvent(event)
        call.resolve()
    }
    
    @objc func addSessionCallbackParameter(_ call: CAPPluginCall) {
        guard let key = call.getString("key") else {
            call.reject("Session callback parameter must contain key")
            return
        }
        guard let value = call.getString("value") else { 
            call.reject("Session callback parameter \(key) must contain value")
            return
        }
        Adjust.addSessionCallbackParameter(key, value: value)
        call.resolve()
    }
    
    // This method is only available on iOS 14
    // Other platform implementations will noop
    @objc func showTrackingDialog(_ call: CAPPluginCall) {
        Adjust.requestTrackingAuthorization(completionHandler: { (status) in
            call.resolve(["status": status])
        })
    }
    
    @objc func getTrackingStatus(_ call: CAPPluginCall) {
        let status = Adjust.appTrackingAuthorizationStatus()
        call.resolve(["status": status])
    }
}
