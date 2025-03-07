import { registerWebModule, NativeModule } from 'expo';

import { ExpoModulesWorkshopsModuleEvents } from './ExpoModulesWorkshops.types';

class ExpoModulesWorkshopsModule extends NativeModule<ExpoModulesWorkshopsModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
}

export default registerWebModule(ExpoModulesWorkshopsModule);
