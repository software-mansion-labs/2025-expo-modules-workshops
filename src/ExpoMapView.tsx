import { requireNativeView } from "expo";
import * as React from "react";
import { StyleProp, ViewStyle } from "react-native";

export interface ExpoMapViewRef {
  readonly moveTo: (
    latitude: number,
    longitude: number,
    animated: boolean,
  ) => Promise<void>;
}

export type ExpoMapViewProps = {
  mapType?: "standard" | "satellite";
  onMapPress?: (event: { nativeEvent: { x: number; y: number } }) => void;
  onRegionChange?: (event: {
    nativeEvent: { latitude: number; longitude: number };
  }) => void;
  style?: StyleProp<ViewStyle>;
  ref?: React.Ref<ExpoMapViewRef>;
  nativeRef?: React.Ref<ExpoMapViewRef>;
};

const NativeView: React.ComponentType<ExpoMapViewProps> = requireNativeView(
  "ExpoModulesWorkshops",
);

export function ExpoMapView(props: ExpoMapViewProps) {
  return <NativeView {...props} ref={props?.nativeRef} />;
}
