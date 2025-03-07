// Reexport the native module. On web, it will be resolved to ExpoModulesWorkshopsModule.web.ts
// and on native platforms to ExpoModulesWorkshopsModule.ts
export { default } from './ExpoModulesWorkshopsModule';
export { default as ExpoModulesWorkshopsView } from './ExpoModulesWorkshopsView';
export * from  './ExpoModulesWorkshops.types';
