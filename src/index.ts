// Reexport the native module. On web, it will be resolved to ExpoModulesWorkshopsModule.web.ts
// and on native platforms to ExpoModulesWorkshopsModule.ts
export { default } from './ExpoModulesWorkshopsModule';
export * from './ExpoModulesWorkshopsModule';
export * from './ExpoMapView';
export * from './useScreenOrientation';