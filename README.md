# Capacitor Adjust Plugin

Capacitor plugin for Native Adjust integration with support for Web, Android and
iOS.

## Maintainers

| Maintainer      | GitHub                                |
| --------------- | ------------------------------------- |
| Blake Ward      | [Nevvulo](https://github.com/Nevvulo) |
| Gustavo Horisch | [gugahoi](https://github.com/gugahoi) |

## Installation

```bash
npm install @joinflux/capacitor-adjust
```

Sync native files:

```bash
npx cap sync
```

## Configuration

No configuration is required for this plugin.

## Supported methods

| Name                        | Android | iOS | Web |
| :-------------------------- | :------ | :-- | :-- |
| start                       | ✅      | ✅  | ✅  |
| trackEvent                  | ✅      | ✅  | ✅  |
| addSessionCallbackParameter | ✅      | ✅  | ✅  |
| showTrackingDialog          | ✅      | ✅  | ✅  |
<!--Icons for future user: ✅  | ❌  -->

## Usage

```typescript
// Must import the package once to make sure web support initializes
import "@joinflux/capacitor-adjust";
import { Plugins } from "@capacitor/core";
const { CapacitorAdjust } = Plugins;

CapacitorAdjust.start({ appToken })
CapacitorAdjust.trackEvent({ eventId })
```


### AppTrackingTransparency (ATT)

To get ATT working in your app, you must add the
AppTrackingTransparency.framework to your Xcode project. You can follow the
recommandations from Adjust's iOS SDK and consume the methods exposed in this
package.

For more information: https://github.com/adjust/ios_sdk#apptrackingtransparency-framework
