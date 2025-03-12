import { NativeModule, requireNativeModule } from "expo";

export type CustomObject = {
  index: number;
  data: string;
};

export enum Orientation {
  LANDSCAPE = "LANDSCAPE",
  PORTRAIT = "PORTRAIT",
  UNKNOWN = "UNKNOWN",
}

export type ModuleEvents = {
  onEvent(params: { data: string }): void;
  onScreenOrientationChange(params: { orientation: Orientation }): void;
};

export declare class ExpoModulesWorkshopsModule extends NativeModule<ModuleEvents> {
  multiply(a: number, b: number): number;
  passString(str: string): string;
  passArray(arr: number[]): number[];
  passObject(obj: CustomObject): CustomObject;
  passFunction(cb: (value: number) => void): void;
  getPromise(data: string): Promise<string>;
  getScreenOrientation(): Orientation;
}

export default requireNativeModule<ExpoModulesWorkshopsModule>(
  "ExpoModulesWorkshops",
);
