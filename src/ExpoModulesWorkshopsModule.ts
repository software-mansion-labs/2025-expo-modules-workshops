import { NativeModule, requireNativeModule } from 'expo';

import { ExpoModulesWorkshopsModuleEvents } from './ExpoModulesWorkshops.types';

declare class ExpoModulesWorkshopsModule extends NativeModule<ExpoModulesWorkshopsModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoModulesWorkshopsModule>('ExpoModulesWorkshops');
