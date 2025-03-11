import { NativeModule, requireNativeModule } from 'expo';

export declare class ExpoModulesWorkshopsModule extends NativeModule {}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoModulesWorkshopsModule>('ExpoModulesWorkshops');
